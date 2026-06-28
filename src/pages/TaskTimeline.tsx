import { motion } from 'framer-motion'
import { CheckCircle2, Clock, AlertTriangle, Circle, Calendar } from 'lucide-react'
import Card from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'

const statusConfig = {
  completed: { icon: <CheckCircle2 size={18} className="text-success" />, color: 'border-success', dotColor: 'bg-success' },
  in_progress: { icon: <Clock size={18} className="text-warning" />, color: 'border-warning', dotColor: 'bg-warning' },
  pending: { icon: <Circle size={18} className="text-muted" />, color: 'border-border', dotColor: 'bg-muted' },
  overdue: { icon: <AlertTriangle size={18} className="text-accent" />, color: 'border-accent', dotColor: 'bg-accent' },
}

export default function TaskTimeline() {
  const { tasks } = useStore()

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.due_date) return 1
    if (!b.due_date) return -1
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  })

  const completedCount = tasks.filter((t) => t.status === 'completed').length
  const overallProgress = Math.round((completedCount / tasks.length) * 100)

  return (
    <PageWrapper>
      <Header title="Task Timeline" />

      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 py-4">
        {/* Progress Summary */}
        <Card className="!p-4 md:!p-5 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm md:text-base font-medium text-primary">Overall Progress</span>
            <span className="text-sm font-bold text-accent">{completedCount}/{tasks.length} tasks</span>
          </div>
          <div className="h-2 md:h-3 bg-primary-50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-success"
            />
          </div>
        </Card>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-4">
            {sortedTasks.map((task, i) => {
              const config = statusConfig[task.status]
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-12 md:pl-14"
                >
                  <div className={`absolute left-2.5 md:left-3.5 top-4 w-3.5 h-3.5 rounded-full border-2 border-white ${config.dotColor} shadow-sm z-10`} />

                  <Card className={`!p-3.5 md:!p-4 !border-l-2 ${config.color}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {config.icon}
                        <h3 className="text-sm md:text-base font-semibold text-primary">{task.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {task.due_date && (
                          <span className="flex items-center gap-1 text-muted">
                            <Calendar size={11} />
                            {new Date(task.due_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                          </span>
                        )}
                        {task.assigned_to_name && (
                          <span className="text-muted">
                            👤 {task.assigned_to_name.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <span className={`font-medium ${
                        task.completion_percentage === 100 ? 'text-success' :
                        task.completion_percentage > 0 ? 'text-warning' : 'text-muted'
                      }`}>
                        {task.completion_percentage}%
                      </span>
                    </div>

                    {task.completion_percentage > 0 && task.completion_percentage < 100 && (
                      <div className="h-1 bg-primary-50 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full rounded-full bg-warning"
                          style={{ width: `${task.completion_percentage}%` }}
                        />
                      </div>
                    )}
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
