import { stripe, sendJson, subscriptionIsActive } from './_utils.js';

async function productLabelForItem(item, cache) {
  const price = item.price;
  if (!price) return 'Premium';

  const fallback = price.nickname || price.id || 'Premium';
  const product = price.product;
  if (!product) return fallback;
  if (typeof product === 'object' && product.name) return product.name;

  if (typeof product === 'string') {
    if (!cache.has(product)) {
      try {
        const productData = await stripe.products.retrieve(product);
        cache.set(product, productData.name || fallback);
      } catch {
        cache.set(product, fallback);
      }
    }
    return cache.get(product);
  }

  return fallback;
}

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
        expand: ['data.items.data.price'],
        limit: 20
      });
      subscriptions.push(...list.data);
    }

    const activeSubscriptions = subscriptions.filter(subscriptionIsActive);
    const productCache = new Map();
    const subscriptionSummaries = [];
    for (const sub of activeSubscriptions) {
      const products = [];
      for (const item of sub.items.data) {
        products.push(await productLabelForItem(item, productCache));
      }
      subscriptionSummaries.push({
        id: sub.id,
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        products
      });
    }

    return sendJson(res, 200, {
      active: activeSubscriptions.length > 0,
      subscriptions: subscriptionSummaries
    });
  } catch (error) {
    console.error('subscription-status failed', error);
    return sendJson(res, 500, { error: error.message || 'Status check failed' });
  }
}
