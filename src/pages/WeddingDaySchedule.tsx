import { motion } from 'framer-motion'
import { Clock, MapPin, Bell, Camera, Music, UtensilsCrossed, Heart, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

const EVENT_ICONS: Record<string, React.ReactNode> = {
  'Bridal Makeup & Styling': <Sparkles size={18} className="text-pink-500" />,
  'Photography Coverage Begins': <Camera size={18} className="text-blue-500" />,
  'Baraat Procession': <Music size={18} className="text-purple-500" />,
  'Muhurtham / Pheras': <Heart size={18} className="text-accent" />,
  'Vidaai Ceremony': <Heart size={18} className="text-accent" />,
  'Grand Lunch Reception': <UtensilsCrossed size={18} className="text-amber-500" />,
  'Couple Photo Session': <Camera size={18} className="text-blue-500" />,
  'Evening Reception & DJ': <Music size={18} className="text-purple-500" />,
}

function formatTime(time: string): string {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${m} ${ampm}`
}

export default function WeddingDaySchedule() {
  const { weddingDayEvents } = useStore()

  const sortedEvents = [...weddingDayEvents].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <PageWrapper>
      <Header title="Wedding Day Schedule" />

      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 py-4">
        {/* Date Banner */}
        <Card className="!p-4 md:!p-6 premium-gradient !border-0 text-white mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white/70 text-xs md:text-sm">Wedding Day</p>
              <p className="text-lg md:text-xl font-display font-bold">15 February 2025</p>
              <p className="text-white/60 text-xs">Saturday, Jaipur</p>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-3">
            {sortedEvents.map((event, i) => {
              const icon = EVENT_ICONS[event.event_name] || <Clock size={18} className="text-muted" />
              const isHighlighted = event.event_name.includes('Muhurtham') || event.event_name.includes('Pheras')

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative pl-14 md:pl-16"
                >
                  {/* Time Label */}
                  <div className="absolute left-0 top-3 w-12 md:w-14 text-right">
                    <span className="text-[10px] md:text-xs font-semibold text-primary leading-none">
                      {formatTime(event.start_time)}
                    </span>
                  </div>

                  {/* Timeline Dot */}
                  <div className={`absolute left-[17px] md:left-[21px] top-3.5 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${
                    isHighlighted ? 'bg-accent' : 'bg-primary-300'
                  }`} />

                  <Card className={`!p-3.5 md:!p-4 ${isHighlighted ? '!border-accent/30 !bg-accent-50/20' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-primary">{event.event_name}</h3>
                        {event.location && (
                          <p className="flex items-center gap-1 text-xs text-muted mt-0.5">
                            <MapPin size={10} /> {event.location}
                          </p>
                        )}
                        {event.notes && (
                          <p className="text-xs text-muted/80 mt-1 line-clamp-2">{event.notes}</p>
                        )}
                        <div className="flex items-center gap-1 mt-1.5">
                          <Bell size={10} className="text-accent" />
                          <span className="text-[10px] text-accent">
                            Reminder {event.reminder_before_minutes} min before
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
