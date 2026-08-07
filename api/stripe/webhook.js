import { stripe, sendJson, readRawBody } from './_utils.js';

const HANDLED_EVENTS = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return sendJson(res, 500, { error: 'Missing Stripe webhook configuration' });
  }

  let event;
  try {
    const payload = await readRawBody(req);
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('webhook signature verification failed', error);
    return sendJson(res, 400, { error: `Webhook Error: ${error.message}` });
  }

  if (HANDLED_EVENTS.has(event.type)) {
    const object = event.data.object;
    console.log('Stripe event handled', {
      type: event.type,
      id: object.id,
      customer: object.customer,
      subscription: object.subscription,
      status: object.status
    });
  }

  return sendJson(res, 200, { received: true });
}
