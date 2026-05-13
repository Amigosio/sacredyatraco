import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Button } from '../ui/Button';
import { Menu, X, User as UserIcon, LogOut, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="w-8 h-8 text-gold" />
            <span className="text-2xl font-serif font-bold tracking-tight">Sacred Yatra <span className="text-gold">Co.</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="text-gray-600 hover:text-gold transition-colors font-medium">Yatras</Link>
            <Link to="/about" className="text-gray-600 hover:text-gold transition-colors font-medium">Our Path</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-gold transition-colors font-medium">My Travels</Link>
                <div className="h-4 w-px bg-gray-200" />
                <Button id="logout-btn" variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button id="nav-login-btn">Start Journey</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} id="mobile-menu-toggle">
              {isOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/catalog" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-700">Explore Yatras</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-700">About Us</Link>
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-700">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left text-lg font-medium text-red-500">Sign Out</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button id="mobile-login-btn" className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
