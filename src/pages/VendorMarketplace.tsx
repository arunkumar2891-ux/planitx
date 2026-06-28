import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Award, Sparkles, Phone, Mail, Globe, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import PageWrapper from '@/components/layout/PageWrapper'
import { useStore } from '@/lib/store'
import type { Vendor } from '@/types'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'hall', label: 'Wedding Halls' },
  { id: 'caterer', label: 'Caterers' },
  { id: 'photographer', label: 'Photographers' },
  { id: 'makeup_artist', label: 'Makeup Artists' },
  { id: 'decorator', label: 'Decorators' },
  { id: 'dj', label: 'DJs' },
  { id: 'mehendi_artist', label: 'Mehendi' },
]

function ContactModal({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
        <div className="relative h-48 bg-gray-100">
          <img
            src={vendor.photos[0]}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-display font-bold text-primary">{vendor.name}</h2>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-amber-700">{vendor.rating}</span>
            </div>
          </div>
          <p className="text-xs text-muted mb-4">{vendor.description}</p>

          <div className="space-y-2.5 mb-5">
            {vendor.phone && (
              <a href={`tel:${vendor.phone}`} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Phone size={18} className="text-primary" />
                <div>
                  <p className="text-[10px] text-muted">Phone</p>
                  <p className="text-sm font-medium text-primary">{vendor.phone}</p>
                </div>
              </a>
            )}
            {vendor.email && (
              <a href={`mailto:${vendor.email}`} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Mail size={18} className="text-primary" />
                <div>
                  <p className="text-[10px] text-muted">Email</p>
                  <p className="text-sm font-medium text-primary">{vendor.email}</p>
                </div>
              </a>
            )}
            {vendor.website && (
              <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Globe size={18} className="text-primary" />
                <div>
                  <p className="text-[10px] text-muted">Website</p>
                  <p className="text-sm font-medium text-primary">{vendor.website}</p>
                </div>
              </a>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted mb-4">
            <span className="flex items-center gap-1"><MapPin size={12} /> {vendor.city}</span>
            <span className="font-semibold text-accent text-sm">₹{vendor.price_range}</span>
          </div>

          <div className="flex gap-3">
            <a href={`tel:${vendor.phone}`} className="flex-1 py-3 accent-gradient text-white text-sm font-semibold rounded-xl text-center">
              Call Now
            </a>
            <a href={`https://wa.me/${vendor.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl text-center">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VendorMarketplace() {
  const { vendors } = useStore()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  const filtered = activeCategory === 'all'
    ? vendors
    : vendors.filter((v) => v.category === activeCategory)

  return (
    <>
      <PageWrapper>
        <Header title="Vendor Marketplace" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-4 space-y-4">
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-muted hover:border-primary-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Vendor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="bg-white border border-border rounded-2xl shadow-card overflow-hidden h-full flex flex-col hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={vendor.photos[0]}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      {vendor.is_featured && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-primary text-white text-[10px] font-semibold rounded-full">
                          <Award size={10} /> Featured
                        </span>
                      )}
                      {vendor.is_sponsored && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-accent text-white text-[10px] font-semibold rounded-full">
                          <Sparkles size={10} /> Sponsored
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-sm md:text-base font-semibold text-primary line-clamp-1 mr-2">{vendor.name}</h3>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-medium text-primary">{vendor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 mb-3 flex-1">{vendor.description}</p>
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="flex items-center gap-1 text-xs text-muted whitespace-nowrap">
                          <MapPin size={12} /> {vendor.city}
                        </span>
                        <span className="text-xs font-semibold text-accent whitespace-nowrap">₹{vendor.price_range}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedVendor(vendor)
                        }}
                        className="flex-shrink-0 px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-600 active:scale-95 transition-all"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageWrapper>

      {selectedVendor && createPortal(
        <ContactModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />,
        document.body
      )}
    </>
  )
}
