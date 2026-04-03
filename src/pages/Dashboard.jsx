import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Animation
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchMyCourses();
    }
  }, [navigate]);

  const fetchMyCourses = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      
      // 1. Fetch Enrolled Courses
      const { data: courses } = await axios.get('https://dreamers-backend-i25f.onrender.com/api/users/mycourses', config);
      
      // 2. Fetch Progress for EACH course
      // We use Promise.all to fetch them all in parallel
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
            try {
                const { data: progressData } = await axios.get(
                    `https://dreamers-backend-i25f.onrender.com/api/courses/progress?courseId=${course._id}`, 
                    config
                );
                
                return {
                    ...course,
                    completedCount: progressData.completedLectures.length,
                    totalLectures: course.lectures?.length || 0,
                    progressPercentage: course.lectures?.length > 0 
                        ? Math.round((progressData.completedLectures.length / course.lectures.length) * 100)
                        : 0
                };
            } catch (err) {
                return { ...course, completedCount: 0, progressPercentage: 0 };
            }
        })
      );

      setMyCourses(coursesWithProgress);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="h-screen bg-slate-900 pt-20"><Loader /></div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-end mb-10"
          >
            <div>
                <h1 className="text-3xl font-bold text-white">My Learning</h1>
                <p className="text-slate-400 mt-2">Welcome back, {user?.name} 👋</p>
            </div>
          </motion.div>

          {/* Purchased Courses Grid */}
          {myCourses.length === 0 ? (
            <div className="bg-slate-800 p-12 rounded-2xl text-center border border-slate-700">
                <h3 className="text-xl text-white font-bold mb-2">You haven't enrolled in any courses yet.</h3>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition mt-4"
                >
                    Explore Courses
                </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {myCourses.map((course) => (
                    <motion.div 
                        key={course._id} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl hover:shadow-cyan-900/20 transition group"
                    >
                        {/* Image Section */}
                        <div className="h-40 overflow-hidden relative">
                             <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                             
                             {/* Play Button Overlay */}
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <button 
                                    onClick={() => navigate(`/course/${course._id}/study`)}
                                    className="bg-white text-slate-900 rounded-full w-14 h-14 flex items-center justify-center text-xl shadow-lg hover:scale-110 transition"
                                >
                                    ▶
                                </button>
                             </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">By {course.createdBy}</p>
                            
                            {/* REAL PROGRESS BAR */}
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>{course.progressPercentage}% Completed</span>
                                <span>{course.completedCount}/{course.totalLectures} Lessons</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progressPercentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full rounded-full ${
                                        course.progressPercentage === 100 
                                        ? 'bg-green-500' 
                                        : 'bg-gradient-to-r from-cyan-400 to-blue-600'
                                    }`}
                                ></motion.div>
                            </div>
                            
                            <button 
                                onClick={() => navigate(`/course/${course._id}/study`)}
                                className="w-full bg-slate-700 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2"
                            >
                                {course.progressPercentage === 100 ? "Review Course" : "Continue Learning"}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Dashboard;