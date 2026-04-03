import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // User data check karein (Login hone par data localStorage mein hota hai)
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
             <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-cyan-500/20">D</div>
             <span>Dreamer<span className="text-cyan-500">'s</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-300 hover:text-cyan-400 font-medium transition">Home</Link>
            <Link to="/courses" className="text-slate-300 hover:text-cyan-400 font-medium transition">Courses</Link>
            <Link to="/about" className="text-slate-300 hover:text-cyan-400 font-medium transition">About</Link>
            
            {/* STRICT ADMIN CHECK: Sirf Admin ko '+ Add Course' dikhega */}
            {user && user.isAdmin && (
              <Link to="/admin/addcourse" className="text-purple-400 hover:text-purple-300 font-bold transition">
                + Add Course
              </Link>
            )}
          </div>

          {/* User Profile / Login Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-white font-medium">Hi, {user.name}</span>
                  
                  <div className="flex gap-3 text-xs mt-1">
                    {/* AGAR ADMIN HAI TO 'ADMIN DASHBOARD' DIKHAO */}
                    {user.isAdmin ? (
                      <Link to="/admin/dashboard" className="text-purple-400 hover:text-white transition font-bold">
                        Admin Dashboard
                      </Link>
                    ) : (
                      /* AGAR STUDENT HAI TO 'MY LEARNING' DIKHAO */
                      <Link to="/dashboard" className="text-cyan-400 hover:text-white transition font-bold">
                        My Learning
                      </Link>
                    )}
                    
                    <span className="text-slate-600">|</span>
                    <Link to="/profile" className="text-slate-400 hover:text-white transition">Profile</Link>
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-bold rounded-lg hover:bg-red-600/20 hover:text-red-400 transition border border-slate-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-white font-bold hover:text-cyan-400 transition">Log in</Link>
                <Link to="/register" className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;