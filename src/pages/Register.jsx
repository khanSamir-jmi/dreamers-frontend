import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // ✨ Import Toast

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  // Step 1: Send OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Loading Toast
    const toastId = toast.loading('Sending OTP...');

    try {
      await axios.post('https://dreamers-backend-i25f.onrender.com/api/users', { 
        name, 
        email: email.toLowerCase(), 
        password 
      });
      
      setLoading(false);
      
      // 2. Success Toast
      toast.success("OTP sent to your email!", { id: toastId });
      setStep(2);

    } catch (error) {
      setLoading(false);
      // 3. Error Toast
      toast.error(error.response?.data?.message || "Error sending OTP", { id: toastId });
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Loading Toast
    const toastId = toast.loading('Verifying & Creating Account...');
    
    try {
      const { data } = await axios.post('https://dreamers-backend-i25f.onrender.com/api/users/verify-register', {
        name, 
        email: email.toLowerCase(), 
        password, 
        otp: otp.trim() 
      });
      
      setLoading(false);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // 2. Success Toast
      toast.success("Registration Successful! Welcome.", { id: toastId });
      
      navigate('/');
    } catch (error) {
      setLoading(false);
      // 3. Error Toast
      toast.error(error.response?.data?.message || "Invalid OTP", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {step === 1 ? "Create Account" : "Verify OTP"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-slate-400">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 focus:border-cyan-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-slate-400">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 focus:border-cyan-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-slate-400">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 focus:border-cyan-500 outline-none" 
              />
            </div>
            <button 
                disabled={loading} 
                className="w-full bg-cyan-600 text-white py-3 rounded font-bold hover:bg-cyan-500 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
             <p className="text-slate-400 text-sm text-center">OTP sent to {email}</p>
             <div>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter 6-digit OTP" 
                required 
                className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 focus:border-cyan-500 outline-none text-center text-xl tracking-widest" 
              />
            </div>
            
            <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-500 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Sign Up"}
            </button>
            
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="w-full text-slate-500 mt-2 text-sm hover:text-white transition"
            >
              Back to Details
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-slate-400">Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;