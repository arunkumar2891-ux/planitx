import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Heart, Users, Bell, Moon, Globe, LogOut, ChevronRight, Crown } from 'lucide-react'
import Card from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

const ROLE_LABELS: Record<string, string> = {
  father_of_bride: 'Father of Bride',
  mother_of_bride: 'Mother of Bride',
  father_of_groom: 'Father of Groom',
  mother_of_groom: 'Mother of Groom',
  sibling_bride: 'Sister of Bride',
  sibling_groom: 'Brother of Groom',
}

export default function Profile() {
  const navigate = useNavigate()
  const { wedding, familyMembers, setAuthenticated } = useStore()

  if (!wedding) return null

  const handleLogout = () => {
    setAuthenticated(false)
    navigate('/login', { replace: true })
  }

  return (
    <PageWrapper>
      <Header title="Profile" showBack={false} />

      <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-10 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Couple Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="!p-5 md:!p-6 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full premium-gradient flex items-center justify-center mb-3">
                  <Heart size={32} className="text-white" fill="white" />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-primary">
                  {wedding.bride_name.split(' ')[0]} & {wedding.groom_name.split(' ')[0]}
                </h2>
                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(wedding.wedding_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {wedding.wedding_city}
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Subscription Status */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="!p-4 md:!p-5 accent-gradient !border-0 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown size={22} className="text-yellow-300" />
                    <div>
                      <p className="text-sm font-semibold">Premium Plan</p>
                      <p className="text-xs text-white/70">All features unlocked</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Wedding Details */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-2">Wedding Details</h3>
              <Card className="!p-0 divide-y divide-border">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted">Bride</span>
                  <span className="text-sm font-medium text-primary">{wedding.bride_name}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted">Groom</span>
                  <span className="text-sm font-medium text-primary">{wedding.groom_name}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted">Type</span>
                  <span className="text-sm font-medium text-primary capitalize">{wedding.wedding_type}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted">Expected Guests</span>
                  <span className="text-sm font-medium text-primary">{wedding.expected_guests}</span>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Family Members */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-2">
                <Users size={14} className="inline mr-1.5" />
                Family Members
              </h3>
              <Card className="!p-0 divide-y divide-border">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-xs font-semibold text-primary">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">{member.name}</p>
                      <p className="text-xs text-muted">{ROLE_LABELS[member.role] || member.role}</p>
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>

            {/* Settings */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-2">App Settings</h3>
              <Card className="!p-0 divide-y divide-border">
                {[
                  { icon: <Bell size={18} />, label: 'Notifications', value: 'Enabled' },
                  { icon: <Moon size={18} />, label: 'Dark Mode', value: 'Off' },
                  { icon: <Globe size={18} />, label: 'Language', value: 'English' },
                ].map((item) => (
                  <button key={item.label} className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-primary-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-muted">{item.icon}</span>
                      <span className="text-sm text-primary">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted">{item.value}</span>
                      <ChevronRight size={14} className="text-muted" />
                    </div>
                  </button>
                ))}
              </Card>
            </motion.div>

            {/* Logout */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3.5 border border-accent/20 rounded-xl text-accent font-medium text-sm hover:bg-accent-50/50 transition-colors"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </motion.div>

            <p className="text-center text-xs text-muted pb-4">
              PlanITX v1.0.0 &middot; Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
