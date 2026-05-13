import { Link } from 'react-router-dom';
import { Compass, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-2 space-y-8">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="w-8 h-8 text-gold" />
            <span className="text-3xl font-serif font-bold tracking-tight">Sacred Yatra <span className="text-gold">Co.</span></span>
          </Link>
          <p className="text-gray-500 max-w-sm leading-relaxed italic font-serif">
            "Your spiritual journey is our sacred duty. We bridge the gap between worldliness and divinity with comfort, care, and ancient wisdom."
          </p>
          <div className="flex gap-6 text-gray-400">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif font-bold text-lg">Sacred Paths</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><Link to="/catalog?region=North%20India" className="hover:text-gold transition-colors">North India Circuits</Link></li>
            <li><Link to="/catalog?region=South%20India" className="hover:text-gold transition-colors">South India Temples</Link></li>
            <li><Link to="/catalog?region=Jyotirlinga%20Special" className="hover:text-gold transition-colors">Jyotirlinga Specials</Link></li>
            <li><Link to="/catalog" className="hover:text-gold transition-colors">Custom Pilgrimages</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif font-bold text-lg">Company</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><Link to="/about" className="hover:text-gold transition-colors">Our Philosophy</Link></li>
            <li><Link to="/guides" className="hover:text-gold transition-colors">Verified Guides</Link></li>
            <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Sanctity</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-gray-50 text-center text-xs text-gray-400 font-medium tracking-widest uppercase">
        © 2026 Sacred Yatra Co. • Crafted with Devotion in India
      </div>
    </footer>
  );
}
