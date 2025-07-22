//this is a layout which will contain a navbar and the footer, and all the other pages will be passed inside it as children
//so thsi layout will accept a children prop which will be the content of the page

//creating the layout which first has the navbar, then the children item/page and then the footer
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //checking if the user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  //for displaying the opitons according to the role
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    //changeWidth();
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if(res?.payload?.success) navigate("/");

    
  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white n-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard"> Admin DashBoard </Link>
              </li>
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

            {/* if user is not logged in then login and sign up buttons will be shown */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <Link
                    to="/login"
                    className="px-4 py-2 font-semibold rounded-md w-full bg-pink-700 text-white text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-4 py-2 font-semibold rounded-md w-full bg-purple-800 text-white text-center"
                  >
                    SignUp
                  </Link>
                </div>
              </li>
            )}

            {/* if the user is logged in then we display the logout and profile buttons */}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full bg-pink-700">
                    <Link to="/user/profile">Profile</Link>
                  </button>

                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-purple-800">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* //after this we will render the children component */}
      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
