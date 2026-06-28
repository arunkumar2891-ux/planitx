-- ============================================================
-- PlanITX - Supabase PostgreSQL Database Schema
-- Complete schema with tables, RLS policies, and seed data
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wedding details
CREATE TABLE public.weddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_city TEXT,
  wedding_type TEXT CHECK (wedding_type IN ('hindu', 'muslim', 'christian', 'sikh', 'multi_faith', 'other')),
  total_budget NUMERIC(12, 2) DEFAULT 0,
  expected_guests INTEGER DEFAULT 0,
  planning_by TEXT CHECK (planning_by IN ('couple', 'parents', 'planner', 'all')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family members
CREATE TABLE public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN (
    'father_of_bride', 'mother_of_bride',
    'father_of_groom', 'mother_of_groom',
    'sibling_bride', 'sibling_groom', 'other'
  )),
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budget categories
CREATE TABLE public.budget_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  allocated_amount NUMERIC(12, 2) DEFAULT 0,
  spent_amount NUMERIC(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budget expenses (individual line items)
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_category_id UUID REFERENCES public.budget_categories(id) ON DELETE CASCADE,
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  date DATE,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests
CREATE TABLE public.guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  side TEXT CHECK (side IN ('groom', 'bride', 'friends', 'vip')),
  rsvp_status TEXT CHECK (rsvp_status IN ('confirmed', 'pending', 'declined')) DEFAULT 'pending',
  plus_ones INTEGER DEFAULT 0,
  dietary_preference TEXT,
  table_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendors (marketplace - global)
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN (
    'hall', 'caterer', 'photographer', 'makeup_artist',
    'decorator', 'dj', 'mehendi_artist', 'other'
  )),
  description TEXT,
  city TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  price_range TEXT,
  rating NUMERIC(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  photos TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_sponsored BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor bookings (links vendor to wedding)
CREATE TABLE public.vendor_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
  vendor_name TEXT NOT NULL,
  category TEXT NOT NULL,
  total_amount NUMERIC(12, 2) DEFAULT 0,
  paid_amount NUMERIC(12, 2) DEFAULT 0,
  due_date DATE,
  status TEXT CHECK (status IN ('confirmed', 'pending', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_booking_id UUID REFERENCES public.vendor_bookings(id) ON DELETE CASCADE,
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL,
  payment_date DATE,
  payment_method TEXT,
  reference_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
  due_date DATE,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('completed', 'in_progress', 'pending', 'overdue')) DEFAULT 'pending',
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wedding day schedule
CREATE TABLE public.wedding_day_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  location TEXT,
  notes TEXT,
  reminder_before_minutes INTEGER DEFAULT 30,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Checklist items (quick status cards on dashboard)
CREATE TABLE public.checklist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES for performance
-- ============================================================

CREATE INDEX idx_weddings_user_id ON public.weddings(user_id);
CREATE INDEX idx_family_members_wedding_id ON public.family_members(wedding_id);
CREATE INDEX idx_budget_categories_wedding_id ON public.budget_categories(wedding_id);
CREATE INDEX idx_expenses_wedding_id ON public.expenses(wedding_id);
CREATE INDEX idx_expenses_category_id ON public.expenses(budget_category_id);
CREATE INDEX idx_guests_wedding_id ON public.guests(wedding_id);
CREATE INDEX idx_guests_side ON public.guests(side);
CREATE INDEX idx_guests_rsvp ON public.guests(rsvp_status);
CREATE INDEX idx_vendors_category ON public.vendors(category);
CREATE INDEX idx_vendors_city ON public.vendors(city);
CREATE INDEX idx_vendor_bookings_wedding_id ON public.vendor_bookings(wedding_id);
CREATE INDEX idx_payments_wedding_id ON public.payments(wedding_id);
CREATE INDEX idx_tasks_wedding_id ON public.tasks(wedding_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_wedding_day_events_wedding_id ON public.wedding_day_events(wedding_id);
CREATE INDEX idx_checklist_items_wedding_id ON public.checklist_items(wedding_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_day_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only access their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Weddings: users can only manage their own wedding
CREATE POLICY "Users can view own weddings"
  ON public.weddings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create weddings"
  ON public.weddings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own weddings"
  ON public.weddings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own weddings"
  ON public.weddings FOR DELETE USING (auth.uid() = user_id);

-- Family members: accessible to wedding owner
CREATE POLICY "Users can manage family members"
  ON public.family_members FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Budget categories: accessible to wedding owner
CREATE POLICY "Users can manage budget categories"
  ON public.budget_categories FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Expenses: accessible to wedding owner
CREATE POLICY "Users can manage expenses"
  ON public.expenses FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Guests: accessible to wedding owner
CREATE POLICY "Users can manage guests"
  ON public.guests FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Vendors: publicly readable
CREATE POLICY "Anyone can view vendors"
  ON public.vendors FOR SELECT USING (true);
CREATE POLICY "Admins can manage vendors"
  ON public.vendors FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE email LIKE '%@planitx.com'));

-- Vendor bookings: accessible to wedding owner
CREATE POLICY "Users can manage vendor bookings"
  ON public.vendor_bookings FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Payments: accessible to wedding owner
CREATE POLICY "Users can manage payments"
  ON public.payments FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Tasks: accessible to wedding owner
CREATE POLICY "Users can manage tasks"
  ON public.tasks FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Wedding day events: accessible to wedding owner
CREATE POLICY "Users can manage schedule"
  ON public.wedding_day_events FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- Checklist items: accessible to wedding owner
CREATE POLICY "Users can manage checklist"
  ON public.checklist_items FOR ALL
  USING (wedding_id IN (SELECT id FROM public.weddings WHERE user_id = auth.uid()));

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, phone)
  VALUES (NEW.id, NEW.email, NEW.phone);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_weddings_updated_at
  BEFORE UPDATE ON public.weddings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- SEED DATA - Vendor Marketplace (global data)
-- ============================================================

INSERT INTO public.vendors (name, category, description, city, phone, email, price_range, rating, photos, is_featured, is_sponsored) VALUES
('Taj Palace Banquets', 'hall', 'Premium 5-star wedding venue with royal Rajasthani architecture, sprawling lawns and indoor ballrooms', 'Jaipur', '+91 141 234 5678', 'events@tajpalace.com', '8L-15L', 4.8, ARRAY['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600'], true, false),
('The Leela Palace', 'hall', 'Opulent palace wedding venue with Mughal gardens and lakeside mandap options', 'Udaipur', '+91 294 234 5678', 'weddings@leela.com', '15L-30L', 4.9, ARRAY['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600'], true, true),
('Royal Meadows', 'hall', 'Open-air garden venue perfect for destination weddings with 1000+ guest capacity', 'Jaipur', '+91 141 345 6789', 'book@royalmeadows.in', '5L-10L', 4.5, ARRAY['https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600'], false, false),

('Spice Kitchen Caterers', 'caterer', 'Multi-cuisine catering with 200+ dishes, live counters, and customized thali options', 'Jaipur', '+91 141 456 7890', 'orders@spicekitchen.in', '3L-8L', 4.6, ARRAY['https://images.unsplash.com/photo-1555244162-803834f70033?w=600'], false, true),
('Grand Feast Catering', 'caterer', 'Luxury wedding catering with Rajasthani, Mughlai, Continental and Chinese cuisines', 'Delhi', '+91 11 456 7890', 'info@grandfeast.com', '5L-12L', 4.7, ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'], true, false),
('Annapurna Caterers', 'caterer', 'Pure vegetarian South Indian & North Indian wedding catering specialists', 'Chennai', '+91 44 567 8901', 'hello@annapurna.in', '2L-5L', 4.4, ARRAY['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600'], false, false),

('Candid Clicks Studio', 'photographer', 'Award-winning wedding photography & cinematography with drone coverage', 'Jaipur', '+91 141 567 8901', 'book@candidclicks.in', '2L-5L', 4.9, ARRAY['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600'], true, false),
('Wedding Filmer', 'photographer', 'Cinematic wedding films and premium photo books with same-day edits', 'Mumbai', '+91 22 678 9012', 'hello@weddingfilmer.com', '3L-8L', 4.8, ARRAY['https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600'], true, true),
('Pixel Perfect Studios', 'photographer', 'Budget-friendly candid photography packages for intimate weddings', 'Bangalore', '+91 80 789 0123', 'info@pixelperfect.in', '1L-3L', 4.3, ARRAY['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600'], false, false),

('Glamour by Ritu', 'makeup_artist', 'Celebrity makeup artist specializing in bridal looks with airbrush technique', 'Jaipur', '+91 141 678 9012', 'book@glamourbyritu.com', '50K-2L', 4.7, ARRAY['https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600'], false, false),
('Bridal Beauty Lounge', 'makeup_artist', 'HD bridal makeup with pre-bridal packages and hairstyling', 'Delhi', '+91 11 789 0123', 'appointments@bridalbeauty.in', '75K-3L', 4.8, ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600'], true, false),

('Dream Decor Events', 'decorator', 'Luxury floral & theme-based wedding decorations with 3D mandap designs', 'Jaipur', '+91 141 789 0123', 'design@dreamdecor.in', '3L-10L', 4.5, ARRAY['https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600'], true, true),
('Blossom Events', 'decorator', 'Sustainable & eco-friendly wedding decoration with living installations', 'Mumbai', '+91 22 890 1234', 'hello@blossomevents.com', '4L-12L', 4.6, ARRAY['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600'], false, false),

('DJ Beats Unlimited', 'dj', 'High-energy sangeet & reception entertainment with LED dance floor', 'Jaipur', '+91 141 890 1234', 'events@djbeats.in', '50K-2L', 4.4, ARRAY['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'], false, false),
('Sound Wave Entertainment', 'dj', 'Premium DJ + live band combo for sangeet nights with custom playlists', 'Delhi', '+91 11 901 2345', 'book@soundwave.in', '1L-4L', 4.6, ARRAY['https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600'], true, false),

('Mehendi by Rajni', 'mehendi_artist', 'Intricate bridal mehendi with traditional Rajasthani & Arabic designs', 'Jaipur', '+91 141 901 2345', 'book@mehendibyrajni.com', '15K-50K', 4.8, ARRAY['https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=600'], false, false),
('Henna Artistry', 'mehendi_artist', 'Modern fusion mehendi designs with glitter and stone embellishments', 'Mumbai', '+91 22 012 3456', 'design@hennaartistry.in', '20K-75K', 4.5, ARRAY['https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=600'], false, true);
