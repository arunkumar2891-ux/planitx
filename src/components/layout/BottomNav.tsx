import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Wallet, Users, Store, User, CreditCard, ListTodo, Users2, CalendarClock } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/budget', icon: Wallet, label: 'Budget' },
  { path: '/guests', icon: Users, label: 'Guests' },
  { path: '/vendors', icon: Store, label: 'Vendors' },
  { path: '/payments', icon: CreditCard, label: 'Payments' },
  { path: '/tasks', icon: ListTodo, label: 'Tasks' },
  { path: '/family', icon: Users2, label: 'Family' },
  { path: '/schedule', icon: CalendarClock, label: 'Schedule' },
  { path: '/profile', icon: User, label: 'Profile' },
]

const mobileNavItems = navItems.filter((item) =>
  ['/dashboard', '/budget', '/guests', '/vendors', '/profile'].includes(item.path)
)

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-56 bg-white border-r border-border flex-col z-50">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="50" y="50" width="40" height="40" stroke="#1A1A1A" strokeWidth="4" fill="none" transform="rotate(45 70 70)"/>
                <rect x="110" y="50" width="40" height="40" stroke="#1A1A1A" strokeWidth="4" fill="none" transform="rotate(45 130 70)"/>
                <rect x="50" y="110" width="40" height="40" stroke="#1A1A1A" strokeWidth="4" fill="none" transform="rotate(45 70 130)"/>
                <rect x="110" y="110" width="40" height="40" stroke="#1A1A1A" strokeWidth="4" fill="none" transform="rotate(45 130 130)"/>
                <path d="M100 85 C100 75, 110 70, 110 80 C110 90, 100 95, 100 95 C100 95, 90 90, 90 80 C90 70, 100 75, 100 85Z" fill="#C41E3A"/>
              </svg>
            </div>
            <span className="text-lg font-display font-bold text-primary">Plan<span className="text-accent">ITX</span></span>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent-50 text-accent border border-accent/20'
                    : 'text-muted hover:bg-primary-50 hover:text-primary'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-[10px] text-muted text-center">PlanITX v1.0</p>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 pb-safe z-50">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full"
                  />
                )}
                <Icon
                  size={22}
                  className={isActive ? 'text-accent' : 'text-muted'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className={`text-[10px] font-medium ${isActive ? 'text-accent' : 'text-muted'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
