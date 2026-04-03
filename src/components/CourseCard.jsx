import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition duration-300 transform hover:-translate-y-2">
      
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" 
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md">
            {course.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
          {course.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Price & Button Section */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div>
            <p className="text-xs text-slate-500">Price</p>
            <p className="text-2xl font-bold text-white">₹{course.price}</p>
          </div>
          
          <Link to={`/course/${course._id}`} className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;