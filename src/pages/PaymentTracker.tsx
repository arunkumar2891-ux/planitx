import { motion } from 'framer-motion'
import { CreditCard, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  return `₹${(amount / 1000).toFixed(0)}K`
}

function getPaymentStatus(paid: number, total: number, dueDate?: string) {
  if (paid >= total) return { label: 'Paid', color: 'text-success', bg: 'bg-emerald-50', border: 'border-success/20', icon: <CheckCircle2 size={16} className="text-success" /> }
  if (dueDate && new Date(dueDate) < new Date()) return { label: 'Overdue', color: 'text-accent', bg: 'bg-accent-50', border: 'border-accent/20', icon: <AlertCircle size={16} className="text-accent" /> }
  if (paid > 0) return { label: 'Partial', color: 'text-warning', bg: 'bg-amber-50', border: 'border-warning/20', icon: <Clock size={16} className="text-warning" /> }
  return { label: 'Unpaid', color: 'text-muted', bg: 'bg-primary-50', border: 'border-border', icon: <CreditCard size={16} className="text-muted" /> }
}

export default function PaymentTracker() {
  const { vendorBookings } = useStore()

  const totalAmount = vendorBookings.reduce((sum, v) => sum + v.total_amount, 0)
  const totalPaid = vendorBookings.reduce((sum, v) => sum + v.paid_amount, 0)
  const totalBalance = totalAmount - totalPaid

  return (
    <PageWrapper>
      <Header title="Payment Tracker" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-4 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2.5 md:gap-4">
          <Card className="!p-3 md:!p-5 text-center">
            <p className="text-[10px] md:text-xs text-muted mb-0.5">Total</p>
            <p className="text-sm md:text-xl font-bold text-primary">{formatCurrency(totalAmount)}</p>
          </Card>
          <Card className="!p-3 md:!p-5 text-center !border-success/20 !bg-emerald-50/30">
            <p className="text-[10px] md:text-xs text-muted mb-0.5">Paid</p>
            <p className="text-sm md:text-xl font-bold text-success">{formatCurrency(totalPaid)}</p>
          </Card>
          <Card className="!p-3 md:!p-5 text-center !border-accent/20 !bg-accent-50/30">
            <p className="text-[10px] md:text-xs text-muted mb-0.5">Balance</p>
            <p className="text-sm md:text-xl font-bold text-accent">{formatCurrency(totalBalance)}</p>
          </Card>
        </div>

        {/* Vendor Payments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {vendorBookings.map((booking, i) => {
            const balance = booking.total_amount - booking.paid_amount
            const progress = Math.round((booking.paid_amount / booking.total_amount) * 100)
            const status = getPaymentStatus(booking.paid_amount, booking.total_amount, booking.due_date)

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="!p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-primary">{booking.vendor_name}</h3>
                      <p className="text-xs text-muted">{booking.category}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {status.icon}
                      <span className="ml-0.5">{status.label}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div>
                      <p className="text-[10px] text-muted">Total</p>
                      <p className="text-xs font-semibold text-primary">{formatCurrency(booking.total_amount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted">Paid</p>
                      <p className="text-xs font-semibold text-success">{formatCurrency(booking.paid_amount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted">Balance</p>
                      <p className="text-xs font-semibold text-accent">{formatCurrency(balance)}</p>
                    </div>
                  </div>

                  <div className="h-1.5 bg-primary-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full ${
                        progress >= 100 ? 'bg-success' : progress >= 50 ? 'bg-warning' : 'bg-accent'
                      }`}
                    />
                  </div>

                  {booking.due_date && (
                    <p className="text-[10px] text-muted mt-2">
                      Due: {new Date(booking.due_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}
