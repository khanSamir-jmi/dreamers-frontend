import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import Toast for beautiful alerts

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Show Loading Toast (Stores ID to update it later)
    const toastId = toast.loading('Logging in...');

    try {
      const { data } = await axios.post('https://dreamers-backend-i25f.onrender.com/api/users/login', {
        email: email.toLowerCase(), // Ensure email is lowercase
        password,
      });

      // Save user data
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // 2. Update Toast to Success
      toast.success(`Welcome back, ${data.name}!`, { id: toastId });
      
      setLoading(false);
      navigate('/');
    } catch (error) {
      // 3. Update Toast to Error
      toast.error(error.response?.data?.message || "Invalid Email or Password", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-slate-400 text-sm font-medium mb-2 block">Email Address</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email"
                className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition" 
            />
          </div>
          
          <div>
            <label className="text-slate-400 text-sm font-medium mb-2 block">Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Enter your password"
                className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition" 
            />
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-cyan-500/20 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-slate-400 hover:text-white transition">Forgot Password?</Link>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-400">
            New here? <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
