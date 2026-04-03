import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseStudy from './pages/CourseStudy';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';
// Payment Page
import PaymentSuccess from './pages/PaymentSuccess';

// New Course Page (Razorpay Logic Wala)
import CourseDescription from './pages/CourseDescription'; 

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AddCourse from './pages/AddCourse';
// Agar aapne file ka naam 'AddLecture.jsx' rakha hai to ye theek hai:
import AddLecture from './pages/AddLecture'; 

function App() {
  return (
    <Router>
     <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* --- MAIN FIX: Course Description Page --- */}
        {/* Ye wahi page hai jahan "Buy Now" button hai */}
        <Route path="/course/:id" element={<CourseDescription />} /> 
        
        {/* Student Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course/:id/study" element={<CourseStudy />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/addcourse" element={<AddCourse />} />
        <Route path="/admin/course/:id/lectures" element={<AddLecture />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;