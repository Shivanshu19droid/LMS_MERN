import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Components/Footer";
import { logout } from "../../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  }

  return (
  <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-[#1E293B]">
    <div className="drawer flex-1">

      <input id="my-drawer" type="checkbox" className="drawer-toggle peer" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col flex-1 px-4 sm:px-6 lg:px-10">

        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">

          <label
            htmlFor="my-drawer"
            className="cursor-pointer peer-checked:hidden p-2 rounded-xl hover:bg-[#2563EB]/10 transition-all"
          >
            <FiMenu size={26} className="text-[#1E293B]" />
          </label>

        </div>

        {/* Page Content */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay bg-black/30"></label>

        <aside className="w-64 sm:w-72 lg:w-80 bg-white shadow-xl flex flex-col h-full relative overflow-y-auto p-6">

          {/* Close Button */}
          <div className="absolute right-4 top-4">
            <label
              htmlFor="my-drawer"
              className="cursor-pointer text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <AiFillCloseCircle size={22} />
            </label>
          </div>

          {/* Navigation */}
          <nav className="flex-grow mt-10 space-y-2 text-[15px] font-medium">

            <Link
              to="/"
              className="block px-4 py-2 rounded-xl hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
            >
              Home
            </Link>

            {isLoggedIn && role === "ADMIN" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 rounded-xl hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
                >
                  Admin Dashboard
                </Link>

                <Link
                  to="/course/create"
                  className="block px-4 py-2 rounded-xl hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
                >
                  Create New Course
                </Link>
              </>
            )}

            <Link
              to="/courses"
              className="block px-4 py-2 rounded-xl hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
            >
              All Courses
            </Link>

            <Link
              to="/contact"
              className="block px-4 py-2 rounded-xl hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
            >
              Contact Us
            </Link>

            <Link
              to="/about"
              className="block px-4 py-2 rounded-xl hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
            >
              About Us
            </Link>

          </nav>

          {/* Bottom Auth Buttons */}
          <div className="mt-auto pt-6 border-t border-slate-200">

            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">

                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-blue-700 transition-all shadow-sm"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="w-full text-center px-4 py-2.5 rounded-xl border border-[#2563EB] text-[#2563EB] font-semibold hover:bg-[#2563EB]/10 transition-all"
                >
                  Sign Up
                </Link>

              </div>
            ) : (
              <div className="flex flex-col gap-3">

                <Link
                  to="/user/profile"
                  className="w-full text-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-blue-700 transition-all shadow-sm"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2563EB] text-[#2563EB] font-semibold hover:bg-[#2563EB]/10 transition-all"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </aside>
      </div>
    </div>
  </div>
);



}

export default HomeLayout;
