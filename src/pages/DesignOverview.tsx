import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Layers, Smartphone, Shield, Database, Palette, ArrowRight,
  CheckCircle2, Users, Wallet, Store, CreditCard, ListTodo,
  CalendarClock, Users2, User, Heart, Zap, Globe, Lock
} from 'lucide-react'
import Card from '@/components/ui/Card'

const FEATURES = [
  { icon: <Wallet size={20} />, title: 'Budget Tracker', desc: 'Track expenses across 7+ categories with visual charts and progress indicators' },
  { icon: <Users size={20} />, title: 'Guest Management', desc: 'Manage 500+ guests with RSVP tracking, family categorization, and search' },
  { icon: <Store size={20} />, title: 'Vendor Marketplace', desc: 'Browse premium vendors with ratings, pricing, featured badges and direct contact' },
  { icon: <CreditCard size={20} />, title: 'Payment Tracker', desc: 'Color-coded payment status for all vendor bookings with due date alerts' },
  { icon: <ListTodo size={20} />, title: 'Task Timeline', desc: 'Chronological task management with priority levels and completion tracking' },
  { icon: <Users2 size={20} />, title: 'Family Responsibility', desc: 'Assign and track tasks per family member with role-based organization' },
  { icon: <CalendarClock size={20} />, title: 'Wedding Day Schedule', desc: 'Minute-by-minute D-day timeline with reminders and location details' },
  { icon: <User size={20} />, title: 'Profile & Settings', desc: 'Manage couple details, subscription status, family members, and preferences' },
]

const STEPS = [
  { num: '01', title: 'Create Account', desc: 'Sign up with email, phone OTP, or Google OAuth. Quick and secure.' },
  { num: '02', title: 'Enter Wedding Details', desc: 'Provide couple names, wedding date, city, type, budget, and guest count.' },
  { num: '03', title: 'Add Family Members', desc: 'Add parents, siblings, and other key planners with their roles.' },
  { num: '04', title: 'Start Planning', desc: 'Access all features: budget tracking, vendor booking, guest lists, and more.' },
]

