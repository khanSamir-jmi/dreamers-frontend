import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      
      {/* BACKGROUND GLOW EFFECTS (The Linear Gradient Magic) */}
      {/* Top Left Glow */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      {/* Bottom Right Glow */}
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-cyan-400 text-sm font-medium">New Batch Starting Soon</span>
            </div>

            {/* Main Headline with Gradient Text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Code Your Way To <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Success
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master Data Structures, Algorithms, and Full Stack Development with Dreamer's. 
              The most structured roadmap to crack your dream tech job.
            </p>
            
            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses" className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition transform hover:-translate-y-1">
                Explore Courses
              </Link>
              <button className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-lg font-bold text-lg hover:bg-slate-700 transition flex items-center justify-center gap-2">
                <span>▶</span> Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-3 gap-8">
                <div>
                    <h3 className="text-3xl font-bold text-white">10k+</h3>
                    <p className="text-slate-500 text-sm">Students</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white">50+</h3>
                    <p className="text-slate-500 text-sm">Courses</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white">4.9/5</h3>
                    <p className="text-slate-500 text-sm">Rating</p>
                </div>
            </div>
          </div>

          {/* Right Side: Image with Glow */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <img 
              src="https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg" 
              alt="Coding Interface" 
              className="relative rounded-2xl border border-slate-700 shadow-2xl w-full transform transition duration-500 hover:scale-[1.02]"
            />
            
            {/* Floating Card Animation */}
            <div className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">✓</div>
                    <div>
                        <p className="text-xs text-slate-400">Status</p>
                        <p className="text-sm font-bold text-white">Placements 100%</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;