# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Initial Setup

1. **Clone/Download the project**
```bash
cd "d:\Elite Path"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server (hot reload enabled)
- `npm run build` - Create optimized production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

### File Structure
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components
- `src/globals.css` - Global styles and Tailwind imports
- `public/` - Static assets

### Key Files
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies

## Adding New Pages

1. Create a new folder in `src/app/`
2. Add `page.tsx` file
3. Export default component

Example:
```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

## Adding New Components

1. Create component file in `src/components/`
2. Export component

Example:
```typescript
// src/components/MyComponent.tsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

## Styling Guidelines

- Use Tailwind CSS classes for styling
- Use custom colors defined in `tailwind.config.ts`
- Use `.btn-primary` and `.btn-secondary` for buttons
- Use `.container` class for layout containers

### Color System
- Primary: `#FF6B35` (Orange)
- Secondary: `#004E89` (Blue)
- Accent: `#F7931E` (Yellow)

## Environment Variables

Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

For more config options, see `.env.example`

## Building for Production

```bash
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Node.js applications.

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clear cache
```bash
rm -r .next
npm run dev
```

### Install issues
```bash
npm install --legacy-peer-deps
```

## Best Practices

1. **Component Organization** - Keep components focused and reusable
2. **Naming Conventions** - Use PascalCase for components
3. **Code Comments** - Add comments for complex logic
4. **Performance** - Use Next.js Image component for images
5. **Accessibility** - Include proper ARIA labels and semantic HTML

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
