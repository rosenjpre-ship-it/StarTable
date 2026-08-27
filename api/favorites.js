import { readJson, sendJson } from './_http.js';
import { normalizeEmail } from './_data.js';
import { sessionFromRequest } from './_auth.js';

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const body = req.method === 'POST' ? await readJson(req).catch(() => ({})) : {};
  const session = sessionFromRequest(req, url);
  const email = normalizeEmail(session?.email || url.searchParams.get('email') || body.email);
  if (!email) return sendJson(res, 401, { error: 'A valid email is required' });

  return sendJson(res, 200, {
    email,
    favorites: [],
    marks: {},
    storage: 'browser-local',
    message: 'Favorites API contract is ready; database persistence is not enabled yet.'
  });
}
