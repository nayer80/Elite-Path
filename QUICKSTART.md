# Quick Start Guide - Rayna Tours Website

## 🚀 5-Minute Setup

### Step 1: Open PowerShell and Navigate to Project
```powershell
cd "d:\Elite Path"
```

### Step 2: Install Dependencies
```powershell
npm install
```
This will download all required packages (takes 2-3 minutes on first run).

### Step 3: Start Development Server
```powershell
npm run dev
```

### Step 4: Open Website
Open your browser and go to:
```
http://localhost:3000
```

That's it! Your travel website is now running! 🎉

---

## 📖 Website Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero section with featured activities & hotels |
| Activities | `/activities` | Browse and filter tours and experiences |
| Hotels | `/hotels` | Find luxury accommodations |
| Holidays | `/holidays` | All-inclusive vacation packages |
| Visas | `/visas` | International visa services |
| Cruises | `/cruises` | Ocean voyage packages |
| Destinations | `/destinations` | Popular travel destinations |
| About | `/about` | Company information |
| Contact | `/contact` | Contact form and information |
| Login | `/login` | User authentication page |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms and conditions |

---

## 🎨 Customizing Your Website

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#FF6B35',      // Change to your color
  secondary: '#004E89',
  accent: '#F7931E',
}
```

### Change Website Name
Replace "Rayna Tours" with your company name in:
- `src/components/Header.tsx` (line with logo)
- `src/app/layout.tsx` (page title)
- All page files

### Add Your Logo
1. Place image in `public/` folder
2. Update Header component to use your image instead of emoji

### Update Content
Edit content in each page file:
- `src/app/*/page.tsx` - Update activities, hotels, destinations, etc.

---

## 📦 What's Included

✅ **12 Complete Pages** - All content ready to use
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Modern UI** - Beautiful cards and layouts
✅ **Search Filters** - Activities, hotels, visas filtering
✅ **Contact Form** - Get customer inquiries
✅ **Authentication** - Login/Sign up pages
✅ **Reusable Components** - Activity and Hotel cards
✅ **Mobile Menu** - Full mobile navigation

---

## 🔧 Production Build

When ready to deploy:

```powershell
npm run build
npm start
```

This creates an optimized production build.

---

## 📤 Deploying to Internet

### Option 1: Vercel (Easiest)
1. Push code to GitHub
2. Visit [Vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy with one click

### Option 2: Other Hosting
- Heroku
- DigitalOcean
- AWS
- Azure
- GCP

---

## 💡 Next Steps

1. **Add Database** - Connect to MongoDB/PostgreSQL for dynamic content
2. **Add Payment** - Integrate Stripe for bookings
3. **Add Authentication** - Use NextAuth.js for user accounts
4. **Add Email** - SendGrid for booking confirmations
5. **Add Booking System** - Calendar and booking management
6. **Add Admin Dashboard** - Manage content and bookings

---

## ❓ Common Questions

**Q: Can I change the design?**
A: Yes! Edit Tailwind classes in any page file.

**Q: How do I add more activities?**
A: Edit the `activities` array in `src/app/activities/page.tsx`

**Q: Can I use real images?**
A: Yes! Replace emoji placeholders with image URLs.

**Q: How do I add a database?**
A: Install your preferred database driver and update API routes.

---

## 🆘 Need Help?

Check these files:
- `README.md` - Full project documentation
- `DEVELOPMENT.md` - Development guide
- `src/app/layout.tsx` - Main layout structure
- Component files in `src/components/`

---

## ⚡ Performance Tips

- Images load faster with Next.js Image component
- Build for production to get optimizations
- Use CDN for static assets
- Enable caching in production

---

**Happy coding! 🚀**
