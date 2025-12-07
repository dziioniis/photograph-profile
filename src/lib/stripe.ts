import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-11-17.clover',
});

export const createCheckoutSession = async ({
  productId,
  productName,
  priceCents,
  currency,
  successUrl,
  cancelUrl,
}: {
  productId: string;
  productName: string;
  priceCents: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: productName,
            metadata: {
              productId,
            },
          },
          unit_amount: priceCents,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      productId,
    },
  });

  return session;
};
