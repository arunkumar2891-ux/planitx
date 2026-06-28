import { motion } from 'framer-motion'
import BottomNav from './BottomNav'

interface PageWrapperProps {
  children: React.ReactNode
  showNav?: boolean
  className?: string
}

export default function PageWrapper({ children, showNav = true, className = '' }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className={`min-h-screen ${showNav ? 'pb-20 lg:pb-0 lg:pl-56' : ''} ${className}`}
    >
      {children}
      {showNav && <BottomNav />}
    </motion.div>
  )
}
