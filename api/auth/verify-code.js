import { verifyOtp } from '../_auth.js';
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
    const token = verifyOtp(email, body.code);
    if (!token) return sendJson(res, 401, { error: 'Invalid or expired verification code' });
    return sendJson(res, 200, { authenticated: true, email, token });
  } catch (error) {
    console.error('verify-code failed', error);
    return sendJson(res, 500, { error: error.message || 'Verification failed' });
  }
}
