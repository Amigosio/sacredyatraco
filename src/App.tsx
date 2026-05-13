import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Toaster } from 'react-hot-toast';

// Layout
import { Navbar } from './components/layout/Navbar';
import { SpiritualGuide } from './components/chat/SpiritualGuide';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { PackageDetail } from './pages/PackageDetail';
import { AuthPage } from './pages/AuthPage';
import { BookingPage } from './pages/BookingPage';
import { DashboardPage } from './pages/DashboardPage';
import { Footer } from './components/layout/Footer';

function ProtectedRoute({ children, user }: { children: React.ReactNode; user: User | null | undefined }) {
  if (user === undefined) return <div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
}

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-sacred-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/book/:packageId" element={
              <ProtectedRoute user={user}><BookingPage /></ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute user={user}><DashboardPage /></ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <SpiritualGuide />
        <Toaster position="bottom-left" />
      </div>
    </Router>
  );
}
