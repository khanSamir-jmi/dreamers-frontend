import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const CourseDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`https://dreamers-backend-i25f.onrender.com/api/courses/${id}`);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // --- RAZORPAY PAYMENT HANDLER ---
  // --- RAZORPAY PAYMENT HANDLER ---
  const checkoutHandler = async (amount) => {
    // 1. Check Login
    if (!user || !user.token) {
        alert("Please Login to purchase");
        navigate('/login');
        return;
    }

    try {
        // Token Config setup karein
        const config = { 
            headers: { 
                Authorization: `Bearer ${user.token}` 
            } 
        };

        // 2. Get Key ID (Ab hum yahan bhi 'config' bhej rahe hain safety ke liye)
        const { data: { key } } = await axios.get("https://dreamers-backend-i25f.onrender.com/api/payment/razorpaykey", config);

        // 3. Create Order
        const { data: { order } } = await axios.post(`https://dreamers-backend-i25f.onrender.com/api/payment/checkout/${id}`, {}, config);

        // 4. Configure Razorpay Options
        const options = {
          key: key, 
          amount: order.amount,
          currency: "INR",
          name: "Dreamer's Academy",
          description: `Purchase ${course.title}`,
          image: course.image,
          order_id: order.id, 
          
          callback_url: `https://dreamers-backend-i25f.onrender.com/api/payment/verification/${id}?user_id=${user._id}`,
          
          prefill: {
            name: user.name,
            email: user.email,
            contact: "9999999999"
          },
          notes: {
            "address": "Dreamer's Academy Office"
          },
          theme: {
            "color": "#0891b2"
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();

    } catch (error) {
        console.error("Payment Error:", error);
        alert(error.response?.data?.message || "Something went wrong during payment initialization");
    }
  };

    
  // --------------------------------

  if (loading) return <div className="h-screen bg-slate-900 pt-20"><Loader /></div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
             {/* Thumbnail */}
             <div className="h-64 sm:h-96 w-full relative">
                <img src={course?.image || "https://via.placeholder.com/800"} alt={course?.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
             </div>

             <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
                {user && user.isAdmin && (
        <button
            onClick={() => navigate(`/admin/course/${id}/lectures`)}
            className="mb-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition shadow-lg flex items-center gap-2"
        >
            ⚙️ Add Lectures (Admin)
        </button>
    )}
                <p className="text-slate-400 mb-6 text-lg">{course?.description}</p>
                
                <div className="flex items-center gap-6 mb-8">
                    <div className="text-3xl font-bold text-green-400">₹{course?.price}</div>
                    <span className="px-3 py-1 bg-cyan-900 text-cyan-200 rounded-full text-sm">{course?.category}</span>
                    <span className="text-slate-400 text-sm">Created by {course?.createdBy}</span>
                </div>

                {/* THE BUY BUTTON */}
                <button 
                    onClick={() => checkoutHandler(course?.price)}
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg shadow-cyan-500/30 transition transform hover:-translate-y-1"
                >
                    Buy Now
                </button>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CourseDescription;