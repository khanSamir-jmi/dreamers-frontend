import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Send token to prove you are Admin
        },
      };

      await axios.post('https://dreamers-backend-i25f.onrender.com/api/courses', {
        title,
        description,
        category,
        price,
        image
      }, config);

      alert("Course Added Successfully!");
      navigate('/'); // Go back to Home
    } catch (error) {
      console.error(error);
      alert("Failed to add course. Make sure you are logged in.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 px-4 flex justify-center">
        <div className="w-full max-w-2xl">
          
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-6">Add New Course</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div>
                <label className="block text-slate-400 mb-2">Course Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                  placeholder="e.g., Master React JS"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 mb-2">Description</label>
                <textarea 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none h-32"
                  placeholder="Course details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Row: Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                    placeholder="4999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-2">Category</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                    placeholder="Web Dev, DSA..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-slate-400 mb-2">Thumbnail Image URL</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-cyan-500 outline-none"
                  placeholder="https://image-link.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition transform hover:-translate-y-1"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Course"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddCourse;