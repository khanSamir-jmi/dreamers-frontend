import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl text-center max-w-lg w-full">
          
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Order Successful!</h1>
          <p className="text-slate-400 mb-6">
            Welcome to the course. You can now start learning.
          </p>

          <div className="bg-slate-900 p-4 rounded-lg mb-8 border border-slate-700">
            <p className="text-sm text-slate-500 mb-1">Payment Reference ID</p>
            <p className="text-cyan-400 font-mono text-lg">{referenceNum}</p>
          </div>

          <Link 
            to="/dashboard" 
            className="inline-block w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition"
          >
            Go to My Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;