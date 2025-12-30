# Deployment Guide - Vercel

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Step-by-Step Deployment

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Deploy via Vercel Dashboard

1. **Visit [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository** (`JohnyLib/RevOrgs`)
4. **Configure Project Settings**:
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

5. **Environment Variables** (Optional - for EmailJS):
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

6. **Click "Deploy"**

7. **Wait for build to complete** (~1-2 minutes)

8. **Your site is live!** 🎉

#### 3. Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** → **Domains**
3. Add your domain (e.g., `revorgs.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

## Post-Deployment Checklist

- [ ] Test all pages and navigation
- [ ] Verify contact form works (if EmailJS is configured)
- [ ] Check mobile responsiveness
- [ ] Test language switcher
- [ ] Verify all external links (Fiverr, Upwork)
- [ ] Check SEO meta tags
- [ ] Test portfolio screenshots loading
- [ ] Verify analytics (if added)

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables Not Working
- Make sure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names match exactly

### Routing Issues
- Vercel automatically handles SPA routing via `vercel.json`
- If issues persist, check `vercel.json` configuration

### Contact Form Not Working
- Verify EmailJS credentials are set correctly
- Check browser console for errors
- Ensure EmailJS service is active

## Vercel CLI Alternative

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Pull requests → Preview deployments

No additional configuration needed!

