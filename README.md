# 🚀 Shorten.io  
### The Ultimate URL & QR Management Suite

> A high-performance, full-stack platform for secure link shortening, QR generation, and advanced analytics.

---

## 🌍 Overview

**Shorten.io** is more than just a URL shortener.  
It is a scalable link & QR management platform designed for modern creators, businesses, and developers.

With powerful analytics, secure authentication, and dynamic QR customization, Shorten.io helps you track, protect, and optimize your digital presence.

---

# ✨ Features

## 🔗 Advanced Link Management
- Custom branded slugs
- Password-protected links
- Link expiration scheduling
- Active / Hidden toggle
- Real-time click tracking
- Referrer tracking
- Device & country breakdown
- Per-link analytics dashboard

## 🔳 Dynamic QR Code Engine
- Instant QR generation for any short link
- Full color & style customization
- High-resolution downloads
- Per-link QR Studio

## 📊 Analytics Dashboard
- Click activity graph (7-day trends)
- Device type insights
- Top geographic regions
- Referrer analysis
- Real-time traffic (Pro plan)

## 🔐 Authentication & Security
- Google OAuth login
- Email / Password authentication
- Secure session management
- Protected route handling
- Password-protected URLs

## 💳 Monetization
- Stripe subscription integration
- Tier-based feature unlocks
- Pro analytics access
- Premium geographic insights

---

# 📖 Usage Guide

## 1️⃣ Creating a Short Link

1. Navigate to the **Home** or **Links** page
2. Paste your long URL
3. (Optional) Add a custom slug (e.g., `/portfolio`)
4. Click **Generate**

Your shortened link is instantly ready.

---

## 2️⃣ Generating a QR Code

1. Switch to QR mode
2. Customize:
   - Color
   - Pattern
   - Styling
3. Download high-resolution QR

---

## 3️⃣ Managing Your Assets

From your Dashboard:

- Edit links
- Toggle Active / Hidden
- Delete assets
- Search by slug or destination URL
- Open detailed analytics view

---

## 4️⃣ Viewing Analytics

Visit:

- Global Analytics page
- Individual link dashboard

Track:
- Click growth trends
- Device types
- Countries
- Referrer sources

---

# 🛠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Framework   | Next.js 14/15 (App Router) |
| Database    | TiDB Cloud (MySQL Compatible) |
| ORM         | Drizzle ORM |
| Styling     | Tailwind CSS + Shadcn UI |
| Animation   | Framer Motion |
| Payments    | Stripe |
| Auth        | Google OAuth + Custom Sessions |

---

# 🏗 System Architecture

Client (Next.js App Router)  
⬇  
API Routes / Server Actions  
⬇  
Drizzle ORM  
⬇  
MySQL (TiDB Cloud)  
⬇  
Analytics Aggregation & Click Logs  

---

# 🚀 Getting Started

## 1️⃣ Prerequisites

- Node.js 18+
- MySQL or TiDB Cloud database
- Google OAuth credentials
- Stripe account (for subscriptions)

---

## 2️⃣ Installation

```bash
git clone https://github.com/Dharmesh-yadavo/shorten.io.git
cd shorten.io
npm install
```

---

## 3️⃣ Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL="mysql://user:pass@host:4000/db?ssl={\"rejectUnauthorized\":true}"

# Authentication
AUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Application URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-publishable-key"
```

---

## 4️⃣ Database Setup

Push schema using Drizzle:

```bash
npx drizzle-kit push
```

---

## 5️⃣ Run Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 💎 Pro Features

- Real-time traffic monitoring
- Advanced geographic insights
- Enhanced analytics retention
- Premium QR customization
- Priority support

---

# 🔮 Future Roadmap

- AI-powered slug suggestions
- Predictive traffic analytics
- Smart QR design assistant
- Team collaboration support
- Public API access
- Custom domain support
- Bulk link creation
- Campaign tracking system

---

# 📄 License

This project is licensed under the MIT License.

---

