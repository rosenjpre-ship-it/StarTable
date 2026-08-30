import { createOtp, createSessionToken, emailDeliveryConfigured, sendOtpEmail } from '../_auth.js';
import { readJson, sendJson } from '../_http.js';
import { normalizeEmail } from '../_data.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await readJson(req);
    const email = normalizeEmail(body.email);
    if (!email) return sendJson(res, 400, { error: 'A valid email is required' });
    if (!emailDeliveryConfigured()) {
      return sendJson(res, 200, {
        ok: true,
        email,
        delivered: false,
        directLogin: true,
        token: createSessionToken(email),
        message: 'Email delivery is not configured; signed in by email for this deployment.'
      });
    }
    const code = createOtp(email);
    const delivery = await sendOtpEmail(email, code);
    return sendJson(res, 200, {
      ok: true,
      email,
      delivered: delivery.delivered,
      message: 'Verification code sent'
    });
  } catch (error) {
    console.error('request-code failed', error);
    return sendJson(res, 500, { error: error.message || 'Verification failed' });
  }
}
