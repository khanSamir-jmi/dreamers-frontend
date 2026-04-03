import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 text-white pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            About <span className="text-cyan-500">Dreamer's</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            We are dedicated to providing the best online learning experience. 
            Our mission is to help students crack their dream jobs by mastering 
            modern technologies like MERN Stack, Python, and AI.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">High Quality</h3>
              <p className="text-slate-400">Lectures designed by industry experts with real-world projects.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Affordable</h3>
              <p className="text-slate-400">Premium education at a price every student can afford.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Community</h3>
              <p className="text-slate-400">Join a network of thousands of learners helping each other grow.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;