import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const AddLecture = () => {
  const { id } = useParams(); // Course ID
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  
  const [courseTitle, setCourseTitle] = useState('');
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // 1. Fetch Course Details (To show current lectures)
  const fetchCourse = async () => {
    try {
      const { data } = await axios.get(`https://dreamers-backend-i25f.onrender.com/api/courses/${id}`);
      setCourseTitle(data.title);
      setLectures(data.lectures); // Existing videos
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  // 2. Handle Form Submit (Add New Video)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(`https://dreamers-backend-i25f.onrender.com/api/courses/${id}/lectures`, {
        title,
        description,
        videoUrl
      }, config);

      alert("Video Added Successfully!");
      
      // Clear Form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setLoadingBtn(false);

      // Refresh List
      fetchCourse(); 

    } catch (error) {
      console.error(error);
      alert("Failed to add video.");
      setLoadingBtn(false);
    }
  };

  if (loading) return <div className="h-screen bg-slate-900 pt-20"><Loader /></div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* LEFT: Add Video Form */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Add Lecture to <br/><span className="text-cyan-400">{courseTitle}</span></h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">Lecture Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none mt-1"
                  placeholder="e.g. Intro to React"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm">Video URL (MP4 Link)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none mt-1"
                  placeholder="https://example.com/video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Tip: Use a direct .mp4 link. For testing, you can use: <br/>
                  <code className="text-cyan-500 select-all">https://www.w3schools.com/html/mov_bbb.mp4</code>
                </p>
              </div>

              <div>
                <label className="text-slate-400 text-sm">Description</label>
                <textarea 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none mt-1 h-24"
                  placeholder="Short summary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition disabled:opacity-50"
                disabled={loadingBtn}
              >
                {loadingBtn ? "Uploading..." : "Add Lecture"}
              </button>
            </form>
          </div>

          {/* RIGHT: List of Added Lectures */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Course Content ({lectures.length})</h2>
            
            {lectures.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No lectures added yet.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {lectures.map((lec, index) => (
                  <div key={index} className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-medium truncate">{lec.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{lec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default AddLecture;