import { stripe, sendJson, readJson, siteUrl, findPrice, findOrCreateCustomerByEmail } from './_utils.js';
import { activeSubscriptionForEmail } from '../_subscription.js';

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
    const plan = body.plan === 'monthly' ? 'monthly' : 'yearly';
    const email = String(body.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return sendJson(res, 400, { error: 'A valid email is required' });
    }

    const existingSubscription = await activeSubscriptionForEmail(email);
    if (existingSubscription.active) {
      return sendJson(res, 409, {
        error: 'This email already has an active subscription. Please manage it from My page.',
        subscription: existingSubscription
      });
    }

    const price = await findPrice(plan);
    const customer = await findOrCreateCustomerByEmail(email);
    const baseUrl = siteUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer.id,
      line_items: [{ price, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${baseUrl}/index.html?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/index.html?checkout=cancelled`,
      subscription_data: {
        metadata: {
          app: 'startable',
          plan
        }
      },
      metadata: {
        app: 'startable',
        plan,
        email
      }
    });

    return sendJson(res, 200, { url: session.url });
  } catch (error) {
    console.error('create-checkout-session failed', error);
    return sendJson(res, 500, { error: error.message || 'Checkout failed' });
  }
}
