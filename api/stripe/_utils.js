import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-06-24.preview'
});

const PRODUCT_NAMES = {
  monthly: 'StarTable Premium Monthly',
  yearly: 'StarTable Premium Yearly'
};

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function siteUrl(req) {
  const configured = process.env.SITE_URL || process.env.VERCEL_URL;
  if (configured) return configured.startsWith('http') ? configured : `https://${configured}`;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${req.headers.host}`;
}

async function findPrice(plan) {
  const normalized = plan === 'monthly' ? 'monthly' : 'yearly';
  const envKey = normalized === 'monthly' ? 'STRIPE_MONTHLY_PRICE_ID' : 'STRIPE_YEARLY_PRICE_ID';
  if (process.env[envKey]) return process.env[envKey];

  // Reuse existing Stripe Products and Prices only. This integration never creates
  // Products or Prices from application code.
  const productName = PRODUCT_NAMES[normalized];
  const products = await stripe.products.search({
    query: `name:'${productName.replace(/'/g, "\\'")}' AND active:'true'`,
    limit: 5
  });
  const product = products.data.find(item => item.name === productName) || products.data[0];
  if (!product) {
    throw new Error(`Stripe product not found: ${productName}`);
  }

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 20
  });
  const interval = normalized === 'monthly' ? 'month' : 'year';
  const price = prices.data.find(item => item.recurring?.interval === interval) || prices.data[0];
  if (!price) {
    throw new Error(`Active recurring price not found for: ${productName}`);
  }
  return price.id;
}

async function findOrCreateCustomerByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    throw new Error('A valid email is required');
  }

  const existing = await stripe.customers.list({
    email: normalizedEmail,
    limit: 1
  });
  if (existing.data[0]) return existing.data[0];

  return stripe.customers.create({
    email: normalizedEmail,
    metadata: {
      app: 'startable'
    }
  });
}

function subscriptionIsActive(subscription) {
  return ['active', 'trialing'].includes(subscription.status);
}

export {
  stripe,
  PRODUCT_NAMES,
  sendJson,
  readJson,
  readRawBody,
  siteUrl,
  findPrice,
  findOrCreateCustomerByEmail,
  subscriptionIsActive
};
