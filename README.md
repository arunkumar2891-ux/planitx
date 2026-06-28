# PlanITX - Premium Indian Wedding Planning App

A modern, premium wedding planning web application built for Indian couples and their families. Features an elegant fintech-inspired dashboard UI with luxury wedding aesthetics.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Zustand** for state management
- **React Router v6** for navigation
- **Supabase** for authentication & database

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173`

### Build

```bash
npm run build
```

## Supabase Setup

1. Create a new project on [supabase.com](https://supabase.com)
2. Run the SQL from `supabase-schema.sql` in the SQL Editor
3. Create a `.env` file with your credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Enable Google OAuth and Phone OTP in Authentication settings

## Features

- Splash screen with elegant branding
- Multi-method authentication (Email, Phone OTP, Google)
- Multi-step registration flow
- Wedding countdown dashboard
- Budget tracking with donut charts
- Guest management with RSVP tracking
- Vendor marketplace with ratings
- Payment tracker with status indicators
- Task timeline with assignments
- Family responsibility management
- Wedding day schedule timeline
- Profile with subscription management

## Design System

- **Colors**: Charcoal Black (#1A1A1A), Deep Crimson (#C41E3A), Warm White (#FAFAF8)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Mobile-first** responsive design (max-width: 448px)

## Project Structure

```
src/
├── components/
│   ├── ui/        (Button, Card, Input, Badge, ProgressRing)
│   └── layout/    (BottomNav, Header, PageWrapper)
├── pages/
│   ├── auth/      (Login, Signup)
│   ├── Dashboard, BudgetTracker, GuestManagement
│   ├── VendorMarketplace, PaymentTracker
│   ├── TaskTimeline, FamilyResponsibility
│   ├── WeddingDaySchedule, Profile
│   └── SplashScreen
├── hooks/         (useAuth)
├── lib/           (supabase, store)
└── types/         (TypeScript interfaces)
```
