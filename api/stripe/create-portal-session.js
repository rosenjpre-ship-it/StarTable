import { stripe, sendJson, readJson, siteUrl } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return sendJson(res, 500, { error: 'Missing STRIPE_SECRET_KEY' });
  }

  try {
    const body = await readJson(req);
    const email = String(body.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return sendJson(res, 400, { error: 'A valid email is required' });
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];
    if (!customer) {
      return sendJson(res, 404, { error: 'No Stripe customer found for this email' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${siteUrl(req)}/index.html`
    });
    return sendJson(res, 200, { url: session.url });
  } catch (error) {
    console.error('create-portal-session failed', error);
    return sendJson(res, 500, { error: error.message || 'Portal failed' });
  }
}