const TECH_STACK = [
  { name: 'React 18', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Vite', category: 'Build Tool' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animations' },
  { name: 'Recharts', category: 'Charts' },
  { name: 'Zustand', category: 'State' },
  { name: 'React Router v6', category: 'Routing' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Lucide Icons', category: 'Icons' },
  { name: 'Google Fonts', category: 'Typography' },
]

export default function DesignOverview() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="premium-gradient text-white py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="50" y="50" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 70 70)"/>
                <rect x="110" y="50" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 130 70)"/>
                <rect x="50" y="110" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 70 130)"/>
                <rect x="110" y="110" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 130 130)"/>
                <path d="M100 85 C100 75, 110 70, 110 80 C110 90, 100 95, 100 95 C100 95, 90 90, 90 80 C90 70, 100 75, 100 85Z" fill="#C41E3A"/>
              </svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">
              Plan<span className="text-accent-300">ITX</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-2">Your Wedding. Planned Perfectly.</p>
            <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">
              A premium, all-in-one wedding planning platform designed for Indian couples, parents, and families.
              Modern fintech-inspired dashboard meets luxury wedding elegance.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-600 transition-colors"
              >
                Try the App
              </button>
              <a href="#architecture" className="px-6 py-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                View Architecture
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">How It Works</h2>
            <p className="text-muted mt-2">Get started in 4 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="!p-5 h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-full accent-gradient flex items-center justify-center text-white font-bold text-lg mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-1">{step.title}</h3>
                  <p className="text-xs text-muted">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">All Features</h2>
            <p className="text-muted mt-2">Everything you need to plan the perfect Indian wedding</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover className="!p-4 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center text-accent mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section id="architecture" className="py-16 md:py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">App Architecture</h2>
            <p className="text-muted mt-2">System design and data flow</p>
          </motion.div>

          {/* Visual Architecture Diagram */}
          <Card className="!p-6 md:!p-10 mb-8">
            <div className="space-y-8">
              {/* Layer 1: Client */}
              <div>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Smartphone size={14} /> Presentation Layer
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {['Splash', 'Login/Signup', 'Dashboard', 'Budget', 'Guests', 'Vendors', 'Payments', 'Tasks', 'Family', 'Schedule', 'Profile', 'Design'].map((screen) => (
                    <div key={screen} className="px-3 py-2 bg-accent-50 border border-accent/20 rounded-lg text-xs font-medium text-accent text-center">
                      {screen}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-border" />
                  <ArrowRight size={16} className="text-muted rotate-90" />
                  <div className="w-px h-6 bg-border" />
                </div>
              </div>

              {/* Layer 2: State & Logic */}
              <div>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Layers size={14} /> State & Business Logic
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="px-4 py-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <p className="text-xs font-semibold text-primary">Zustand Store</p>
                    <p className="text-[10px] text-muted mt-0.5">Global state, wedding data, auth status</p>
                  </div>
                  <div className="px-4 py-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <p className="text-xs font-semibold text-primary">React Router v6</p>
                    <p className="text-[10px] text-muted mt-0.5">Protected routes, navigation, deep linking</p>
                  </div>
                  <div className="px-4 py-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <p className="text-xs font-semibold text-primary">Custom Hooks</p>
                    <p className="text-[10px] text-muted mt-0.5">useAuth, data fetching, form handling</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-border" />
                  <ArrowRight size={16} className="text-muted rotate-90" />
                  <div className="w-px h-6 bg-border" />
                </div>
              </div>

              {/* Layer 3: Backend */}
              <div>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Database size={14} /> Backend & Data Layer (Supabase)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="px-4 py-3 bg-emerald-50 border border-success/20 rounded-lg">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                      <Lock size={12} /> Auth
                    </p>
                    <p className="text-[10px] text-muted mt-0.5">Email/Password, Phone OTP, Google OAuth</p>
                  </div>
                  <div className="px-4 py-3 bg-emerald-50 border border-success/20 rounded-lg">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                      <Database size={12} /> PostgreSQL
                    </p>
                    <p className="text-[10px] text-muted mt-0.5">12 tables, RLS policies, indexes, triggers</p>
                  </div>
                  <div className="px-4 py-3 bg-emerald-50 border border-success/20 rounded-lg">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                      <Shield size={12} /> Row Level Security
                    </p>
                    <p className="text-[10px] text-muted mt-0.5">User-scoped data access, vendor public read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* User Flow */}
          <Card className="!p-6 md:!p-10">
            <h3 className="text-base md:text-lg font-display font-semibold text-primary mb-6">User Journey Flow</h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {[
                'Open App', 'Splash (2.5s)', 'Login / Signup', '4-Step Registration',
                'Dashboard', 'Plan Wedding', 'Track Budget', 'Manage Guests',
                'Book Vendors', 'Track Payments', 'Assign Family Tasks', 'D-Day Schedule'
              ].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2 md:gap-3">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    i === 0 ? 'bg-primary text-white' :
                    i === arr.length - 1 ? 'bg-accent text-white' :
                    'bg-primary-50 text-primary border border-border'
                  }`}>
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight size={14} className="text-muted flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Database Schema Overview */}
      <section className="py-16 md:py-20 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">Database Schema</h2>
            <p className="text-muted mt-2">12 tables with Row Level Security</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'profiles', desc: 'User accounts', rows: 'UUID, email, phone' },
              { name: 'weddings', desc: 'Wedding details', rows: 'couple, date, budget, city' },
              { name: 'family_members', desc: 'Family roles', rows: 'name, role, phone' },
              { name: 'budget_categories', desc: 'Budget allocation', rows: 'category, allocated, spent' },
              { name: 'expenses', desc: 'Line items', rows: 'description, amount, date' },
              { name: 'guests', desc: 'Guest list', rows: 'name, side, RSVP, +1s' },
              { name: 'vendors', desc: 'Marketplace', rows: 'name, category, rating' },
              { name: 'vendor_bookings', desc: 'Booked vendors', rows: 'amount, paid, status' },
              { name: 'payments', desc: 'Payment records', rows: 'amount, date, method' },
              { name: 'tasks', desc: 'Planning tasks', rows: 'title, assigned, status' },
              { name: 'wedding_day_events', desc: 'D-day schedule', rows: 'time, event, location' },
              { name: 'checklist_items', desc: 'Quick checklist', rows: 'title, completed' },
            ].map((table) => (
              <Card key={table.name} className="!p-3 md:!p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Database size={12} className="text-accent" />
                  <span className="text-xs font-semibold text-primary font-mono">{table.name}</span>
                </div>
                <p className="text-[10px] text-muted">{table.desc}</p>
                <p className="text-[9px] text-muted/60 mt-0.5">{table.rows}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">Tech Stack</h2>
            <p className="text-muted mt-2">Modern, production-ready technologies</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {TECH_STACK.map((tech) => (
              <Card key={tech.name} className="!p-4 text-center">
                <p className="text-sm font-semibold text-primary">{tech.name}</p>
                <p className="text-[10px] text-muted mt-0.5">{tech.category}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-16 md:py-20 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">Design Principles</h2>
            <p className="text-muted mt-2">Premium startup quality, ready for App Store</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Palette size={24} />, title: 'Luxury Meets Modern', desc: 'Charcoal + Crimson Red + Warm White color palette. Playfair Display headings with Inter body text. Inspired by premium fintech dashboards.' },
              { icon: <Smartphone size={24} />, title: 'Responsive Design', desc: 'Full-width on desktop with sidebar navigation. Tablet-optimized grids. Mobile-first with bottom navigation. Works on all screen sizes.' },
              { icon: <Zap size={24} />, title: 'Smooth Animations', desc: 'Framer Motion page transitions, staggered card reveals, animated progress rings, and micro-interactions for a premium feel.' },
              { icon: <Shield size={24} />, title: 'Secure by Default', desc: 'Row Level Security on all tables. User-scoped data. Multi-factor auth support. No secrets in client code.' },
              { icon: <Globe size={24} />, title: 'Indian Wedding Focus', desc: 'Designed specifically for Hindu, Muslim, Sikh, Christian, and multi-faith Indian weddings with culturally relevant categories.' },
              { icon: <Heart size={24} />, title: 'Family-First Planning', desc: 'Built for the entire family: assign responsibilities to parents, siblings, and planners. Everyone stays in sync.' },
            ].map((principle) => (
              <Card key={principle.title} className="!p-5">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary mb-3">
                  {principle.icon}
                </div>
                <h3 className="text-base font-semibold text-primary mb-2">{principle.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{principle.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-5 md:px-8 premium-gradient text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Ready to Explore?</h2>
          <p className="text-white/70 mb-8">Sign in to see all screens with sample Indian wedding data</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-600 transition-colors shadow-premium text-lg"
          >
            Launch PlanITX
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-8 bg-background border-t border-border text-center">
        <p className="text-xs text-muted">
          PlanITX v1.0.0 &middot; Built with React + TypeScript + Tailwind CSS + Supabase &middot; Made with ❤️ in India
        </p>
      </footer>
    </div>
  )
}
