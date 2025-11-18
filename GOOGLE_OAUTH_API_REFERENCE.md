# Google OAuth API Reference

## Overview
This document describes the Google OAuth 2.0 API endpoints and client-side implementations.

## Client-Side Components

### GoogleLogin Component
The `@react-oauth/google` library provides the `<GoogleLogin />` component.

**Location**: Used in `src/components/HeaderBar.jsx`

**Props**:
```typescript
<GoogleLogin
  onSuccess={handleGoogleSuccess}      // Called when auth succeeds
  onError={handleGoogleError}          // Called when auth fails
  theme="outline"                      // UI theme (outline, filled_blue, filled_black)
  size="small"                         // Button size (small, medium, large)
  text="signin"                        // Button text (signin, signup, signin_with)
/>
```

**Success Response**:
```typescript
{
  credential: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdmZTQ0YzdhZjQyY..."  // JWT token
  clientId?: string                    // Client ID used
  select_by?: string                   // How account was selected
}
```

## Server-Side API Endpoints

### POST /api/auth/google/exchange
Exchanges OAuth authorization code for user information.

**Request**:
```json
{
  "code": "4/0AZ-utX8...",
  "state": "optional_state_value"
}
```

**Success Response** (200):
```json
{
  "user": {
    "id": "103512847....",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/a/..."
  },
  "accessToken": "ya29.a0AfH6SMB...",
  "message": "Successfully signed in with Google"
}
```

**Error Response** (400/401/500):
```json
{
  "error": "Authorization code is required."
}
```

**Possible Errors**:
- 400: Missing authorization code
- 401: Code exchange failed (invalid or expired code)
- 500: Server misconfiguration (missing credentials)

---

## React Hooks

### useAuth Hook
Provides authentication state and methods to components.

**Location**: `src/lib/AuthContext.tsx`

**Import**:
```typescript
import { useAuth } from '@/lib/AuthContext';
```

**Usage**:
```typescript
const { 
  user,              // User object or null
  loading,           // Boolean - true while loading
  isAuthenticated,   // Boolean - true if user is logged in
  login,             // Function to set user (used internally)
  logout,            // Function to clear user
  accessToken        // String - Google access token (if available)
} = useAuth();
```

**Types**:
```typescript
interface User {
  id: string;        // Google account ID
  email: string;     // User's email
  name: string;      // User's full name
  picture: string;   // URL to profile picture
}
```

---

## Authentication Flow

```
1. User Interaction
   └─> Click "Sign in with Google" button in header

2. Google OAuth
   └─> Google displays Account Picker (official UI)
   └─> User selects account or logs in
   └─> Google returns credential (JWT)

3. Client Processing (HeaderBar.jsx)
   └─> handleGoogleSuccess() called
   └─> JWT decoded to extract user info
   └─> login() called to store user in context

4. Data Storage
   └─> AuthContext stores user and token
   └─> localStorage persists data
   └─> Header updates to show user profile

5. Subsequent Requests
   └─> AuthContext.tsx loads data on mount from localStorage
   └─> useAuth() hook provides access throughout app
```

---

## Context Provider Setup

### AuthProvider Component
Located in `src/lib/AuthContext.tsx`

**Wrapping**:
```typescript
// In layout.tsx or root component
import { AuthProvider } from '@/lib/AuthContext';

<AuthProvider>
  {children}
</AuthProvider>
```

**Initialization**:
- Loads user data from localStorage on mount
- Initializes auth state
- Provides useAuth() hook to all children

---

## Data Persistence

### localStorage Keys

| Key | Type | Value |
|-----|------|-------|
| `user` | JSON string | Serialized User object |
| `accessToken` | String | Google access token |

**Example localStorage contents**:
```javascript
localStorage.getItem('user')
// Returns: '{"id":"...","email":"user@email.com","name":"John","picture":"https://..."}'

localStorage.getItem('accessToken')
// Returns: "ya29.a0AfH6SMB4X..."
```

### Session Persistence
- User data survives page refresh
- Data persists across browser tabs (via localStorage events)
- Logout clears both localStorage and context

---

## Environment Variables

**Required for Client**:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
```

**Required for Server**:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Error Handling

### Google Sign-In Errors

**Popup Blocked**:
- Browser blocked the OAuth popup
- User needs to allow popups for your domain

**Network Error**:
- Check internet connection
- Verify Google OAuth endpoints are accessible

**Invalid Client ID**:
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in .env.local
- Check Google Cloud Console for typos

**Redirect URI Mismatch**:
- Ensure redirect URI in Google Cloud Console matches exactly
- Must include protocol and port: `http://localhost:3000/auth/google/callback`

---

## Security Considerations

### Client-Side (Development)
```typescript
// Current implementation - suitable for demo/development
const jsonPayload = decodeURIComponent(atob(base64).split('').map(...));
const decodedToken = JSON.parse(jsonPayload);
```

### Server-Side (Production - Recommended)
```typescript
// Production should verify and validate JWT
import jwt from 'jsonwebtoken';

const decoded = jwt.verify(credential, GOOGLE_PUBLIC_KEY);
// Verify: aud (audience), iss (issuer), exp (expiration)
```

### Best Practices
1. ✅ Always validate tokens on server
2. ✅ Use HTTPS in production
3. ✅ Store sensitive tokens in httpOnly cookies
4. ✅ Implement token refresh
5. ✅ Set proper CORS headers
6. ✅ Validate redirect URIs
7. ✅ Use PKCE for additional security

---

## Integration Examples

### Protecting a Page
```typescript
'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/'); // Redirect to home
    return <div>Redirecting...</div>;
  }

  return <div>Welcome, {user?.name}!</div>;
}
```

### Making Authenticated Requests
```typescript
const { accessToken } = useAuth();

const response = await fetch('https://www.googleapis.com/drive/v3/files', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### Custom User Data Display
```typescript
const { user, logout } = useAuth();

return (
  <div className="user-profile">
    <img src={user?.picture} alt={user?.name} />
    <h1>{user?.name}</h1>
    <p>{user?.email}</p>
    <button onClick={logout}>Sign Out</button>
  </div>
);
```

---

## Debugging

### Enable Debug Logging
```typescript
// In HeaderBar.jsx
const handleGoogleSuccess = async (credentialResponse) => {
  console.log('OAuth Response:', credentialResponse);
  console.log('Decoded User:', userData);
  console.log('Auth Context:', { user, isAuthenticated });
};
```

### Check Browser Storage
```javascript
// In browser console
localStorage.getItem('user')
localStorage.getItem('accessToken')
```

### Check Network Requests
1. Open DevTools → Network tab
2. Click Sign in button
3. Monitor requests to `oauth2.googleapis.com`
4. Check `/auth/google/callback` response

---

## References

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Identity Services JavaScript SDK](https://developers.google.com/identity/gsi/web)
- [@react-oauth/google on NPM](https://www.npmjs.com/package/@react-oauth/google)
- [JWT Validation](https://tools.ietf.org/html/rfc7519)

---

## Version Info

- React OAuth Google: Latest via npm install
- Next.js: 14.2.33
- React: 18.2.0
- Implementation Date: November 2025
