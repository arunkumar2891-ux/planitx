import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login', { replace: true }), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen premium-gradient flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Decorative geometric elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/30 rotate-45" />
        <div className="absolute top-40 right-8 w-24 h-24 border border-white/20 rotate-12" />
        <div className="absolute bottom-32 left-16 w-20 h-20 border border-white/20 -rotate-12" />
        <div className="absolute bottom-20 right-12 w-28 h-28 border border-white/30 rotate-45" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 relative">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="50" y="50" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 70 70)"/>
              <rect x="110" y="50" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 130 70)"/>
              <rect x="50" y="110" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 70 130)"/>
              <rect x="110" y="110" width="40" height="40" stroke="white" strokeWidth="3" fill="none" transform="rotate(45 130 130)"/>
              <path d="M100 85 C100 75, 110 70, 110 80 C110 90, 100 95, 100 95 C100 95, 90 90, 90 80 C90 70, 100 75, 100 85Z" fill="#C41E3A"/>
            </svg>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl font-display font-bold text-white tracking-wide mb-3"
        >
          Plan<span className="text-accent-300">ITX</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-white/70 text-base font-light tracking-wide text-center"
        >
          Your Wedding. Planned Perfectly.
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  )
}
