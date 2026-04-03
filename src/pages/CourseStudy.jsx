import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlayCircle, FaCheckCircle } from 'react-icons/fa'; // Icons
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast'; // Toast notifications

const CourseStudy = () => {
  const { id } = useParams(); // Course ID
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(0);
  
  // Progress State: List of completed lecture IDs
  const [completedLectures, setCompletedLectures] = useState([]);

  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }
    fetchCourseAndProgress();
  }, [id, user, navigate]);

  const fetchCourseAndProgress = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      // 1. Fetch Course Data
      const { data: courseData } = await axios.get(`https://dreamers-backend-i25f.onrender.com/api/courses/${id}`, config);
      setCourse(courseData);

      // 2. Fetch User's Progress for this course
      const { data: progressData } = await axios.get(`https://dreamers-backend-i25f.onrender.com/api/courses/progress?courseId=${id}`, config);
      setCompletedLectures(progressData.completedLectures);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // --- Mark as Completed Logic ---
  const markAsCompleted = async (lectureId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      // Backend call
      await axios.post(`https://dreamers-backend-i25f.onrender.com/api/courses/progress?courseId=${id}&lectureId=${lectureId}`, {}, config);
      
      // Frontend State Update (Instant Feedback)
      if (!completedLectures.includes(lectureId)) {
        setCompletedLectures([...completedLectures, lectureId]);
        toast.success("Lesson Completed! 🎉");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="h-screen bg-slate-900 pt-20"><Loader /></div>;
  
  const lectures = course?.lectures || []; 

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-20 flex flex-col md:flex-row overflow-hidden">
        
        {/* --- LEFT: VIDEO PLAYER --- */}
        <div className="flex-1 bg-black flex flex-col relative">
           {lectures.length > 0 ? (
             <div className="relative w-full h-[50vh] md:h-[75vh]">
                <video 
                    key={lectures[currentLecture]._id}
                    src={lectures[currentLecture].videoUrl}
                    controls
                    className="w-full h-full object-contain bg-black"
                    controlsList="nodownload"
                    // Optional: Video khatam hone par apne aap complete mark karein
                    onEnded={() => markAsCompleted(lectures[currentLecture]._id)}
                ></video>
             </div>
           ) : (
             <div className="h-96 flex items-center justify-center text-white">No lectures yet.</div>
           )}

           <div className="p-6 text-white bg-slate-900 flex justify-between items-start border-t border-slate-800">
              <div>
                  <h1 className="text-2xl font-bold mb-2">
                     {lectures.length > 0 ? lectures[currentLecture].title : course.title}
                  </h1>
                  <p className="text-slate-400">{course.description}</p>
              </div>
              
              {/* Manual Mark Complete Button */}
              {lectures.length > 0 && (
                <button 
                  onClick={() => markAsCompleted(lectures[currentLecture]._id)}
                  className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 ${
                    completedLectures.includes(lectures[currentLecture]._id)
                    ? 'bg-green-600/20 text-green-400 border border-green-500'
                    : 'bg-slate-700 hover:bg-cyan-600 text-white'
                  }`}
                >
                  {completedLectures.includes(lectures[currentLecture]._id) ? (
                    <> <FaCheckCircle /> Completed </>
                  ) : (
                    "Mark as Done"
                  )}
                </button>
              )}
           </div>
        </div>

        {/* --- RIGHT: PLAYLIST --- */}
        <div className="w-full md:w-96 bg-slate-800 border-l border-slate-700 flex flex-col h-[50vh] md:h-[calc(100vh-80px)]">
           <div className="p-4 border-b border-slate-700 bg-slate-800 z-10">
              <h2 className="text-lg font-bold text-white">Course Content</h2>
              
              {/* Progress Bar in Sidebar */}
              <div className="mt-3">
                 <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{completedLectures.length} / {lectures.length} Completed</span>
                    <span>{Math.round((completedLectures.length / lectures.length) * 100)}%</span>
                 </div>
                 <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div 
                        className="bg-green-500 h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${(completedLectures.length / lectures.length) * 100}%` }}
                    ></div>
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              {lectures.map((lecture, index) => {
                 const isCompleted = completedLectures.includes(lecture._id);
                 const isActive = currentLecture === index;

                 return (
                 <div 
                    key={index}
                    onClick={() => setCurrentLecture(index)}
                    className={`p-4 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                        isActive 
                        ? 'bg-cyan-600/20 border border-cyan-500/50' 
                        : 'bg-slate-900 hover:bg-slate-700 border border-transparent'
                    }`}
                 >
                    <div className={`text-xl ${isActive ? 'text-cyan-400' : isCompleted ? 'text-green-500' : 'text-slate-500'}`}>
                        {isActive ? <FaPlayCircle /> : <FaCheckCircle />} 
                    </div>
                    <div>
                        <h4 className={`text-sm font-semibold ${isActive ? 'text-white' : isCompleted ? 'text-slate-400 line-through decoration-slate-600' : 'text-slate-300'}`}>
                            Lecture {index + 1}: {lecture.title}
                        </h4>
                        <span className="text-xs text-slate-500">10:00 mins</span>
                    </div>
                 </div>
              )})}
           </div>
        </div>

      </div>
    </>
  );
};

export default CourseStudy;