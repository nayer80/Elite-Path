import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/google/exchange
 * Exchanges Google authorization code for access token and user info.
 * 
 * Request body:
 *   { code: string, state?: string }
 * 
 * Response:
 *   { user: { id, email, name, picture }, accessToken: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { code, state } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required.' }, { status: 400 });
    }

    // Get credentials from environment
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/google/callback`;

    if (!clientId || !clientSecret) {
      console.error('Google OAuth credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error: Google credentials missing.' },
        { status: 500 }
      );
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Google token exchange failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange authorization code with Google.' },
        { status: 401 }
      );
    }

    const tokens = await tokenResponse.json();
    const accessToken = tokens.access_token;
    const idToken = tokens.id_token;

    // Fetch user info using the access token
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userInfoResponse.ok) {
      console.error('Failed to fetch user info from Google');
      return NextResponse.json(
        { error: 'Failed to retrieve user information from Google.' },
        { status: 500 }
      );
    }

    const userInfo = await userInfoResponse.json();

    // In production, you would:
    // 1. Create or update a user in your database
    // 2. Generate your own session/JWT token
    // 3. Return it securely (e.g., in an httpOnly cookie)
    // 
    // For now, we return a simple success response with user data.

    const response = NextResponse.json(
      {
        user: {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        },
        accessToken, // In production, store this securely and don't send to client
        message: 'Successfully signed in with Google',
      },
      { status: 200 }
    );

    // Optionally set an httpOnly cookie for the session (recommended for production)
    // response.cookies.set('sessionToken', yourJWT, { httpOnly: true, secure: true, sameSite: 'strict' });

    return response;
  } catch (error) {
    console.error('Google OAuth exchange error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during sign-in.' },
      { status: 500 }
    );
  }
}
