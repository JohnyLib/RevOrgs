# RevOrgs - Digital Web Studio

<div align="center">
  <h3>Premier Web Studio Crafting Immersive Digital Experiences</h3>
  <p>We work worldwide, creating robust platforms and brand-defining interfaces for forward-thinking organizations.</p>
</div>

## 🌍 About

RevOrgs is a premier web development studio specializing in creating immersive digital experiences, robust platforms, and brand-defining interfaces. We work with clients worldwide, delivering high-quality solutions using modern technologies.

## ✨ Features

- **Modern Tech Stack**: React, Next.js, TypeScript, Node.js, and more
- **Multi-language Support**: English, Romanian, Russian
- **Real-time Portfolio**: Live screenshots from project websites
- **Responsive Design**: Fully responsive across all devices
- **SEO Optimized**: Complete meta tags and Open Graph support
- **Contact Form**: Integrated email submission via EmailJS
- **Social Proof**: Testimonials, statistics, and client logos
- **FAQ Section**: Comprehensive answers to common questions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JohnyLib/RevOrgs.git
cd REVORGS
```

2. Install dependencies:
```bash
npm install
```

3. Set up EmailJS (optional, for contact form):
   - Follow instructions in [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
   - Or update EmailJS credentials in `components/Contact.tsx`

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)** and sign in with your GitHub account

3. **Click "New Project"** and import your GitHub repository

4. **Configure the project**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

5. **Add Environment Variables** (if using EmailJS):
   - `VITE_EMAILJS_SERVICE_ID` - Your EmailJS Service ID
   - `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS Template ID
   - `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS Public Key

6. **Click "Deploy"** and wait for the build to complete

7. **Your site will be live** at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Custom Domain

After deployment, you can add a custom domain in Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `revorgs.com`)
4. Follow DNS configuration instructions

### Environment Variables in Vercel

To add environment variables in Vercel:
1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add your variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Redeploy your project for changes to take effect

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Routing**: Wouter
- **Icons**: Lucide React
- **Email**: EmailJS
- **Build Tool**: Vite

## 📧 Contact

- **Business Email**: hello@revorgs.com
- **Personal Email**: perevalov.johny@gmail.com
- **Platforms**: 
  - [Fiverr](https://www.fiverr.com/s/DBZY1wX)
  - [Upwork](https://www.upwork.com/freelancers/~01170de52b582130bb)

## 🌐 We Work Worldwide

RevOrgs provides services to clients globally. We're experienced in working with international teams and can accommodate different time zones.

## 📄 License

ISC

## 👨‍💻 Author

RevOrgs Studio

## 🔗 Links

- **Fiverr**: [https://www.fiverr.com/s/DBZY1wX](https://www.fiverr.com/s/DBZY1wX)
- **Upwork**: [https://www.upwork.com/freelancers/~01170de52b582130bb](https://www.upwork.com/freelancers/~01170de52b582130bb)

## 📚 Additional Documentation

- [EmailJS Setup Guide](./EMAILJS_SETUP.md) - Configure email form submission
- [Deployment Guide](./DEPLOY.md) - Detailed Vercel deployment instructions

---

**Note**: Project is ready for deployment on Vercel. See [DEPLOY.md](./DEPLOY.md) for detailed instructions.
