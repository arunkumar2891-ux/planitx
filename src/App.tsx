import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import SplashScreen from '@/pages/SplashScreen'
import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import Dashboard from '@/pages/Dashboard'
import BudgetTracker from '@/pages/BudgetTracker'
import GuestManagement from '@/pages/GuestManagement'
import VendorMarketplace from '@/pages/VendorMarketplace'
import PaymentTracker from '@/pages/PaymentTracker'
import TaskTimeline from '@/pages/TaskTimeline'
import FamilyResponsibility from '@/pages/FamilyResponsibility'
import WeddingDaySchedule from '@/pages/WeddingDaySchedule'
import Profile from '@/pages/Profile'
import DesignOverview from '@/pages/DesignOverview'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <div className="w-full min-h-screen bg-background relative">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/design" element={<DesignOverview />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><BudgetTracker /></ProtectedRoute>} />
          <Route path="/guests" element={<ProtectedRoute><GuestManagement /></ProtectedRoute>} />
          <Route path="/vendors" element={<ProtectedRoute><VendorMarketplace /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><PaymentTracker /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TaskTimeline /></ProtectedRoute>} />
          <Route path="/family" element={<ProtectedRoute><FamilyResponsibility /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><WeddingDaySchedule /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
