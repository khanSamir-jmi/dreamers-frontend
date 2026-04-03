import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP + New Pass
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://dreamers-backend-i25f.onrender.com/api/users/forgot-password', { email });
      setLoading(false);
      alert("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "User not found");
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://dreamers-backend-i25f.onrender.com/api/users/reset-password', { email, otp, newPassword });
      setLoading(false);
      alert("Password Reset Successfully! Please Login.");
      navigate('/login');
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Reset Password</h2>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-slate-400">Enter your Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 outline-none" />
              </div>
              <button disabled={loading} className="w-full bg-cyan-600 text-white py-3 rounded font-bold hover:bg-cyan-500">
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
               <p className="text-slate-400 text-sm text-center">OTP sent to {email}</p>
              <div>
                <label className="text-slate-400">Enter OTP</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 outline-none text-center tracking-widest" />
              </div>
              <div>
                <label className="text-slate-400">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full bg-slate-900 text-white p-3 rounded mt-1 border border-slate-700 outline-none" />
              </div>
              <button disabled={loading} className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-500">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;