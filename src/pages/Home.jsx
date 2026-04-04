import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { 
  Search, Star, Clock, BarChart, Play, ArrowRight, 
  Shield, Zap, Users, CheckCircle, Code, Monitor, Database, Layout, Mail
} from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  // Categories for the filter pills
  const categories = ["All", "Web Dev", "App Dev", "Data Science", "Design"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('https://dreamers-backend-i25f.onrender.com/api/courses');
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Enhanced Filtering Logic (Search + Category)
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // --- REUSABLE ANIMATION VARIANTS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30">
      <Navbar />
      
      {/* ==========================================
          1. ENHANCED HERO SECTION
      ========================================== */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <span className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md text-cyan-400 text-sm font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <Zap size={16} className="text-yellow-400 fill-yellow-400" />
              Empowering 100k+ Dreamers Globally
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Code Your Way To <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-sm">
              The Future
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Master industry-relevant skills in full-stack development, DSA, and design with our premium, project-based courses tailored for your success.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Courses <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-xl bg-slate-900/50 border border-slate-700 backdrop-blur-md text-white font-bold text-lg hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 group">
              <Play size={20} className="text-cyan-400 group-hover:fill-cyan-400 transition-all" /> Watch Demo
            </button>
          </motion.div>

          {/* Floating Tech Stack Icons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 opacity-60">
            {[<Code/>, <Monitor/>, <Database/>, <Layout/>].map((icon, index) => (
              <motion.div 
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shadow-xl"
              >
                {icon}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ==========================================
          2. PLATFORM STATISTICS
      ========================================== */}
      <div className="border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100k+", label: "Happy Learners" },
              { value: "500+", label: "Hours of Content" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "24/7", label: "Doubt Support" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-cyan-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          3 & 4. UPGRADED COURSE GRID & FILTERS
      ========================================== */}
      <div id="courses" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skill Paths</span>
              </h2>
              <p className="text-slate-400 text-lg">Choose what you want to master today.</p>
            </div>

            {/* Interactive Search Bar */}
            <div className="relative max-w-md w-full group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-slate-500" size={20} />
                <input 
                  type="text"
                  placeholder="Search courses..."
                  className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid Layout */}
          {loading ? (
            // Skeleton Loader
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-slate-900 rounded-2xl h-[450px] animate-pulse border border-slate-800">
                  <div className="h-52 bg-slate-800 rounded-t-2xl"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                    <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                    <div className="pt-4 flex justify-between">
                      <div className="h-8 bg-slate-800 rounded w-1/3"></div>
                      <div className="h-8 bg-slate-800 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center bg-slate-900/50 border border-slate-800 rounded-2xl py-20 backdrop-blur-sm">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-2xl text-white font-bold">No courses found</p>
              <p className="text-slate-400 mt-2">Try adjusting your search or category filter.</p>
              <button onClick={() => {setSearchTerm(""); setActiveCategory("All");}} className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition">Clear Filters</button>
            </div>
          ) : (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCourses.map((course) => (
                <motion.div 
                  key={course._id} variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] transition duration-300 group cursor-pointer flex flex-col h-full"
                >
                  {/* Card Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                    
                    {/* Bestseller Badge (Mock Logic based on price or hardcoded) */}
                    {course.price > 1000 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                        Bestseller
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-cyan-400 text-xs font-bold rounded-md border border-slate-700 uppercase tracking-wider">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Mock Stats */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
                      <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500"/> 4.8</span>
                      <span className="flex items-center gap-1"><Clock size={14}/> {course.duration || "40+ Hrs"}</span>
                      <span className="flex items-center gap-1"><BarChart size={14}/> {course.level || "Beginner to Pro"}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-1">
                      {course.description}
                    </p>
                    
                    {/* Card Footer */}
                    <div className="flex justify-between items-end pt-4 border-t border-slate-800/80 mt-auto">
                      <div>
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold block mb-1">Price</span>
                        <div className="text-2xl font-black text-white">₹{course.price}</div>
                      </div>
                      <button className="px-5 py-2.5 bg-slate-800/80 text-cyan-400 font-bold rounded-xl group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-md">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ==========================================
          5. WHY CHOOSE US / FEATURES
      ========================================== */}
      <div className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Dreamers <span className="text-cyan-400">Advantage</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Why thousands of students trust us with their career transformation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={32}/>, title: "Industry Grade Projects", desc: "Build real-world applications that make your resume stand out to top recruiters." },
              { icon: <Users size={32}/>, title: "1-on-1 Expert Mentorship", desc: "Get your doubts resolved instantly by FAANG engineers and industry veterans." },
              { icon: <CheckCircle size={32}/>, title: "Lifetime Access", desc: "Learn at your own pace. Once enrolled, the content is yours forever." }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          6. BOTTOM CTA BANNER
      ========================================== */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decals */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-cyan-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Join the community of developers who are building the future. Your first step towards a massive career upgrade starts here.
          </p>
          <button onClick={() => navigate('/register')} className="relative z-10 bg-white text-blue-700 font-extrabold text-lg px-10 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300">
            Sign Up For Free
          </button>
        </motion.div>
      </div>

      {/* ==========================================
          7. FOOTER
      ========================================== 
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="text-cyan-500"/> Dreamers
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Empowering students to achieve their tech dreams through quality, project-driven education.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition">All Courses</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <p className="text-slate-500 text-sm mb-4">Subscribe to our newsletter for the latest tech trends.</p>
              <div className="flex bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full px-4 text-sm text-white focus:outline-none"/>
                <button className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-white transition"><Mail size={18}/></button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 text-center text-slate-600 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Dreamers Academy. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed with ❤️ for Future Developers</p>
          </div>
        </div>
      </footer>*/}
    </div>
  );
};

export default Home;