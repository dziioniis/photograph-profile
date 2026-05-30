import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { getProductById } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    const product = await getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
      productId: product.id,
      productName: product.title,
      priceCents: product.priceCents,
      currency: product.currency,
      successUrl: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/shop/${product.slug}`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
