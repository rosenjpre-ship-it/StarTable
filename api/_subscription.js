import { normalizeEmail } from './_data.js';

async function activeSubscriptionForEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || !process.env.STRIPE_SECRET_KEY) {
    return { active: false, plan: 'Free', renewal: '-' };
  }

  const { stripe, subscriptionIsActive } = await import('./stripe/_utils.js');
  const customers = await stripe.customers.list({ email: normalized, limit: 10 });
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
  const active = subscriptions.find(subscriptionIsActive);
  if (!active) return { active: false, plan: 'Free', renewal: '-' };
  const price = active.items?.data?.[0]?.price;
  const interval = price?.recurring?.interval;
  const plan = interval === 'year' ? 'Yearly' : interval === 'month' ? 'Monthly' : 'Premium';
  const end = active.current_period_end || active.items?.data?.[0]?.current_period_end;
  return {
    active: true,
    plan,
    renewal: end ? new Date(end * 1000).toISOString().slice(0, 10) : '-',
    subscriptionId: active.id
  };
}

export { activeSubscriptionForEmail };
