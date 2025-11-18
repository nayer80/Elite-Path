# Google OAuth 2.0 Implementation Guide

## Overview
Google OAuth 2.0 has been successfully implemented in the Elite Path application. Users can now sign in using their Google accounts directly from the header bar with the official Google Account Picker UI.

## What Was Implemented

### 1. **Authentication Context (`src/lib/AuthContext.tsx`)**
   - Manages user authentication state globally
   - Stores user data and access token
   - Provides `useAuth()` hook for components
   - Persists authentication state to localStorage

### 2. **Auth Provider Wrapper (`src/components/AuthProviderWrapper.tsx`)**
   - Wraps the entire application with Google OAuth and Auth providers
   - Configured with `NEXT_PUBLIC_GOOGLE_CLIENT_ID` from environment variables
   - Ensures Google OAuth is available throughout the app

### 3. **Updated Layout (`src/app/layout.tsx`)**
   - Wrapped with `AuthProviderWrapper`
   - Makes authentication available to all pages and components

### 4. **Enhanced Header Bar (`src/components/HeaderBar.jsx`)**
   - Replaced simple "Log In" link with Google OAuth button
   - Shows Google's official Account Picker UI when user clicks
   - Displays user profile picture, name, and email when authenticated
   - Includes logout button in user dropdown menu
   - Handles OAuth success and error states

### 5. **Backend Exchange Endpoint (`src/app/api/auth/google/exchange/route.ts`)**
   - Already in place - exchanges authorization code for tokens
   - Fetches user info from Google API
   - Returns user data and access token

### 6. **Callback Page (`src/app/auth/google/callback/page.tsx`)**
   - Already in place - handles OAuth callback
   - Exchanges code for user data via backend
   - Redirects to home after successful authentication

## Getting Started

### Step 1: Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** (or **Google Identity Service**)
4. Go to **Credentials** → Create OAuth 2.0 credentials:
   - Select **Web Application**
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `http://localhost:3001` (if using port 3001)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `http://localhost:3001/auth/google/callback`
     - `https://yourdomain.com/auth/google/callback` (production)
5. Copy the **Client ID** and **Client Secret**

### Step 2: Configure Environment Variables

Create or update `.env.local` in the project root:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** 
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are server-side only
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is public (used by Google OAuth library on client)
- Never commit `.env.local` to version control

### Step 3: Restart the Development Server

```bash
npm run dev
```

## How It Works

### User Flow

1. **User clicks "Sign in" button** in the header
   - Google's official Account Picker appears
   
2. **User selects/signs into Google account**
   - Google shows standard consent screen for your app
   
3. **Backend processes OAuth**
   - `handleGoogleSuccess()` decodes the JWT from Google
   - Extracts user info (id, email, name, picture)
   - Stores in `AuthContext` and localStorage
   
4. **User is now authenticated**
   - Header shows user's profile picture and name
   - A dropdown menu appears with Logout option

5. **User clicks Logout**
   - User data is cleared from context and storage
   - Header shows Google Sign In button again

### Technology Stack

- **Frontend OAuth**: `@react-oauth/google` - Official Google React library
- **Backend Exchange**: Next.js API routes (`/api/auth/google/exchange`)
- **State Management**: React Context API with `AuthContext`
- **Storage**: localStorage for persistence across sessions
- **JWT Handling**: Client-side JWT decoding for immediate user info

## Components & Hooks

### `useAuth()` Hook
Access authentication state anywhere in your app:

```typescript
import { useAuth } from '@/lib/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, accessToken } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.name}!</div>;
}
```

### User Object Structure
```typescript
interface User {
  id: string;        // Google account ID
  email: string;     // User's email
  name: string;      // User's full name
  picture: string;   // URL to profile picture
}
```

## API Integration

### Exchange Endpoint
- **URL**: `POST /api/auth/google/exchange`
- **Request**: `{ code: string, state?: string }`
- **Response**: `{ user: User, accessToken: string }`

This endpoint:
1. Exchanges the OAuth authorization code for tokens
2. Fetches user info from Google API
3. Returns user data and access token

**For Production**: You should:
- Create/update user in your database
- Generate your own JWT or session token
- Set httpOnly cookies for enhanced security
- Never expose access tokens to the client

## Security Considerations

### Current Implementation (Development)
- JWT decoded on client side
- User data stored in localStorage
- Access token available to JavaScript

### Production Recommendations
1. **Use httpOnly Cookies**: Store tokens in secure httpOnly cookies
2. **Backend Sessions**: Implement server-side sessions or JWT tokens
3. **PKCE Flow**: Use PKCE for additional security
4. **Token Refresh**: Implement token refresh logic
5. **CORS**: Configure CORS properly on backend
6. **HTTPS**: Ensure all OAuth endpoints use HTTPS
7. **CSP Headers**: Set Content Security Policy headers
8. **Validate Tokens**: Always validate ID tokens on the backend

## Troubleshooting

### "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set" Warning
- Make sure `.env.local` file exists in project root
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Restart dev server after adding/changing env vars

### Google Account Picker Not Appearing
- Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is valid
- Verify authorized origins in Google Cloud Console
- Check browser console for errors
- Ensure localhost is added to authorized origins

### "Redirect URI Mismatch" Error
- In Google Cloud Console, verify redirect URI matches exactly
- Include protocol and port: `http://localhost:3000/auth/google/callback`
- Add all possible URLs (localhost, production domain, etc.)

### OAuth Not Persisting After Page Refresh
- Check if localStorage is enabled in browser
- Verify `AuthContext` is loading data on mount
- Check browser's Application tab → Storage → localStorage

## Using with Other Pages

Once a user is authenticated, you can access their info in any component:

```typescript
'use client';

import { useAuth } from '@/lib/AuthContext';

export default function ProtectedPage() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in first</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <img src={user?.picture} alt={user?.name} />
    </div>
  );
}
```

## Next Steps

1. **Test the flow** using the Google Account Picker
2. **Set up backend database** to store user data
3. **Implement session management** for production
4. **Add role-based access control** if needed
5. **Customize the user menu** with additional options
6. **Monitor OAuth events** and errors in analytics

## Files Modified

- `package.json` - Added `@react-oauth/google`
- `src/lib/AuthContext.tsx` - Created new file
- `src/components/AuthProviderWrapper.tsx` - Created new file
- `src/app/layout.tsx` - Wrapped with AuthProviderWrapper
- `src/components/HeaderBar.jsx` - Added Google OAuth button and user menu
- `.env.local` - Created with configuration template

## References

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google on NPM](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
