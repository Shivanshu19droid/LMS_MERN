import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
  <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center overflow-hidden">

    {/* Subtle Blue Glow */}
    <div className="absolute w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl"></div>

    {/* Content */}
    <div className="relative z-10 space-y-6">

      <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-[#2563EB]">
        404
      </h1>

      <h2 className="text-xl sm:text-2xl font-semibold text-[#1E293B]">
        Page Not Found
      </h2>

      <p className="text-sm sm:text-base text-[#64748B] max-w-md mx-auto">
        The page you’re looking for doesn’t exist or has been moved.
        Let’s get you back on track.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-all duration-200"
      >
        Go Back
      </button>

    </div>
  </div>
);

}

export default NotFound;
