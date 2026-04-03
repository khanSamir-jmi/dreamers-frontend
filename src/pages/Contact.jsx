import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 px-4 flex justify-center items-center">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
          
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-slate-400 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="text-cyan-400 font-bold">Email:</span> support@dreamers.com
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="text-cyan-400 font-bold">Phone:</span> +91 98765 43210
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="text-cyan-400 font-bold">Address:</span> Dhanbad, Jharkhand, India
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-2">Your Name</label>
              <input type="text" className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 outline-none focus:border-cyan-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-slate-400 mb-2">Email</label>
              <input type="email" className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 outline-none focus:border-cyan-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-slate-400 mb-2">Message</label>
              <textarea className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 outline-none focus:border-cyan-500 h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition">Send Message</button>
          </form>

        </div>
      </div>
    </>
  );
};

export default Contact;