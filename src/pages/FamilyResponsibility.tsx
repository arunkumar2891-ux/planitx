import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Circle } from 'lucide-react'
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

const ROLE_EMOJIS: Record<string, string> = {
  father_of_bride: '👨',
  mother_of_bride: '👩',
  father_of_groom: '👨',
  mother_of_groom: '👩',
  sibling_bride: '👧',
  sibling_groom: '👦',
}

export default function FamilyResponsibility() {
  const { familyMembers, tasks } = useStore()

  const memberTasks = familyMembers.map((member) => {
    const assigned = tasks.filter((t) => t.assigned_to === member.id)
    const completed = assigned.filter((t) => t.status === 'completed').length
    const progress = assigned.length > 0 ? Math.round((completed / assigned.length) * 100) : 0
    return { member, tasks: assigned, completed, progress }
  })

  return (
    <PageWrapper>
      <Header title="Family Responsibilities" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {memberTasks.map(({ member, tasks: memberTaskList, completed, progress }, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="!p-4 md:!p-5 h-full">
                {/* Member Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-50 flex items-center justify-center text-lg md:text-xl">
                    {ROLE_EMOJIS[member.role] || '👤'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-semibold text-primary">{member.name}</h3>
                    <p className="text-xs text-muted">{ROLE_LABELS[member.role] || member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm md:text-base font-bold text-primary">{progress}%</p>
                    <p className="text-[10px] text-muted">{completed}/{memberTaskList.length} done</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {memberTaskList.length > 0 && (
                  <div className="h-1.5 bg-primary-50 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`h-full rounded-full ${progress === 100 ? 'bg-success' : progress > 0 ? 'bg-warning' : 'bg-muted'}`}
                    />
                  </div>
                )}

                {/* Task List */}
                {memberTaskList.length > 0 && (
                  <div className="space-y-1.5">
                    {memberTaskList.map((task) => (
                      <div key={task.id} className="flex items-center gap-2 py-1">
                        {task.status === 'completed' ? (
                          <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                        ) : task.status === 'in_progress' ? (
                          <Clock size={14} className="text-warning flex-shrink-0" />
                        ) : (
                          <Circle size={14} className="text-muted flex-shrink-0" />
                        )}
                        <span className={`text-xs ${task.status === 'completed' ? 'text-muted line-through' : 'text-primary'}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {memberTaskList.length === 0 && (
                  <p className="text-xs text-muted italic">No tasks assigned yet</p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
