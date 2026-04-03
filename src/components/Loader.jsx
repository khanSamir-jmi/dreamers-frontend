const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;