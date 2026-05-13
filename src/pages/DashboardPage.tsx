import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Booking } from '../types';
import { formatPrice, formatDate, cn } from '../lib/utils';
import { Compass, MapPin, Calendar, Clock, ChevronRight, Activity, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!auth.currentUser) return;
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', auth.currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
        setBookings(data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gold uppercase tracking-[0.3em] font-bold text-[10px]">
            <Compass className="w-4 h-4" /> Pilgrim Dashboard
          </div>
          <h1 className="text-5xl font-serif font-bold">My Divine <span className="italic">Yatras</span></h1>
          <p className="text-gray-500">Peace be with you, {auth.currentUser?.displayName || 'Seeker'}.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 text-center space-y-8 shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mx-auto">
            <Compass className="w-12 h-12 text-gold opacity-30" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-serif font-bold text-gray-900">No journeys started yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Your spiritual path is waiting to be discovered. Start by exploring our sacred circuits.</p>
          </div>
          <Link to="/catalog">
            <button className="bg-gold text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-gold/20 hover:scale-105 transition-all">
              Discover Yatras
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {bookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50 border border-gray-100 flex flex-col md:flex-row"
            >
              <div className="p-10 flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                      booking.status === 'confirmed' ? "bg-green-50 text-green-600" : "bg-gold/10 text-gold"
                    )}>
                      {booking.status}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{booking.packageName}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Contribution</p>
                    <p className="text-2xl font-serif font-bold text-gray-900">{formatPrice(booking.totalPrice)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-y border-gray-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Journey Date</p>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4 text-gold" />
                      {booking.date}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pilgrims</p>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Users className="w-4 h-4 text-gold" />
                      {booking.numPilgrims} Souls
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Booking ID</p>
                    <div className="flex items-center gap-2 text-gray-600 font-mono text-xs">
                      #{booking.id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Next Step</p>
                    <div className="flex items-center gap-2 text-gold font-bold text-sm">
                      <Activity className="w-4 h-4 animate-pulse" />
                      Coordinator Callback
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex -space-x-2">
                    {booking.travelerDetails.map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gold text-white flex items-center justify-center text-[10px] font-bold">
                        {_?.name?.charAt(0) || 'P'}
                      </div>
                    ))}
                  </div>
                  <button className="text-gold font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    View full details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
