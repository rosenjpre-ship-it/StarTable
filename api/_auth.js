import { createHmac, timingSafeEqual } from 'node:crypto';
import { normalizeEmail } from './_data.js';

const textEncoder = new TextEncoder();
const otpWindowMs = 1000 * 60 * 10;

function secret() {
  return process.env.AUTH_SESSION_SECRET || process.env.STRIPE_SECRET_KEY || 'startable-local-dev-secret';
}

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(value) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

function safeEqual(a, b) {
  const left = textEncoder.encode(String(a || ''));
  const right = textEncoder.encode(String(b || ''));
  return left.length === right.length && timingSafeEqual(left, right);
}

function createSessionToken(email) {
  const payload = {
    email: normalizeEmail(email),
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30
  };
  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

function verifySessionToken(token) {
  const [body, signature] = String(token || '').split('.');
  if (!body || !signature || !safeEqual(sign(body), signature)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    const email = normalizeEmail(payload.email);
    return email ? { email } : null;
  } catch {
    return null;
  }
}

function sessionFromRequest(req, url) {
  const auth = String(req.headers.authorization || '');
  const bearer = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : '';
  const token = bearer || url.searchParams.get('sessionToken') || url.searchParams.get('token');
  return verifySessionToken(token);
}

function otpForWindow(email, windowId) {
  const digest = createHmac('sha256', secret()).update(`${normalizeEmail(email)}:${windowId}`).digest('hex');
  const value = Number.parseInt(digest.slice(0, 10), 16) % 1000000;
  return String(value).padStart(6, '0');
}

function createOtp(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) throw new Error('A valid email is required');
  return otpForWindow(normalized, Math.floor(Date.now() / otpWindowMs));
}

function verifyOtp(email, code) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const submitted = String(code || '').trim();
  const windowId = Math.floor(Date.now() / otpWindowMs);
  const validCodes = [otpForWindow(normalized, windowId), otpForWindow(normalized, windowId - 1)];
  if (!validCodes.includes(submitted)) return null;
  return createSessionToken(normalized);
}

function emailDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.AUTH_EMAIL_FROM);
}

async function sendOtpEmail(email, code) {
  if (!emailDeliveryConfigured()) {
    return { delivered: false, reason: 'email_delivery_not_configured' };
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.AUTH_EMAIL_FROM,
      to: email,
      subject: 'StarTable 星宴登录验证码',
      text: `你的 StarTable 星宴登录验证码是：${code}\n\n验证码 10 分钟内有效。`
    })
  });
  if (!response.ok) throw new Error('Verification email failed to send');
  return { delivered: true };
}

export {
  createOtp,
  createSessionToken,
  emailDeliveryConfigured,
  sendOtpEmail,
  verifyOtp,
  verifySessionToken,
  sessionFromRequest
};
