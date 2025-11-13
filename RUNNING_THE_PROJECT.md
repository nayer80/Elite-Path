# 🚀 Running Your Rayna Tours Website

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed ([download](https://nodejs.org))
- ✅ npm installed (comes with Node.js)
- ✅ ~500MB disk space for dependencies
- ✅ Internet connection for first install

Check your versions:
```powershell
node --version
npm --version
```

---

## 📥 Installation

### Method 1: Automatic Installation (Recommended)

**Windows:**
```powershell
# Double-click install.bat
# OR run from PowerShell:
.\install.bat
```

**PowerShell:**
```powershell
# Run PowerShell as Administrator
.\install.ps1
```

### Method 2: Manual Installation

```powershell
# Navigate to project
cd "d:\Elite Path"

# Clean previous installations (optional)
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue

# Install dependencies
npm install

# If issues occur, try:
npm install --legacy-peer-deps
```

---

## ▶️ Running Development Server

```powershell
cd "d:\Elite Path"
npm run dev
```

You'll see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
```

Open http://localhost:3000 in your browser! 🎉

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where `npm run dev` is running.

---

## 🔨 Building for Production

```powershell
# Create optimized build
npm run build

# Start production server
npm start
```

This creates `.next/` folder with optimized code (~100MB).

---

## 🧹 Cleaning Up

If you encounter issues:

```powershell
# Clear Next.js cache
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

---

## 🔍 Troubleshooting

### Issue: Port 3000 Already in Use
```powershell
# Use different port
npm run dev -- -p 3001
```
Then visit http://localhost:3001

### Issue: Module Not Found
```powershell
# Delete and reinstall
Remove-Item node_modules -Recurse -Force
npm install
```

### Issue: Installation Fails
```powershell
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or clear cache first
npm cache clean --force
npm install
```

### Issue: TypeScript Errors After Starting
These are warnings only and don't affect functionality. They'll be resolved after installing dependencies properly.

```powershell
# Usually fixes with:
npm install

# Then restart with:
npm run dev
```

---

## 📝 Available Commands

```powershell
npm run dev      # Start development server (localhost:3000)
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Check code quality
```

---

## 🎨 Environment Setup

Create `.env.local` file in project root for environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

See `.env.example` for all available variables.

---

## 🌐 Accessing Your Website

- **Development**: http://localhost:3000
- **All Pages**: See QUICKSTART.md for page URLs
- **Admin**: Not included (you can add this)

---

## 💾 File Changes

When you make changes to files:
- ✅ Pages automatically reload (hot reload)
- ✅ Styles update instantly
- ✅ Component changes reflect immediately

Just edit and save - no need to restart!

---

## 📊 Performance Tips

1. **Build before production** - Run `npm run build`
2. **Enable compression** - Included in next.config.js
3. **Optimize images** - Use Next.js Image component
4. **Monitor size** - Check `.next/` folder size

---

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Keep `node_modules` in `.gitignore`
- Update dependencies regularly: `npm update`
- Check for vulnerabilities: `npm audit`

---

## 📱 Testing Different Devices

1. **Desktop**: Use browser normally
2. **Tablet**: Press F12, click device toggle (top-left)
3. **Mobile**: Resize browser or use:
   - Chrome DevTools responsive mode
   - Physical device on same network

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] Run `npm run build` - no errors?
- [ ] Test with `npm start`
- [ ] Update `.env` for production
- [ ] Choose hosting platform
- [ ] Push to GitHub (for platforms like Vercel)
- [ ] Deploy!

---

## 📞 Getting Help

Check these files:
1. **QUICKSTART.md** - Quick setup
2. **README.md** - Full documentation
3. **DEVELOPMENT.md** - Development guide
4. **PROJECT_SUMMARY.md** - Project overview

---

## 💡 Pro Tips

1. Use VS Code for better development experience
2. Install "ES7+ React/Redux/React-Native snippets" extension
3. Use browser DevTools to inspect elements
4. Check console (F12) for any errors
5. Use `npm list` to see installed packages

---

**Happy coding! 🎉**

If you encounter any issues, restart the development server:
```powershell
# Stop with Ctrl+C
# Then restart
npm run dev
```

Most issues are fixed by restarting!
