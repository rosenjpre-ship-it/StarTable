import { normalizeEmail } from './_data.js';
import { sessionFromRequest } from './_auth.js';
import { activeSubscriptionForEmail } from './_subscription.js';
import { sendJson } from './_http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const session = sessionFromRequest(req, url);
  const email = normalizeEmail(session?.email || url.searchParams.get('email'));
  if (!email) return sendJson(res, 401, { authenticated: false, plan: 'Free' });
  const membership = await activeSubscriptionForEmail(email).catch(() => ({ active: false, plan: 'Free', renewal: '-' }));

  return sendJson(res, 200, {
    authenticated: true,
    email,
    plan: membership.plan,
    membership,
    storage: 'browser-local',
    message: membership.active ? 'Premium membership active.' : 'Free preview account.'
  });
}
