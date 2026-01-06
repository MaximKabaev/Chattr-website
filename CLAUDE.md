# Chattr Website

## Overview
This is the official website for **Chattr** (codename: Arc Chat) - a secure, privacy-focused iOS messaging application designed to resist censorship and provide reliable communication in restrictive environments.

The website serves as a public-facing landing page with essential legal and support information required for App Store publication.

## Related Project
- **Main App Repository**: `../arc-chat` - Contains the iOS client and backend infrastructure
- **User-facing name**: Chattr
- **Internal codename**: Arc Chat

## Website Purpose
- App Store requirement: Privacy Policy page
- User support contact information
- Simple branding/landing page

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: CSS Modules
- **Language**: TypeScript
- **Package Manager**: pnpm

## Project Structure
```
frontend/
├── public/
│   ├── app-icon.png          # App icon (from iOS assets)
│   └── apple-touch-icon.png  # Touch icon for web
└── src/app/
    ├── layout.tsx            # Root layout (Russian locale)
    ├── page.tsx              # Home page
    ├── page.module.css
    ├── globals.css
    └── privacy/
        ├── page.tsx          # Privacy policy (Russian)
        └── privacy.module.css
```

## Pages
- `/` - Landing page with app branding, privacy policy link, and support email
- `/privacy` - Privacy policy page (in Russian)

## Localization
The entire website is in **Russian** (`lang="ru"`).

## Support Contact
- Email: mkabaevuk@gmail.com

## Development
```bash
cd frontend
pnpm install
pnpm dev
```

## Notes
- App icon is copied from the main arc-chat iOS project
- Privacy policy emphasizes zero data collection (matches app's privacy-first architecture)
- Keep content minimal - this is just a support/legal page for App Store compliance
