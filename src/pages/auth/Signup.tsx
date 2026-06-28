import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Lock, User, Calendar, MapPin, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useStore } from '@/lib/store'

const STEPS = ['Account', 'Couple', 'Planning', 'Family']

const WEDDING_TYPES = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Multi-faith', 'Other']
const BUDGET_OPTIONS = ['5 Lakhs', '10 Lakhs', '25 Lakhs', '50 Lakhs', '1 Crore+']
const GUEST_OPTIONS = ['100', '250', '500', '1000+']
const PLANNING_OPTIONS = ['Couple', 'Parents', 'Wedding Planner', 'All Together']
const FAMILY_ROLES = ['Father of Bride', 'Mother of Bride', 'Father of Groom', 'Mother of Groom', 'Sibling', 'Other']

export default function Signup() {
  const navigate = useNavigate()
  const loadSampleData = useStore((s) => s.loadSampleData)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '',
    bride_name: '',
    groom_name: '',
    wedding_date: '',
    wedding_city: '',
    wedding_type: '',
    budget: '',
    guests: '',
    planning_by: '',
    family: [] as { name: string; role: string; phone: string }[],
  })

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const addFamilyMember = () => {
    setForm((prev) => ({
      ...prev,
      family: [...prev.family, { name: '', role: '', phone: '' }],
    }))
  }

  const updateFamilyMember = (index: number, field: string, value: string) => {
    setForm((prev) => {
      const updated = [...prev.family]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, family: updated }
    })
  }

  const removeFamilyMember = (index: number) => {
    setForm((prev) => ({
      ...prev,
      family: prev.family.filter((_, i) => i !== index),
    }))
  }

  const handleComplete = () => {
    loadSampleData()
    navigate('/dashboard', { replace: true })
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
    else handleComplete()
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4">
      <div className="w-full max-w-lg">
      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/login" className="text-muted text-sm">Cancel</Link>
          <span className="text-sm font-medium text-primary">Step {step + 1} of 4</span>
          {step === 3 && (
            <button onClick={handleComplete} className="text-accent text-sm font-medium">Skip</button>
          )}
          {step < 3 && <div className="w-10" />}
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-border'}`}
              animate={{ backgroundColor: i <= step ? '#C41E3A' : '#E5E5E5' }}
            />
          ))}
        </div>

        <motion.h2
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold text-primary"
        >
          {step === 0 && 'Create Your Account'}
          {step === 1 && 'About the Couple'}
          {step === 2 && 'Planning Details'}
          {step === 3 && 'Add Family Members'}
        </motion.h2>
        <p className="text-sm text-muted mt-1">
          {step === 0 && 'Start your wedding planning journey'}
          {step === 1 && 'Tell us about the bride and groom'}
          {step === 2 && 'Help us personalize your experience'}
          {step === 3 && 'Optional - you can add more later'}
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {step === 0 && (
              <>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="priya@example.com"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  icon={<Mail size={18} />}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => updateForm('phone', e.target.value)}
                  icon={<Phone size={18} />}
                />
                <Input
                  label="Create Password"
                  type="password"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={(e) => updateForm('password', e.target.value)}
                  icon={<Lock size={18} />}
                />
                {/* Google OAuth */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted">or</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <Button variant="outline" fullWidth onClick={handleComplete}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign Up with Google
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <Input
                  label="Bride's Full Name"
                  placeholder="Priya Sharma"
                  value={form.bride_name}
                  onChange={(e) => updateForm('bride_name', e.target.value)}
                  icon={<User size={18} />}
                />
                <Input
                  label="Groom's Full Name"
                  placeholder="Rahul Mehta"
                  value={form.groom_name}
                  onChange={(e) => updateForm('groom_name', e.target.value)}
                  icon={<User size={18} />}
                />
                <Input
                  label="Wedding Date"
                  type="date"
                  value={form.wedding_date}
                  onChange={(e) => updateForm('wedding_date', e.target.value)}
                  icon={<Calendar size={18} />}
                />
                <Input
                  label="Wedding City"
                  placeholder="Jaipur"
                  value={form.wedding_city}
                  onChange={(e) => updateForm('wedding_city', e.target.value)}
                  icon={<MapPin size={18} />}
                />
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Wedding Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {WEDDING_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateForm('wedding_type', type.toLowerCase())}
                        className={`py-2.5 px-3 text-xs font-medium rounded-xl border transition-all ${
                          form.wedding_type === type.toLowerCase()
                            ? 'border-accent bg-accent-50 text-accent'
                            : 'border-border text-muted hover:border-primary-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Estimated Budget</label>
                  <div className="grid grid-cols-3 gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateForm('budget', opt)}
                        className={`py-3 px-3 text-sm font-medium rounded-xl border transition-all ${
                          form.budget === opt
                            ? 'border-accent bg-accent-50 text-accent'
                            : 'border-border text-muted hover:border-primary-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Expected Guests</label>
                  <div className="grid grid-cols-4 gap-2">
                    {GUEST_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateForm('guests', opt)}
                        className={`py-3 px-3 text-sm font-medium rounded-xl border transition-all ${
                          form.guests === opt
                            ? 'border-accent bg-accent-50 text-accent'
                            : 'border-border text-muted hover:border-primary-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Who is planning?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PLANNING_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateForm('planning_by', opt.toLowerCase())}
                        className={`py-3 px-3 text-sm font-medium rounded-xl border transition-all ${
                          form.planning_by === opt.toLowerCase()
                            ? 'border-accent bg-accent-50 text-accent'
                            : 'border-border text-muted hover:border-primary-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {form.family.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-border rounded-xl p-4 space-y-3 relative"
                  >
                    <button
                      onClick={() => removeFamilyMember(i)}
                      className="absolute top-3 right-3 text-muted hover:text-accent"
                    >
                      <X size={16} />
                    </button>
                    <Input
                      placeholder="Full Name"
                      value={member.name}
                      onChange={(e) => updateFamilyMember(i, 'name', e.target.value)}
                    />
                    <select
                      value={member.role}
                      onChange={(e) => updateFamilyMember(i, 'role', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    >
                      <option value="">Select Role</option>
                      {FAMILY_ROLES.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      value={member.phone}
                      onChange={(e) => updateFamilyMember(i, 'phone', e.target.value)}
                    />
                  </motion.div>
                ))}
                <button
                  onClick={addFamilyMember}
                  className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted text-sm font-medium flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-colors"
                >
                  <Plus size={18} />
                  Add Family Member
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="outline" onClick={prevStep} className="px-4">
              <ChevronLeft size={18} />
            </Button>
          )}
          <Button variant="accent" fullWidth size="lg" onClick={nextStep}>
            {step === 3 ? 'Complete Setup' : 'Continue'}
            {step < 3 && <ChevronRight size={18} className="ml-1" />}
          </Button>
        </div>

        {step === 0 && (
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold">Sign In</Link>
          </p>
        )}
      </div>
      </div>
    </div>
  )
}
