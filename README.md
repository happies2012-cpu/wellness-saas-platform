# HumanAI - Workforce Operating System

A complete, production-ready Tier-1 Global SaaS platform combining workforce management, AI operating system, marketplace, workflow automation, and comprehensive monetization.

## Features

### Core Systems
- **CMS**: Pages, blogs, media library, SEO optimization
- **CRM**: Leads, customers, pipelines, conversations with AI assistance
- **E-commerce**: Products, orders, subscriptions, wallets, payouts
- **Workflow Engine**: Drag-drop builder, AI generation, marketplace
- **AI Operating System**: Multi-agent teams, ChatGPT integration, usage credits
- **Workforce Management**: Task assignment (human/AI), SLA tracking, productivity analytics
- **Revenue Engine**: MRR, ARPU, LTV tracking with multiple revenue streams

### Design System
- **Neo-Glass Enterprise** + **AI-Native Futurism** aesthetic
- Glassmorphism effects throughout
- Neon glow animations
- Premium typography (Inter + Space Grotesk)
- Fully redesigned dark mode

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Stripe account
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd wellnessPlat
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`

4. Run database migrations
```bash
# Set up Supabase locally or use cloud
npx supabase db push
```

5. Start development server
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
wellnessPlat/
├── app/
│   ├── (marketing)/        # Public marketing pages
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Dashboard and app pages
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   └── marketing/          # Marketing page components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── stripe/             # Stripe integration
│   ├── ai/                 # OpenAI integration
│   └── auth/               # Authentication utilities
├── supabase/
│   └── migrations/         # Database migrations
└── types/                  # TypeScript type definitions
```

## User Roles

The platform supports 9 different user roles:
- Super Admin
- Admin
- Brand Owner
- Business Owner
- Employee
- Freelancer
- Vendor
- Client
- AI Agent

Each role has specific permissions and access levels.

## Revenue Streams

1. **Subscriptions** (MRR)
2. **Workflow Sales** (Marketplace)
3. **Marketplace Commissions**
4. **AI Usage Credits**
5. **Ads & Promotions**
6. **White-label Licensing**

## License

Proprietary - All rights reserved

## Support

For support, contact via the platform's contact form or WhatsApp/Telegram buttons in the footer.
