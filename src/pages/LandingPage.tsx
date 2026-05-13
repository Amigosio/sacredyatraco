import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FEATURED_PACKAGES } from '../constants';
import { formatPrice } from '../lib/utils';
import { Search, MapPin, Calendar, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function LandingPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544735745-b40348704044?q=80&w=2500&auto=format" 
            alt="Sacred Mountains" 
            className="w-full h-full object-cover brightness-75 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sacred-white via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-gold uppercase tracking-[0.4em] font-medium text-sm">Divine Pilgrimages For the Soul</span>
            <h1 className="text-6xl md:text-8xl text-white font-serif font-bold leading-tight drop-shadow-lg">
              Find Your <br /> <span className="italic">Spiritual Path</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-2 rounded-full border border-white/20 flex gap-2"
          >
            <div className="flex-1 flex items-center px-6">
              <Search className="w-5 h-5 text-white/70" />
              <input 
                type="text" 
                placeholder="Where does your soul seek peace? (e.g. Kedarnath, Varanasi)" 
                className="w-full bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0 text-lg ml-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button id="hero-search-btn" onClick={() => navigate('/catalog')} className="bg-gold hover:bg-gold/90 border-none px-8">
              Explore
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-xl font-serif font-bold">Verified Guides</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Every Yatra is accompanied by scholarly guides who understand the deep history and rituals.</p>
        </div>
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-xl font-serif font-bold">Premium Comfort</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Pristine stays and sattvic meals, ensuring your focus remains entirely on the spiritual journey.</p>
        </div>
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-xl font-serif font-bold">Sacred Access</h3>
          <p className="text-gray-600 text-sm leading-relaxed">VIP Darshan arrangements and curated ritual sessions at the most revered shrines.</p>
        </div>
      </section>

      {/* Featured Packs */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif font-bold">Featured Sacred Circuits</h2>
            <p className="text-gray-500">Handpicked journeys for a transformative experience</p>
          </div>
          <Link to="/catalog">
            <Button id="view-all-yatras" variant="outline">View All Paths</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURED_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gold uppercase tracking-wider">
                  {pkg.region}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-serif font-bold group-hover:text-gold transition-colors">{pkg.title}</h3>
                  <div className="text-right">
                    <span className="block text-xl font-bold text-gray-900">{formatPrice(pkg.price)}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{pkg.duration}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {pkg.description}
                </p>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${pkg.id}${i}`} alt="Traveler" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">
                      +12k
                    </div>
                  </div>
                  <Link to={`/package/${pkg.id}`}>
                    <Button id={`view-pkg-${pkg.id}`} variant="ghost" size="sm" className="group/btn">
                      Details <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gold/5 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold">Voices of the Pilgrims</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {[
              {
                text: "The Char Dham Yatra with Sacred Yatra Co. was life-changing. From the VIP Darshans to the meticulous planning, everything was divine.",
                author: "Ananya Sharma",
                role: "Spiritual Blogger"
              },
              {
                text: "The peace I found in Varanasi is indescribable. Their Spiritual Guide (AI) answered my 2 AM questions about ritual timings perfectly!",
                author: "Vikram Malhotra",
                role: "Entrepreneur"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm space-y-6">
                <div className="flex gap-1 text-gold">
                  {[1, 2, 3, 4, 5].map(j => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg text-gray-700 italic font-serif leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20" />
                  <div>
                    <p className="font-bold">{t.author}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
