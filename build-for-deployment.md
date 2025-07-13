# 🚀 Safe Build Process for Deployment

## ⚠️ IMPORTANT: White Screen Prevention

**The Issue**: Running `npm run build` while the development server is running causes webpack cache corruption, resulting in a white screen.

**The Solution**: Always follow this safe build process:

## 📋 Step-by-Step Safe Build Process

### 1. Stop Development Server
```bash
# Press Ctrl+C in the terminal running the dev server
# Or close the terminal window
```

### 2. Clean Build (Recommended)
```bash
# Use the safe build command (cleans cache automatically)
npm run build:safe
```

### 3. Alternative Manual Process
```bash
# Clean cache manually
npm run clean

# Then build
npm run build
```

### 4. Restart Development (After Deployment)
```bash
# Start development server again
npm run dev
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Standard build (can cause issues if dev server running)
- `npm run build:safe` - Safe build (cleans cache first)
- `npm run clean` - Clean .next and out directories
- `npm run lint` - Run ESLint

## ✅ Deployment Checklist

- [ ] Stop development server (`Ctrl+C`)
- [ ] Run `npm run build:safe`
- [ ] Check `out/` directory exists
- [ ] Upload `out/` contents to Cloudflare Pages
- [ ] Test deployed site
- [ ] Restart development: `npm run dev`

## 🔧 Troubleshooting

### If White Screen Appears:
1. Stop all Node.js processes
2. Run `npm run clean`
3. Run `npm run dev`
4. Refresh browser

### If Build Fails:
1. Check Node.js version (18.x or 20.x)
2. Run `npm install`
3. Run `npm run build:safe`

This process ensures your portfolio builds correctly every time without cache conflicts!
