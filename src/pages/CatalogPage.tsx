import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PACKAGES, REGIONS } from '../constants';
import { formatPrice, cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { MapPin, Clock, Star, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CatalogPage() {
  const [selectedRegion, setSelectedRegion] = useState('All Paths');

  const filteredPackages = selectedRegion === 'All Paths' 
    ? FEATURED_PACKAGES 
    : FEATURED_PACKAGES.filter(p => p.region === selectedRegion);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-serif font-bold">Divine Expeditions</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Explore our curated spiritual circuits across the length and breadth of the sacred land.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={cn(
              "px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300",
              selectedRegion === region 
                ? "bg-gold border-gold text-white shadow-lg shadow-gold/20 translate-y-[-2px]" 
                : "bg-white border-gray-100 text-gray-600 hover:border-gold/50"
            )}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredPackages.map((pkg) => (
            <motion.div
              layout
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-100/50 border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-6 text-white">
                  <div className="flex items-center gap-1 text-gold mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Top Rated</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold">{pkg.title}</h3>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-tighter bg-gold/5 text-gold px-2 py-1 rounded">
                        {inc}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 italic">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      {pkg.region}
                    </div>
                  </div>
                  <Link to={`/package/${pkg.id}`}>
                    <Button id={`cat-btn-${pkg.id}`} variant="primary" size="sm" className="shadow-gold/20">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <p className="text-2xl font-serif text-gray-400">No paths found in this region.</p>
          <Button id="reset-filter" variant="ghost" onClick={() => setSelectedRegion('All Paths')}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
