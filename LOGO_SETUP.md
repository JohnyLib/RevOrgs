# Logo and Title Setup Guide

## Adding Your Custom Logo

### Step 1: Prepare Your Logo
- Format: PNG (with transparency) or SVG (recommended)
- Size: At least 200x200px for high quality
- Background: Transparent (recommended)
- Name the file: `logo.png` or `logo.svg`

### Step 2: Add Logo to Project
1. Place your logo file in the `/public` folder
2. Name it exactly: `logo.png` (or `logo.svg`)

### Step 3: Enable Custom Logo
1. Open `components/RevOrgsLogo.tsx`
2. Find the line: `const hasCustomLogo = false;`
3. Change it to: `const hasCustomLogo = true;`
4. Save the file

### Step 4: Test
- Run `npm run dev`
- Check the navbar - your logo should appear
- If it doesn't appear, check:
  - File is in `/public` folder
  - File name is exactly `logo.png` or `logo.svg`
  - `hasCustomLogo` is set to `true`

## Changing the Title/Company Name

### Option 1: Change "RevOrgs" Text
1. Open `components/RevOrgsLogo.tsx`
2. Find: `<span>RevOrgs</span>`
3. Replace "RevOrgs" with your company name

### Option 2: Change Hero Title
1. Open `translations.ts`
2. Find the `hero` section for each language
3. Update `titlePre` and `titleHighlight` values

### Option 3: Change Page Title
1. Open `index.html`
2. Find: `<title>RevOrgs | Digital Evolution - Premier Web Studio</title>`
3. Replace with your title

### Option 4: Change Meta Tags
1. Open `index.html`
2. Update all meta tags with "RevOrgs" to your company name
3. Update Open Graph tags for social media sharing

## Quick Reference

**Files to update for branding:**
- `/components/RevOrgsLogo.tsx` - Logo and company name in navbar
- `/translations.ts` - Hero titles and all text content
- `/index.html` - Page title and meta tags
- `/public/logo.png` - Your logo file (add here)

## Current Default Logo

The site currently uses a default SVG logo. Once you add your custom logo and enable it, the SVG will be replaced automatically.

