# Rayna Tours - Travel & Tourism Website

A modern, fully-featured travel and tourism website built with Next.js, React, and TypeScript, styled with Tailwind CSS.

## Features

### Pages Included

1. **Home Page** - Hero section, featured activities, hotels, services showcase, testimonials
2. **Activities** - Browse and filter tours and experiences with ratings and prices
3. **Hotels** - Find luxury accommodations with search and filter options
4. **Holidays** - All-inclusive vacation packages with details
5. **Visas** - International visa services with processing information
6. **Cruises** - Ocean voyage packages with port information
7. **Destinations** - Popular travel destinations with activity highlights
8. **About Us** - Company history, team, and core values
9. **Contact** - Contact form, location info, and customer service details
10. **Login/Sign Up** - User authentication page with social login options
11. **Privacy Policy** - Privacy policy and data handling information
12. **Terms & Conditions** - Usage terms and conditions

### Key Components

- **Header** - Responsive navigation bar with mobile menu
- **Footer** - Comprehensive footer with links and contact info
- **Activity Card** - Reusable card component for activities
- **Hotel Card** - Reusable card component for hotels

### Features

- ✅ Fully Responsive Design (Mobile, Tablet, Desktop)
- ✅ Modern UI with Tailwind CSS
- ✅ Search and Filter Functionality
- ✅ Contact Forms
- ✅ Authentication Pages
- ✅ User-friendly Navigation
- ✅ SEO Optimized
- ✅ Fast Performance

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Frontend**: React 18
- **Configuration**: PostCSS, Autoprefixer

## Installation

## 🔐 Google OAuth 2.0 Authentication

Google OAuth 2.0 has been integrated for user authentication. Users can sign in with their Google accounts directly from the header bar.

### Quick Start
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth credentials and copy your Client ID
3. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```
4. Run `npm run dev` and click "Sign in with Google" button

### Features
- ✅ Official Google Account Picker UI
- ✅ Secure OAuth 2.0 authentication
- ✅ User profile display (picture + name)
- ✅ Persistent login across sessions
- ✅ Easy integration with `useAuth()` hook

### Documentation
- **Quick Start**: See `GOOGLE_OAUTH_QUICKSTART.md`
- **Complete Setup**: See `GOOGLE_OAUTH_SETUP.md`
- **API Reference**: See `GOOGLE_OAUTH_API_REFERENCE.md`
- **Implementation Details**: See `GOOGLE_OAUTH_IMPLEMENTATION.md`
- **Visual Summary**: See `GOOGLE_OAUTH_VISUAL_SUMMARY.md`

### Using Authentication in Components
```typescript
import { useAuth } from '@/lib/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) return <p>Please sign in</p>;
  
  return <h1>Welcome, {user?.name}!</h1>;
}
```

1. Navigate to the project directory:
```bash
3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Building for Production

For Google OAuth setup help, see the OAuth documentation files in the project root.
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── activities/page.tsx      # Activities page
│   ├── hotels/page.tsx          # Hotels page
│   ├── holidays/page.tsx        # Holiday packages
│   ├── visas/page.tsx           # Visa services
│   ├── cruises/page.tsx         # Cruise packages
│   ├── destinations/page.tsx    # Destinations
│   ├── about/page.tsx           # About us
│   ├── contact/page.tsx         # Contact page
│   ├── login/page.tsx           # Login/Sign up
│   ├── privacy/page.tsx         # Privacy policy
│   ├── terms/page.tsx           # Terms & conditions
│   └── layout.tsx               # Root layout
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer component
│   ├── ActivityCard.tsx         # Activity card
│   └── HotelCard.tsx            # Hotel card
└── globals.css                  # Global styles
```

## Customization

### Colors
Edit the Tailwind config in `tailwind.config.ts`:
```typescript
colors: {
  primary: '#FF6B35',      // Orange
  secondary: '#004E89',    // Blue
  accent: '#F7931E',       // Yellow
}
```

### Content
Update content in individual page files (src/app/*/page.tsx)

### Images
Replace emoji placeholders with actual images by modifying the card components

## Future Enhancements

- Database integration for dynamic content
- Payment gateway integration
- User profile management
- Booking system
- Admin dashboard
- Email notifications
- Real-time availability updates
- Review and ratings system

## License

This project is open source and available for customization.

## Support

For questions or support, visit the contact page or email info@raynatours.com
