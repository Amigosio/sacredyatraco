import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FEATURED_PACKAGES } from '../constants';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function BookingPage() {
  const { packageId } = useParams();
  const pkg = FEATURED_PACKAGES.find(p => p.id === packageId);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    numPilgrims: 1,
    travelerDetails: [{ name: '', age: '', gender: 'male' }]
  });

  if (!pkg) return <div>Package not found</div>;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleTravelerChange = (idx: number, field: string, value: string) => {
    const newDetails = [...formData.travelerDetails];
    newDetails[idx] = { ...newDetails[idx], [field]: value };
    setFormData({ ...formData, travelerDetails: newDetails });
  };

  const addTraveler = () => {
    setFormData({
      ...formData,
      numPilgrims: formData.numPilgrims + 1,
      travelerDetails: [...formData.travelerDetails, { name: '', age: '', gender: 'male' }]
    });
  };

  const removeTraveler = (idx: number) => {
    if (formData.numPilgrims === 1) return;
    const newDetails = formData.travelerDetails.filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      numPilgrims: formData.numPilgrims - 1,
      travelerDetails: newDetails
    });
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        packageId: pkg.id,
        packageName: pkg.title,
        date: formData.date,
        numPilgrims: formData.numPilgrims,
        totalPrice: pkg.price * formData.numPilgrims,
        status: 'pending',
        travelerDetails: formData.travelerDetails,
        createdAt: serverTimestamp()
      });
      toast.success("Divine Booking Initiated!");
      setStep(4);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Stepper */}
      {step < 4 && (
        <div className="mb-12 flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-100 z-0" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500",
                step >= s ? "bg-gold text-white shadow-lg shadow-gold/30" : "bg-white border-2 border-gray-100 text-gray-300"
              )}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold">Select Date</h2>
              <p className="text-gray-500">When do you wish to embark on this journey?</p>
            </div>
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Divine Journey Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/50" 
                />
              </div>
            </div>
            <Button id="step1-next" className="w-full py-4 text-lg" disabled={!formData.date} onClick={handleNext}>
              Next Step <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold">Pilgrim Details</h2>
              <p className="text-gray-500">Add information for all fellow travelers.</p>
            </div>
            
            <div className="space-y-6">
              {formData.travelerDetails.map((traveler, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-3xl space-y-4 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">Pilgrim {idx + 1}</span>
                    {idx > 0 && <button onClick={() => removeTraveler(idx)} className="text-xs text-red-400 font-bold">Remove</button>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      value={traveler.name}
                      onChange={(e) => handleTravelerChange(idx, 'name', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-none rounded-xl focus:ring-1 focus:ring-gold"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Age"
                        value={traveler.age}
                        onChange={(e) => handleTravelerChange(idx, 'age', e.target.value)}
                        className="w-20 px-4 py-3 bg-white border-none rounded-xl focus:ring-1 focus:ring-gold"
                      />
                      <select 
                        value={traveler.gender}
                        onChange={(e) => handleTravelerChange(idx, 'gender', e.target.value)}
                        className="flex-1 px-4 py-3 bg-white border-none rounded-xl focus:ring-1 focus:ring-gold"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <Button id="add-traveler-btn" variant="outline" className="w-full border-dashed" onClick={addTraveler}>
                + Add Another Pilgrim
              </Button>
            </div>

            <div className="flex gap-4">
              <Button id="step2-back" variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 w-5 h-5" /> Back</Button>
              <Button id="step2-next" className="flex-1" onClick={handleNext}>Review Summary</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl space-y-8"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold">Review Your Path</h2>
              <div className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest">{pkg.title}</div>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Divine Journey Date</span>
                <span className="font-bold">{formData.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Pilgrims</span>
                <span className="font-bold">{formData.numPilgrims} Seeking Spirits</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between items-end">
                <span className="text-gray-400">Total Contribution</span>
                <span className="text-3xl font-serif font-bold text-gold">{formatPrice(pkg.price * formData.numPilgrims)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button id="step3-back" variant="ghost" onClick={handleBack} disabled={loading}>Back</Button>
              <Button id="step3-confirm" className="flex-1" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Communing with Servers...' : 'Confirm Sacred Booking'}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 rounded-[3rem] shadow-2xl text-center space-y-8"
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-serif font-bold">Dhanyavaad!</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Your spiritual path is being prepared. <br />
              A journey coordinator will reach out to you within 24 hours.
            </p>
            <div className="pt-6 flex flex-col gap-4">
              <Button id="go-to-dashboard" size="lg" onClick={() => navigate('/dashboard')}>View My Travels</Button>
              <Button id="go-home" variant="ghost" onClick={() => navigate('/')}>Home</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
