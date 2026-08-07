import { stripe, sendJson, subscriptionIsActive } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return sendJson(res, 200, { active: false, reason: 'stripe_not_configured' });
  }

  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const email = String(url.searchParams.get('email') || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return sendJson(res, 400, { error: 'A valid email is required' });
    }

    const customers = await stripe.customers.list({ email, limit: 10 });
    const subscriptions = [];
    for (const customer of customers.data) {
      const list = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'all',
        expand: ['data.items.data.price.product'],
        limit: 20
      });
      subscriptions.push(...list.data);
    }

    const activeSubscriptions = subscriptions.filter(subscriptionIsActive);
    return sendJson(res, 200, {
      active: activeSubscriptions.length > 0,
      subscriptions: activeSubscriptions.map(sub => ({
        id: sub.id,
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        products: sub.items.data.map(item => item.price.product?.name || item.price.nickname || item.price.id)
      }))
    });
  } catch (error) {
    console.error('subscription-status failed', error);
    return sendJson(res, 500, { error: error.message || 'Status check failed' });
  }
}
