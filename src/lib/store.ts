import { create } from 'zustand'
import type { Wedding, FamilyMember, BudgetCategory, Guest, Vendor, VendorBooking, Task, WeddingDayEvent, ChecklistItem } from '@/types'

interface AppState {
  isAuthenticated: boolean
  wedding: Wedding | null
  familyMembers: FamilyMember[]
  budgetCategories: BudgetCategory[]
  guests: Guest[]
  vendors: Vendor[]
  vendorBookings: VendorBooking[]
  tasks: Task[]
  weddingDayEvents: WeddingDayEvent[]
  checklist: ChecklistItem[]
  setAuthenticated: (val: boolean) => void
  loadSampleData: () => void
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  wedding: null,
  familyMembers: [],
  budgetCategories: [],
  guests: [],
  vendors: [],
  vendorBookings: [],
  tasks: [],
  weddingDayEvents: [],
  checklist: [],
  setAuthenticated: (val) => set({ isAuthenticated: val }),
  loadSampleData: () =>
    set({
      isAuthenticated: true,
      wedding: {
        id: '1',
        user_id: 'u1',
        bride_name: 'Priya Sharma',
        groom_name: 'Rahul Mehta',
        wedding_date: '2025-02-15',
        wedding_city: 'Jaipur',
        wedding_type: 'hindu',
        total_budget: 2500000,
        expected_guests: 500,
        planning_by: 'all',
      },
      familyMembers: [
        { id: 'fm1', wedding_id: '1', name: 'Rajesh Sharma', role: 'father_of_bride', phone: '+91 98765 43210' },
        { id: 'fm2', wedding_id: '1', name: 'Sunita Sharma', role: 'mother_of_bride', phone: '+91 98765 43211' },
        { id: 'fm3', wedding_id: '1', name: 'Vijay Mehta', role: 'father_of_groom', phone: '+91 98765 43212' },
        { id: 'fm4', wedding_id: '1', name: 'Kavita Mehta', role: 'mother_of_groom', phone: '+91 98765 43213' },
        { id: 'fm5', wedding_id: '1', name: 'Neha Sharma', role: 'sibling_bride', phone: '+91 98765 43214' },
        { id: 'fm6', wedding_id: '1', name: 'Amit Mehta', role: 'sibling_groom', phone: '+91 98765 43215' },
      ],
      budgetCategories: [
        { id: 'bc1', wedding_id: '1', category: 'Hall', allocated_amount: 800000, spent_amount: 600000 },
        { id: 'bc2', wedding_id: '1', category: 'Catering', allocated_amount: 500000, spent_amount: 350000 },
        { id: 'bc3', wedding_id: '1', category: 'Photography', allocated_amount: 300000, spent_amount: 200000 },
        { id: 'bc4', wedding_id: '1', category: 'Decoration', allocated_amount: 350000, spent_amount: 280000 },
        { id: 'bc5', wedding_id: '1', category: 'Jewellery', allocated_amount: 250000, spent_amount: 250000 },
        { id: 'bc6', wedding_id: '1', category: 'Clothing', allocated_amount: 200000, spent_amount: 150000 },
        { id: 'bc7', wedding_id: '1', category: 'Travel', allocated_amount: 100000, spent_amount: 45000 },
      ],
      guests: [
        { id: 'g1', wedding_id: '1', name: 'Ananya Gupta', phone: '+91 99887 76654', side: 'bride', rsvp_status: 'confirmed', plus_ones: 1 },
        { id: 'g2', wedding_id: '1', name: 'Rohit Verma', phone: '+91 99887 76655', side: 'groom', rsvp_status: 'confirmed', plus_ones: 2 },
        { id: 'g3', wedding_id: '1', name: 'Sneha Patel', phone: '+91 99887 76656', side: 'bride', rsvp_status: 'pending', plus_ones: 0 },
        { id: 'g4', wedding_id: '1', name: 'Vikram Singh', phone: '+91 99887 76657', side: 'groom', rsvp_status: 'confirmed', plus_ones: 3 },
        { id: 'g5', wedding_id: '1', name: 'Meera Joshi', phone: '+91 99887 76658', side: 'friends', rsvp_status: 'confirmed', plus_ones: 1 },
        { id: 'g6', wedding_id: '1', name: 'Arjun Reddy', phone: '+91 99887 76659', side: 'friends', rsvp_status: 'pending', plus_ones: 0 },
        { id: 'g7', wedding_id: '1', name: 'Minister Shri K.R. Nair', phone: '+91 99887 76660', side: 'vip', rsvp_status: 'confirmed', plus_ones: 4 },
        { id: 'g8', wedding_id: '1', name: 'Dr. Ramesh Agarwal', phone: '+91 99887 76661', side: 'vip', rsvp_status: 'pending', plus_ones: 2 },
        { id: 'g9', wedding_id: '1', name: 'Pooja Iyer', phone: '+91 99887 76662', side: 'bride', rsvp_status: 'declined', plus_ones: 0 },
        { id: 'g10', wedding_id: '1', name: 'Karthik Nair', phone: '+91 99887 76663', side: 'groom', rsvp_status: 'confirmed', plus_ones: 1 },
      ],
      vendors: [
        { id: 'v1', name: 'Taj Palace Banquets', category: 'hall', description: 'Premium 5-star wedding venue with royal Rajasthani architecture', city: 'Jaipur', phone: '+91 141 234 5678', email: 'events@tajpalace.com', website: 'https://tajpalacebanquets.com', price_range: '8L-15L', rating: 4.8, photos: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400'], is_featured: true, is_sponsored: false },
        { id: 'v2', name: 'Royal Caterers', category: 'caterer', description: 'Multi-cuisine catering with 200+ dishes menu', city: 'Jaipur', phone: '+91 141 234 5679', email: 'bookings@royalcaterers.in', website: 'https://royalcaterers.in', price_range: '3L-8L', rating: 4.6, photos: ['https://images.unsplash.com/photo-1555244162-803834f70033?w=400'], is_featured: false, is_sponsored: true },
        { id: 'v3', name: 'Candid Clicks Studio', category: 'photographer', description: 'Award-winning wedding photography & cinematography', city: 'Jaipur', phone: '+91 141 234 5680', email: 'hello@candidclicks.in', website: 'https://candidclicks.in', price_range: '2L-5L', rating: 4.9, photos: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400'], is_featured: true, is_sponsored: false },
        { id: 'v4', name: 'Glamour by Ritu', category: 'makeup_artist', description: 'Celebrity makeup artist specializing in bridal looks', city: 'Jaipur', phone: '+91 141 234 5681', email: 'ritu@glamourbyritu.com', price_range: '50K-2L', rating: 4.7, photos: ['https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400'], is_featured: false, is_sponsored: false },
        { id: 'v5', name: 'Dream Decor Events', category: 'decorator', description: 'Luxury floral & theme-based wedding decorations', city: 'Jaipur', phone: '+91 141 234 5682', email: 'info@dreamdecor.in', website: 'https://dreamdecor.in', price_range: '3L-10L', rating: 4.5, photos: ['https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400'], is_featured: true, is_sponsored: true },
        { id: 'v6', name: 'DJ Beats Unlimited', category: 'dj', description: 'High-energy sangeet & reception entertainment', city: 'Jaipur', phone: '+91 141 234 5683', email: 'book@djbeats.in', price_range: '50K-2L', rating: 4.4, photos: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'], is_featured: false, is_sponsored: false },
        { id: 'v7', name: 'Mehendi by Rajni', category: 'mehendi_artist', description: 'Intricate bridal mehendi with traditional & modern designs', city: 'Jaipur', phone: '+91 141 234 5684', email: 'rajni.mehendi@gmail.com', price_range: '15K-50K', rating: 4.8, photos: ['https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=400'], is_featured: false, is_sponsored: false },
      ],
      vendorBookings: [
        { id: 'vb1', wedding_id: '1', vendor_id: 'v1', vendor_name: 'Taj Palace Banquets', category: 'Hall', total_amount: 1200000, paid_amount: 600000, due_date: '2025-01-15', status: 'confirmed' },
        { id: 'vb2', wedding_id: '1', vendor_id: 'v2', vendor_name: 'Royal Caterers', category: 'Catering', total_amount: 500000, paid_amount: 200000, due_date: '2025-02-01', status: 'confirmed' },
        { id: 'vb3', wedding_id: '1', vendor_id: 'v3', vendor_name: 'Candid Clicks Studio', category: 'Photography', total_amount: 300000, paid_amount: 150000, due_date: '2025-02-10', status: 'confirmed' },
        { id: 'vb4', wedding_id: '1', vendor_id: 'v5', vendor_name: 'Dream Decor Events', category: 'Decoration', total_amount: 450000, paid_amount: 100000, due_date: '2025-02-05', status: 'pending' },
        { id: 'vb5', wedding_id: '1', vendor_id: 'v4', vendor_name: 'Glamour by Ritu', category: 'Makeup', total_amount: 150000, paid_amount: 75000, due_date: '2025-02-14', status: 'confirmed' },
      ],
      tasks: [
        { id: 't1', wedding_id: '1', title: 'Finalize Wedding Hall', assigned_to: 'fm1', assigned_to_name: 'Rajesh Sharma', due_date: '2024-11-30', priority: 'high', status: 'completed', completion_percentage: 100, category: 'venue' },
        { id: 't2', wedding_id: '1', title: 'Book Photographer', assigned_to: 'fm5', assigned_to_name: 'Neha Sharma', due_date: '2024-12-15', priority: 'high', status: 'completed', completion_percentage: 100, category: 'photography' },
        { id: 't3', wedding_id: '1', title: 'Send Wedding Invitations', assigned_to: 'fm2', assigned_to_name: 'Sunita Sharma', due_date: '2025-01-10', priority: 'high', status: 'in_progress', completion_percentage: 65, category: 'invitation' },
        { id: 't4', wedding_id: '1', title: 'Menu Tasting Session', assigned_to: 'fm4', assigned_to_name: 'Kavita Mehta', due_date: '2025-01-20', priority: 'medium', status: 'pending', completion_percentage: 0, category: 'catering' },
        { id: 't5', wedding_id: '1', title: 'Jewellery Purchase', assigned_to: 'fm2', assigned_to_name: 'Sunita Sharma', due_date: '2025-01-25', priority: 'high', status: 'in_progress', completion_percentage: 80, category: 'jewellery' },
        { id: 't6', wedding_id: '1', title: 'Book Mehendi Artist', assigned_to: 'fm5', assigned_to_name: 'Neha Sharma', due_date: '2025-01-05', priority: 'medium', status: 'completed', completion_percentage: 100, category: 'mehendi' },
        { id: 't7', wedding_id: '1', title: 'Arrange Guest Transportation', assigned_to: 'fm3', assigned_to_name: 'Vijay Mehta', due_date: '2025-02-01', priority: 'medium', status: 'pending', completion_percentage: 20, category: 'travel' },
        { id: 't8', wedding_id: '1', title: 'Finalize Decoration Theme', assigned_to: 'fm4', assigned_to_name: 'Kavita Mehta', due_date: '2025-01-15', priority: 'high', status: 'in_progress', completion_percentage: 50, category: 'decoration' },
      ],
      weddingDayEvents: [
        { id: 'we1', wedding_id: '1', event_name: 'Bridal Makeup & Styling', start_time: '05:00', end_time: '07:00', location: 'Bridal Suite, Taj Palace', notes: 'Ritu and team arriving at 4:45 AM', reminder_before_minutes: 30, sort_order: 1 },
        { id: 'we2', wedding_id: '1', event_name: 'Photography Coverage Begins', start_time: '07:00', end_time: '07:30', location: 'Taj Palace Gardens', notes: 'Getting ready shots & couple portraits', reminder_before_minutes: 15, sort_order: 2 },
        { id: 'we3', wedding_id: '1', event_name: 'Baraat Procession', start_time: '08:00', end_time: '09:00', location: 'Main Entrance', notes: 'Band and dhol arranged, horse confirmed', reminder_before_minutes: 30, sort_order: 3 },
        { id: 'we4', wedding_id: '1', event_name: 'Muhurtham / Pheras', start_time: '09:00', end_time: '11:00', location: 'Main Mandap Hall', notes: 'Pandit Ji arriving at 8:30 AM', reminder_before_minutes: 60, sort_order: 4 },
        { id: 'we5', wedding_id: '1', event_name: 'Vidaai Ceremony', start_time: '11:00', end_time: '11:30', location: 'Main Gate', notes: 'Emotional moment - ensure photographer ready', reminder_before_minutes: 15, sort_order: 5 },
        { id: 'we6', wedding_id: '1', event_name: 'Grand Lunch Reception', start_time: '12:00', end_time: '14:00', location: 'Banquet Hall', notes: '500 guests expected, 15 live counters', reminder_before_minutes: 30, sort_order: 6 },
        { id: 'we7', wedding_id: '1', event_name: 'Couple Photo Session', start_time: '15:00', end_time: '16:00', location: 'Palace Terrace', notes: 'Sunset photos at 5 PM if time permits', reminder_before_minutes: 15, sort_order: 7 },
        { id: 'we8', wedding_id: '1', event_name: 'Evening Reception & DJ', start_time: '19:00', end_time: '23:00', location: 'Grand Ballroom', notes: 'DJ Beats Unlimited setup by 6 PM', reminder_before_minutes: 60, sort_order: 8 },
      ],
      checklist: [
        { id: 'cl1', wedding_id: '1', title: 'Venue Booked', is_completed: true, icon: 'building', sort_order: 1 },
        { id: 'cl2', wedding_id: '1', title: 'Photography Confirmed', is_completed: true, icon: 'camera', sort_order: 2 },
        { id: 'cl3', wedding_id: '1', title: 'Catering Finalized', is_completed: false, icon: 'utensils', sort_order: 3 },
        { id: 'cl4', wedding_id: '1', title: 'Invitations Sent', is_completed: false, icon: 'mail', sort_order: 4 },
        { id: 'cl5', wedding_id: '1', title: 'Makeup Artist Booked', is_completed: true, icon: 'sparkles', sort_order: 5 },
        { id: 'cl6', wedding_id: '1', title: 'Decoration Theme Selected', is_completed: false, icon: 'palette', sort_order: 6 },
      ],
    }),
}))
