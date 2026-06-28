import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Wallet, Users, CheckCircle2, Store, Building2, Camera, UtensilsCrossed, Mail, Sparkles, Palette, Check, X, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'
import ProgressRing from '@/components/ui/ProgressRing'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

function getDaysRemaining(dateStr: string): number {
  const wedding = new Date(dateStr)
  const today = new Date()
  const diff = wedding.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatBudget(amount: number): string {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)} Cr`
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
  return `${(amount / 1000).toFixed(0)}K`
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { wedding, budgetCategories, guests, tasks, vendorBookings, checklist } = useStore()

  if (!wedding) return null

  const daysRemaining = getDaysRemaining(wedding.wedding_date)
  const totalSpent = budgetCategories.reduce((sum, c) => sum + c.spent_amount, 0)
  const confirmedGuests = guests.filter((g) => g.rsvp_status === 'confirmed').length
  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const confirmedVendors = vendorBookings.filter((v) => v.status === 'confirmed').length
  const planningProgress = Math.round((completedTasks / tasks.length) * 100)

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        {/* Greeting Section */}
        <div className="pt-6 pb-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-muted">Welcome back</p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-primary mt-0.5">
              Dear {wedding.bride_name.split(' ')[0]} & {wedding.groom_name.split(' ')[0]} 💍
            </h1>
            <p className="text-accent font-semibold text-sm mt-1">
              <Clock size={14} className="inline mr-1" />
              {daysRemaining} days more for your Wedding!
            </p>
            <p className="text-xs text-muted mt-0.5">
              Wedding Date: {formatDate(wedding.wedding_date)}
            </p>
          </motion.div>
        </div>

        {/* Top Section: Countdown + Stats side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="premium-gradient !border-0 text-white p-6 md:p-8 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm md:text-base">Days Remaining</p>
                  <p className="text-5xl md:text-6xl font-display font-bold mt-1">{daysRemaining}</p>
                  <p className="text-white/60 text-xs md:text-sm mt-2">{formatDate(wedding.wedding_date)}</p>
                </div>
                <ProgressRing
                  percentage={planningProgress}
                  size={120}
                  strokeWidth={7}
                  color="#C41E3A"
                  label="Complete"
                  textClassName="text-white"
                />
              </div>
            </Card>
          </motion.div>

          {/* Quick Stats - stacks on mobile, vertical column on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card hover onClick={() => navigate('/budget')} className="!p-3 md:!p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                    <Wallet size={16} className="text-accent" />
                  </div>
                  <span className="text-xs text-muted">Budget Used</span>
                </div>
                <p className="text-lg font-bold text-primary">
                  ₹{formatBudget(totalSpent)}
                  <span className="text-xs font-normal text-muted"> / ₹{formatBudget(wedding.total_budget)}</span>
                </p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card hover onClick={() => navigate('/guests')} className="!p-3 md:!p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Users size={16} className="text-success" />
                  </div>
                  <span className="text-xs text-muted">Guests Confirmed</span>
                </div>
                <p className="text-lg font-bold text-primary">{confirmedGuests}</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card hover onClick={() => navigate('/tasks')} className="!p-3 md:!p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-warning" />
                  </div>
                  <span className="text-xs text-muted">Tasks</span>
                </div>
                <p className="text-lg font-bold text-primary">
                  {completedTasks}<span className="text-xs font-normal text-muted"> / {tasks.length}</span>
                </p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Card hover onClick={() => navigate('/vendors')} className="!p-3 md:!p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Store size={16} className="text-purple-600" />
                  </div>
                  <span className="text-xs text-muted">Vendors</span>
                </div>
                <p className="text-lg font-bold text-primary">
                  {confirmedVendors}<span className="text-xs font-normal text-muted"> / {vendorBookings.length}</span>
                </p>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Planning Checklist */}
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-display font-semibold text-primary mb-3">Planning Checklist</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {checklist.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <Card className={`!p-3 ${item.is_completed ? '!border-success/30 !bg-emerald-50/30' : '!border-warning/30 !bg-amber-50/20'}`}>
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.is_completed ? 'bg-success text-white' : 'bg-warning/20 text-warning'
                    }`}>
                      {item.is_completed ? <Check size={14} /> : <X size={14} />}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary leading-tight">{item.title}</p>
                      <p className={`text-[10px] mt-0.5 ${item.is_completed ? 'text-success' : 'text-warning'}`}>
                        {item.is_completed ? 'Done' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-display font-semibold text-primary mb-3">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Schedule', path: '/schedule', icon: '📅' },
              { label: 'Payments', path: '/payments', icon: '💰' },
              { label: 'Family Tasks', path: '/family', icon: '👨‍👩‍👧‍👦' },
              { label: 'App Design', path: '/design', icon: '🎨' },
            ].map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-primary hover:border-accent/30 hover:shadow-card transition-all"
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
