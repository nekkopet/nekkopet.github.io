const PUBLIC_KEY = process.env.STRIPE_PUBLISHABLE_KEY || '';

export default {
  enabled: !!PUBLIC_KEY,
}


