import { useParams, Link, useNavigate } from 'react-router-dom';
import { FEATURED_PACKAGES } from '../constants';
import { formatPrice, cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Calendar, MapPin, Clock, ArrowLeft, Info, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = FEATURED_PACKAGES.find(p => p.id === id);

  if (!pkg) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-serif">Path Not Found</h2>
      <Link to="/catalog"><Button id="back-to-catalog">Back to Catalog</Button></Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gold transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Imagery and Itinerary */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] relative"
          >
            <img 
              src={pkg.imageUrl} 
              alt={pkg.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Divine Experience</span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-gold" />
              <h3 className="text-3xl font-serif font-bold text-gray-900 line-height-none">The Sacred Timeline</h3>
            </div>
            <div className="space-y-0 relative ml-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gold/20" />
              {pkg.itinerary.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-10 pb-12 last:pb-0"
                >
                  <div className="absolute left-[-5px] top-2 w-[10px] h-[10px] rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <span className="text-gold font-bold text-xs uppercase tracking-widest mb-1 block">Day {item.day}</span>
                    <p className="text-gray-700 font-medium leading-relaxed">{item.activity}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info and Pricing */}
        <div className="space-y-10 lg:sticky lg:top-32 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold uppercase tracking-[0.3em] font-bold text-[10px]">
                <MapPin className="w-3 h-3" /> {pkg.region}
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold leading-[1.1]">{pkg.title}</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed italic font-serif">
               "{pkg.description}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gold/5 p-6 rounded-3xl border border-gold/10">
              <Clock className="w-6 h-6 text-gold mb-3" />
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Duration</p>
              <p className="text-2xl font-serif font-bold text-gray-900">{pkg.duration}</p>
            </div>
            <div className="bg-gold/5 p-6 rounded-3xl border border-gold/10">
              <Calendar className="w-6 h-6 text-gold mb-3" />
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Starting From</p>
              <p className="text-2xl font-serif font-bold text-gray-900">{formatPrice(pkg.price)}</p>
            </div>
          </div>

          <div className="space-y-4 bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-50">
            <h4 className="text-xl font-serif font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-gold" /> Divine Inclusions
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.inclusions.map((inc, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm font-medium">{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <Link to={`/book/${pkg.id}`}>
              <Button id="book-now-btn" size="lg" className="w-full py-6 text-xl shadow-2xl shadow-gold/30">
                Begin Your Pilgrimage
              </Button>
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4 font-medium tracking-wide">
              Secure payments powered by Sacred Trust™
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
