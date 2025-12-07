# Photographer Portfolio & E-commerce Website

A modern, minimalist photography portfolio and e-commerce website built with Next.js, TypeScript, and styled-components.

## Features

### Portfolio
- **Categories**: Wedding, Portrait, Family photography
- **Series**: Organized photo galleries with metadata (location, date)
- **Lightbox**: Full-screen image viewer with navigation
- **Photo Protection**: Right-click disabled and watermark overlay options
- **Video Previews**: Integrated video support for each series

### E-commerce Shop
- **Digital Products**: Lightroom presets with automatic delivery
- **Online Courses**: Video-based courses with module breakdown
- **Physical Products**: Photography learning kits with Instagram ordering
- **Stripe Integration**: Secure payment processing
- **Webhooks**: Automated fulfillment for digital products

### Pages
- **Home**: Hero section, portfolio previews, shop highlights, testimonials
- **Portfolio**: Category browsing and series viewing
- **Shop**: Product listing and detailed product pages
- **About**: Photographer bio, approach, equipment
- **Testimonials**: Client reviews with ratings and videos
- **Contact**: Contact form with event details

### Design
- Minimalist white background with clean typography
- Inter & Montserrat fonts for elegant readability
- Smooth Framer Motion animations
- Fully responsive (mobile, tablet, desktop)
- Fast loading with Next.js optimization

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: styled-components
- **Animations**: Framer Motion
- **Payments**: Stripe
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd photograph-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file based on `.env.local.example`:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (optional)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
CONTACT_EMAIL=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PIXEL_ID=
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
photograph-site/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── portfolio/        # Portfolio pages
│   │   ├── shop/            # Shop pages
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── testimonials/    # Testimonials page
│   │   ├── api/             # API routes
│   │   │   ├── checkout/    # Stripe checkout
│   │   │   ├── webhook/     # Stripe webhooks
│   │   │   ├── download/    # Digital product downloads
│   │   │   └── contact/     # Contact form handler
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── data/                # Sample content data
│   │   ├── portfolio.ts
│   │   ├── products.ts
│   │   └── testimonials.ts
│   ├── lib/                 # Utilities
│   │   ├── stripe.ts
│   │   └── registry.tsx     # styled-components registry
│   ├── types/               # TypeScript types
│   │   └── models.ts
│   └── styles/              # Global styles & theme
│       ├── theme.ts
│       └── global.ts
├── public/                  # Static assets
│   └── images/             # Portfolio & product images
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Configuration

### Adding Content

#### Portfolio
Edit `src/data/portfolio.ts` to add/modify:
- Categories (Wedding, Portrait, Family)
- Series (photo collections)
- Individual photos with metadata

#### Products
Edit `src/data/products.ts` to add/modify:
- Digital presets
- Online courses
- Physical products

#### Testimonials
Edit `src/data/testimonials.ts` to add client reviews.

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhook endpoint at `/api/webhook`
4. Add webhook secret to `.env.local`

### Email Setup (Optional)

To enable contact form emails:
1. Choose an email service (SendGrid, Resend, nodemailer)
2. Update `src/app/api/contact/route.ts` with email logic
3. Add SMTP credentials to `.env.local`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## Customization

### Theme
Edit `src/styles/theme.ts` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

### Animations
Modify Framer Motion animations in individual components.

### SEO
Update metadata in page files and add sitemap/robots.txt as needed.

## TODO / Future Enhancements

- [ ] Add CMS integration (Sanity, Contentful, or Strapi)
- [ ] Implement blog functionality
- [ ] Add user authentication for course access
- [ ] Set up email automation for contact form
- [ ] Add shopping cart for multiple products
- [ ] Implement download tracking and limits
- [ ] Add Google Analytics integration
- [ ] Create admin dashboard for content management
- [ ] Add photo upload and management
- [ ] Implement search functionality

## License

ISC

## Support

For questions or issues, please open an issue on GitHub.
# photograph-profile
