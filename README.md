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

1. Navigate to the project directory:
```bash
cd "d:\Elite Path"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Building for Production

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
