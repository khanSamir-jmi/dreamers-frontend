import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        'https://dreamers-backend-i25f.onrender.com/api/users/profile',
        { name, email, password },
        config
      );

      setLoading(false);
      localStorage.setItem('userInfo', JSON.stringify(data)); // Update local storage
      alert("Profile Updated Successfully!");
      
    } catch (error) {
      setLoading(false);
      console.error(error);
      setMessage('Update Failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 px-4 flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">User Profile</h1>

            {message && (
              <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-center border border-red-500/50">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-slate-400 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-slate-400 mb-2">New Password (Optional)</label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-slate-400 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password"
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:-translate-y-1"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;