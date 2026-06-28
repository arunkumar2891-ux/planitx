export interface Wedding {
  id: string
  user_id: string
  bride_name: string
  groom_name: string
  wedding_date: string
  wedding_city: string
  wedding_type: 'hindu' | 'muslim' | 'christian' | 'sikh' | 'multi_faith' | 'other'
  total_budget: number
  expected_guests: number
  planning_by: 'couple' | 'parents' | 'planner' | 'all'
}

export interface FamilyMember {
  id: string
  wedding_id: string
  name: string
  role: 'father_of_bride' | 'mother_of_bride' | 'father_of_groom' | 'mother_of_groom' | 'sibling_bride' | 'sibling_groom' | 'other'
  phone?: string
  email?: string
  avatar_url?: string
}

export interface BudgetCategory {
  id: string
  wedding_id: string
  category: string
  allocated_amount: number
  spent_amount: number
}

export interface Expense {
  id: string
  budget_category_id: string
  wedding_id: string
  description: string
  amount: number
  date: string
  receipt_url?: string
}

export interface Guest {
  id: string
  wedding_id: string
  name: string
  phone?: string
  email?: string
  side: 'groom' | 'bride' | 'friends' | 'vip'
  rsvp_status: 'confirmed' | 'pending' | 'declined'
  plus_ones: number
  dietary_preference?: string
  table_number?: string
  notes?: string
}

export interface Vendor {
  id: string
  name: string
  category: 'hall' | 'caterer' | 'photographer' | 'makeup_artist' | 'decorator' | 'dj' | 'mehendi_artist' | 'other'
  description?: string
  city?: string
  phone?: string
  email?: string
  website?: string
  price_range?: string
  rating: number
  photos: string[]
  is_featured: boolean
  is_sponsored: boolean
}

export interface VendorBooking {
  id: string
  wedding_id: string
  vendor_id?: string
  vendor_name: string
  category: string
  total_amount: number
  paid_amount: number
  due_date?: string
  status: 'confirmed' | 'pending' | 'cancelled'
  notes?: string
}

export interface Payment {
  id: string
  vendor_booking_id: string
  wedding_id: string
  amount: number
  payment_date?: string
  payment_method?: string
  reference_number?: string
  notes?: string
}

export interface Task {
  id: string
  wedding_id: string
  title: string
  description?: string
  assigned_to?: string
  assigned_to_name?: string
  due_date?: string
  priority: 'high' | 'medium' | 'low'
  status: 'completed' | 'in_progress' | 'pending' | 'overdue'
  completion_percentage: number
  category?: string
}

export interface WeddingDayEvent {
  id: string
  wedding_id: string
  event_name: string
  start_time: string
  end_time?: string
  location?: string
  notes?: string
  reminder_before_minutes: number
  sort_order: number
}

export interface ChecklistItem {
  id: string
  wedding_id: string
  title: string
  is_completed: boolean
  icon?: string
  sort_order: number
}

export interface SignupData {
  email: string
  phone: string
  password: string
  bride_name: string
  groom_name: string
  wedding_date: string
  wedding_city: string
  wedding_type: string
  total_budget: number
  expected_guests: number
  planning_by: string
  family_members: Omit<FamilyMember, 'id' | 'wedding_id'>[]
}
