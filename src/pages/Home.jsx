import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { motion } from 'framer-motion'; // 

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('https://dreamers-backend-i25f.onrender.com/api/courses');
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      
      {/* --- HERO SECTION WITH ANIMATION --- */}
      <div className="bg-slate-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Potential</span>
          </h1>
          <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Learn from the best. Master industry-relevant skills in coding, design, and business with our premium courses.
          </p>
          
          {/* SEARCH BAR ANIMATED */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <input 
              type="text"
              placeholder="Search for 'React', 'Python', or 'Design'..."
              className="relative w-full bg-slate-800 text-white border border-slate-700 rounded-xl py-4 px-6 focus:outline-none focus:border-cyan-500 placeholder-slate-500 text-lg shadow-2xl transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-4 right-5 text-slate-500 text-xl">🔍</div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- COURSE GRID --- */}
      <div className="bg-slate-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-cyan-500 pl-4">
            {searchTerm ? `Results for "${searchTerm}"` : "Featured Courses"}
          </h2>

          {loading ? (
            <Loader />
          ) : filteredCourses.length === 0 ? (
            <div className="text-center text-slate-500 py-20">
              <p className="text-2xl">No courses found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm("")} className="mt-4 text-cyan-400 hover:underline">Clear Search</button>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 } // Cards ek ke baad ek aayenge
                }
              }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCourses.map((course) => (
                <motion.div 
                  key={course._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.03 }} // Hover karne par card uthega
                  className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:shadow-2xl hover:shadow-cyan-900/30 transition duration-300 group cursor-pointer"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-slate-900/90 backdrop-blur text-cyan-400 text-xs font-bold rounded-full border border-slate-700 shadow-lg">
                            {course.category}
                        </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4 border-t border-slate-800 pt-4">
                        <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Price</span>
                            <div className="text-2xl font-bold text-white">₹{course.price}</div>
                        </div>
                        <button className="px-5 py-2 bg-slate-800 text-cyan-400 font-bold rounded-lg group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-lg">
                            View Details
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
};

export default Home;