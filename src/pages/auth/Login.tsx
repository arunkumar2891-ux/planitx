import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useStore } from '@/lib/store'

export default function Login() {
  const navigate = useNavigate()
  const loadSampleData = useStore((s) => s.loadSampleData)
  const [tab, setTab] = useState<'email' | 'phone'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleLogin = () => {
    loadSampleData()
    navigate('/dashboard', { replace: true })
  }

  const handleSendOtp = () => {
    setOtpSent(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
      {/* Header area */}
      <div className="pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-4"
        >
          <div className="w-14 h-14">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="50" y="50" width="40" height="40" stroke="#1A1A1A" strokeWidth="3" fill="none" transform="rotate(45 70 70)"/>
              <rect x="110" y="50" width="40" height="40" stroke="#1A1A1A" strokeWidth="3" fill="none" transform="rotate(45 130 70)"/>
              <rect x="50" y="110" width="40" height="40" stroke="#1A1A1A" strokeWidth="3" fill="none" transform="rotate(45 70 130)"/>
              <rect x="110" y="110" width="40" height="40" stroke="#1A1A1A" strokeWidth="3" fill="none" transform="rotate(45 130 130)"/>
              <path d="M100 85 C100 75, 110 70, 110 80 C110 90, 100 95, 100 95 C100 95, 90 90, 90 80 C90 70, 100 75, 100 85Z" fill="#C41E3A"/>
            </svg>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-display font-bold text-primary"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm mt-1"
        >
          Sign in to continue planning your dream wedding
        </motion.p>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 px-6"
      >
        {/* Tab Switcher */}
        <div className="flex bg-primary-50 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setTab('email'); setOtpSent(false) }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              tab === 'email' ? 'bg-white text-primary shadow-sm' : 'text-muted'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => { setTab('phone'); setOtpSent(false) }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              tab === 'phone' ? 'bg-white text-primary shadow-sm' : 'text-muted'
            }`}
          >
            Phone OTP
          </button>
        </div>

        {tab === 'email' ? (
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="priya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end">
              <button className="text-sm text-accent font-medium">Forgot Password?</button>
            </div>
            <Button variant="accent" fullWidth size="lg" onClick={handleLogin}>
              Sign In
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone size={18} />}
            />
            {otpSent ? (
              <>
                <Input
                  label="Enter OTP"
                  type="text"
                  placeholder="6-digit code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button variant="accent" fullWidth size="lg" onClick={handleLogin}>
                  Verify & Sign In
                </Button>
              </>
            ) : (
              <Button variant="accent" fullWidth size="lg" onClick={handleSendOtp}>
                Send OTP
              </Button>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google OAuth */}
        <Button variant="outline" fullWidth onClick={handleLogin}>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent font-semibold">
            Create Account
          </Link>
        </p>
      </motion.div>
      </div>
    </div>
  )
}
