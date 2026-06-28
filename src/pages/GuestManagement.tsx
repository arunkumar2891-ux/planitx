import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Users, UserCheck, Clock, UserX } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'groom', label: 'Groom Side' },
  { id: 'bride', label: 'Bride Side' },
  { id: 'friends', label: 'Friends' },
  { id: 'vip', label: 'VIP' },
]

export default function GuestManagement() {
  const { guests } = useStore()
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const totalGuests = guests.length
  const confirmed = guests.filter((g) => g.rsvp_status === 'confirmed').length
  const pending = guests.filter((g) => g.rsvp_status === 'pending').length
  const declined = guests.filter((g) => g.rsvp_status === 'declined').length

  const filtered = guests.filter((g) => {
    const matchesTab = activeTab === 'all' || g.side === activeTab
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const statusConfig = {
    confirmed: { badge: 'success' as const, icon: <UserCheck size={12} />, label: 'Confirmed' },
    pending: { badge: 'warning' as const, icon: <Clock size={12} />, label: 'Pending' },
    declined: { badge: 'accent' as const, icon: <UserX size={12} />, label: 'Declined' },
  }

  return (
    <PageWrapper>
      <Header title="Guest Management" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <Card className="!p-2.5 md:!p-4 text-center">
            <Users size={16} className="text-primary mx-auto mb-1" />
            <p className="text-lg md:text-2xl font-bold text-primary">{totalGuests}</p>
            <p className="text-[9px] md:text-xs text-muted">Total</p>
          </Card>
          <Card className="!p-2.5 md:!p-4 text-center !border-success/20">
            <UserCheck size={16} className="text-success mx-auto mb-1" />
            <p className="text-lg md:text-2xl font-bold text-success">{confirmed}</p>
            <p className="text-[9px] md:text-xs text-muted">Confirmed</p>
          </Card>
          <Card className="!p-2.5 md:!p-4 text-center !border-warning/20">
            <Clock size={16} className="text-warning mx-auto mb-1" />
            <p className="text-lg md:text-2xl font-bold text-warning">{pending}</p>
            <p className="text-[9px] md:text-xs text-muted">Pending</p>
          </Card>
          <Card className="!p-2.5 md:!p-4 text-center !border-accent/20">
            <UserX size={16} className="text-accent mx-auto mb-1" />
            <p className="text-lg md:text-2xl font-bold text-accent">{declined}</p>
            <p className="text-[9px] md:text-xs text-muted">Declined</p>
          </Card>
        </div>

        {/* Search + Tabs */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-primary placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3.5 py-2 text-xs font-medium rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-muted hover:border-primary-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
          {filtered.map((guest, i) => {
            const config = statusConfig[guest.rsvp_status]
            return (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="!p-3 md:!p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-sm font-semibold text-primary">
                        {guest.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">{guest.name}</p>
                        <p className="text-xs text-muted capitalize">{guest.side} side</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {guest.plus_ones > 0 && (
                        <span className="text-[10px] text-muted bg-primary-50 px-1.5 py-0.5 rounded">
                          +{guest.plus_ones}
                        </span>
                      )}
                      <Badge variant={config.badge}>
                        {config.icon}
                        <span className="ml-1">{config.label}</span>
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 lg:bottom-8 right-6 lg:right-10 w-14 h-14 accent-gradient rounded-full shadow-premium flex items-center justify-center text-white z-40"
      >
        <Plus size={24} />
      </motion.button>
    </PageWrapper>
  )
}
