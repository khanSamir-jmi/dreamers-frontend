import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-4">
            Dreamer<span className="text-cyan-500">'s</span>
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Empowering students to master modern technologies and crack their dream jobs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-cyan-400 transition">About Us</a></li>
            <li><a href="/courses" className="hover:text-cyan-400 transition">Courses</a></li>
            <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Help Center</a></li>
          </ul>
        </div>

        {/* Social Media - AB REAL ICONS DIKHENGE */}
        <div>
          <h3 className="text-white font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Dreamer's Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;