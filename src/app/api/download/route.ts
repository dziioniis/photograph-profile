import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const sessionId = searchParams.get('session_id');

    if (!token && !sessionId) {
      return NextResponse.json(
        { error: 'Missing token or session_id' },
        { status: 400 }
      );
    }

    // In a real application:
    // 1. Verify the token or session
    // 2. Check if the download has already been used (limit downloads)
    // 3. Log the download
    // 4. Return the file or a redirect to a signed S3 URL

    if (sessionId) {
      // Verify the Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== 'paid') {
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 403 }
        );
      }

      // Get the product from session metadata
      const productId = session.metadata?.productId;

      if (!productId) {
        return NextResponse.json(
          { error: 'Invalid session' },
          { status: 400 }
        );
      }

      // TODO: Implement file download
      // For digital products, you would:
      // 1. Generate a signed URL for the file (e.g., from S3)
      // 2. Track the download in your database
      // 3. Return the file or redirect to the signed URL

      return NextResponse.json({
        message: 'Download ready',
        productId,
        // downloadUrl: signedUrl,
      });
    }

    // Token-based download
    // TODO: Verify token and return file
    return NextResponse.json({
      message: 'Token verified',
      // downloadUrl: signedUrl,
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}
