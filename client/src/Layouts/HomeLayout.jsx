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
    <div className="drawer">
      {/* Hidden toggle input with peer */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle peer" />

      {/* Page content */}
      <div className="drawer-content flex-col min-h-screen">
        {/* Navbar toggle button (hidden when drawer is open) */}
        <label
          htmlFor="my-drawer"
          className="cursor-pointer w-fit peer-checked:hidden"
        >
          <FiMenu size={32} className="text-white" />
        </label>

        {/* Actual page content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content flex flex-col h-full relative">
          {/* Cross button inside sidebar */}
          <li className="w-fit absolute right-2 top-2 z-50">
            <label htmlFor="my-drawer">
              <AiFillCloseCircle size={24} />
            </label>
          </li>

          {/* Main links */}
          <div className="flex-grow mt-5">
            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <>
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/course/create">Create New Course</Link>
                </li>
              </>
            )}

            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </div>

          {/* Bottom buttons */}
          <div className="mt-auto">
            {!isLoggedIn && (
              <div className="flex gap-4 justify-center">
                <Link
                  to="/login"
                  className="px-4 py-2 font-semibold w-1/2 rounded-md bg-pink-700 hover:bg-pink-600 text-white text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 font-semibold w-1/2 rounded-md bg-purple-800 hover:bg-purple-700 text-white text-center"
                >
                  SignUp
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex gap-4 justify-center">
                <Link
                  to="/user/profile"
                  className="px-4 py-2 font-semibold w-1/2 rounded-md bg-pink-700 hover:bg-pink-600 text-white text-center"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 font-semibold w-1/2 rounded-md bg-purple-800 hover:bg-purple-700 text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default HomeLayout;
