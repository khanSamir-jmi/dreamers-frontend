import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Animation
import { FaPlus, FaBook, FaUsers, FaTrash } from 'react-icons/fa'; // Icons
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchCourses();
    }
  }, [navigate]);

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

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`https://dreamers-backend-i25f.onrender.com/api/courses/${id}`, config);
        toast.success("Course Deleted");
        fetchCourses(); // Refresh list
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  if (loading) return <div className="h-screen bg-slate-900 pt-20"><Loader /></div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <button 
                onClick={() => navigate('/admin/addcourse')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 transition transform hover:-translate-y-1"
            >
                <FaPlus /> Create New Course
            </button>
          </div>

          {/* --- STATS CARDS (Mock Data for now) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
                <div className="bg-blue-900/50 p-4 rounded-xl text-blue-400 text-2xl"><FaBook /></div>
                <div>
                    <h3 className="text-slate-400 text-sm">Total Courses</h3>
                    <p className="text-2xl font-bold text-white">{courses.length}</p>
                </div>
             </div>
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
                <div className="bg-green-900/50 p-4 rounded-xl text-green-400 text-2xl"><FaUsers /></div>
                <div>
                    <h3 className="text-slate-400 text-sm">Total Students</h3>
                    <p className="text-2xl font-bold text-white">1,240+</p> {/* Mock Data */}
                </div>
             </div>
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
                <div className="bg-yellow-900/50 p-4 rounded-xl text-yellow-400 text-2xl">₹</div>
                <div>
                    <h3 className="text-slate-400 text-sm">Total Revenue</h3>
                    <p className="text-2xl font-bold text-white">₹ 4.5L</p> {/* Mock Data */}
                </div>
             </div>
          </div>

          {/* --- COURSE LIST --- */}
          <h2 className="text-xl font-bold text-white mb-6">Manage Courses</h2>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
             {courses.map((course, index) => (
                <motion.div 
                    key={course._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }} // Stagger Effect
                    className="p-5 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-750 transition"
                >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <img src={course.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                            <h3 className="font-bold text-white text-lg">{course.title}</h3>
                            <p className="text-sm text-slate-400">Price: ₹{course.price} | Category: {course.category}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate(`/admin/course/${course._id}/lectures`)}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-lg transition"
                        >
                            Add Lectures
                        </button>
                        <button 
                            onClick={() => deleteHandler(course._id)}
                            className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 text-sm font-bold rounded-lg transition flex items-center gap-2"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </motion.div>
             ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;