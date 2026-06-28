import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import Card from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

const COLORS = ['#C41E3A', '#1A1A1A', '#059669', '#D97706', '#7C3AED', '#0891B2', '#DC2626']

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`
  return `₹${(amount / 1000).toFixed(0)}K`
}

export default function BudgetTracker() {
  const { wedding, budgetCategories } = useStore()
  if (!wedding) return null

  const totalBudget = wedding.total_budget
  const totalSpent = budgetCategories.reduce((sum, c) => sum + c.spent_amount, 0)
  const remaining = totalBudget - totalSpent
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100)

  const chartData = budgetCategories.map((c) => ({
    name: c.category,
    value: c.spent_amount,
  }))

  return (
    <PageWrapper>
      <Header title="Budget Tracker" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-4 space-y-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2.5 md:gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="!p-3 md:!p-5 text-center">
              <Wallet size={18} className="text-primary mx-auto mb-1" />
              <p className="text-[10px] md:text-xs text-muted">Total Budget</p>
              <p className="text-sm md:text-xl font-bold text-primary">{formatCurrency(totalBudget)}</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card className="!p-3 md:!p-5 text-center !border-accent/20 !bg-accent-50/30">
              <TrendingDown size={18} className="text-accent mx-auto mb-1" />
              <p className="text-[10px] md:text-xs text-muted">Spent</p>
              <p className="text-sm md:text-xl font-bold text-accent">{formatCurrency(totalSpent)}</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="!p-3 md:!p-5 text-center !border-success/20 !bg-emerald-50/30">
              <TrendingUp size={18} className="text-success mx-auto mb-1" />
              <p className="text-[10px] md:text-xs text-muted">Remaining</p>
              <p className="text-sm md:text-xl font-bold text-success">{formatCurrency(remaining)}</p>
            </Card>
          </motion.div>
        </div>

        {/* Chart + Categories side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Progress + Chart */}
          <div className="space-y-5">
            {/* Progress Bar */}
            <Card className="md:!p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">Overall Spending</span>
                <span className="text-sm font-bold text-accent">{spentPercentage}%</span>
              </div>
              <div className="h-2.5 md:h-3 bg-primary-50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${spentPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${spentPercentage > 80 ? 'bg-accent' : spentPercentage > 50 ? 'bg-warning' : 'bg-success'}`}
                />
              </div>
            </Card>

            {/* Donut Chart */}
            <Card className="md:!p-5">
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3">Expense Distribution</h3>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {chartData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-muted">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Category Breakdown */}
          <div>
            <h3 className="text-sm md:text-base font-semibold text-primary mb-3">Category Breakdown</h3>
            <div className="space-y-2.5">
              {budgetCategories.map((cat, i) => {
                const percentage = Math.round((cat.spent_amount / cat.allocated_amount) * 100)
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Card className="!p-3 md:!p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="text-sm font-medium text-primary">{cat.category}</span>
                        </div>
                        <span className="text-xs text-muted">
                          {formatCurrency(cat.spent_amount)} / {formatCurrency(cat.allocated_amount)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-primary-50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(percentage, 100)}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
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
