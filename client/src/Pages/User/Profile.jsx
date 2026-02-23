import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cancelCourseBundle } from "../../../Redux/Slices/sripeSliceReducer";
import { getUserData } from "../../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data); //since the user details are stored in the redux state when the user logs in

  async function handleCancellation() {
    const confirmCancel = window.confirm(
      "⚠️ Are you sure you want to cancel your subscription?"
    );

    if (confirmCancel) {
      await dispatch(cancelCourseBundle());
      await dispatch(getUserData());

      navigate("/");
    }
  }

  return (
  <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6 sm:p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={userData?.avatar?.secure_url}
            alt="User Avatar"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border border-slate-200"
          />
          <h3 className="text-xl sm:text-2xl font-semibold text-[#1E293B] capitalize">
            {userData?.fullName}
          </h3>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm sm:text-base mb-8">

          <div className="text-[#64748B]">Email</div>
          <div className="text-[#1E293B] font-medium break-words">
            {userData?.email}
          </div>

          <div className="text-[#64748B]">Role</div>
          <div className="text-[#1E293B] font-medium">
            {userData?.role}
          </div>

          <div className="text-[#64748B]">Subscription</div>
          <div
            className={`font-medium ${
              userData?.subscription?.status === "active"
                ? "text-[#10B981]"
                : "text-red-500"
            }`}
          >
            {userData?.subscription?.status === "active"
              ? "Active"
              : "Inactive"}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">

          <Link
            to="/changepassword"
            className="flex-1"
          >
            <button className="w-full bg-[#2563EB] text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm">
              Change Password
            </button>
          </Link>

          <Link
            to="/user/editprofile"
            className="flex-1"
          >
            <button className="w-full border border-[#2563EB] text-[#2563EB] py-2.5 rounded-xl font-semibold hover:bg-[#2563EB]/10 transition-all duration-200">
              Edit Profile
            </button>
          </Link>

        </div>

        {/* Cancel Subscription */}
        {userData?.subscription?.status === "active" && (
          <button
            onClick={handleCancellation}
            className="w-full mt-2 border border-red-500 text-red-500 py-2.5 rounded-xl font-semibold hover:bg-red-50 transition-all duration-200"
          >
            Cancel Subscription
          </button>
        )}

      </div>

    </div>
  </HomeLayout>
);

}

export default Profile;
