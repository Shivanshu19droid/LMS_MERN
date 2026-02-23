import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";
import { getCourseLectures } from "../../../Redux/Slices/LectureSlice";
import { useDispatch } from "react-redux";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { lectures } = useSelector((state) => state.lecture);
  const dispatch = useDispatch();

  const { role, data } = useSelector((state) => state.auth);
  useEffect(() => {
    if (state._id) {
      dispatch(getCourseLectures(state._id));
    } else {
      navigate("/courses");
    }
  }, [state._id, dispatch]);

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* ================= LEFT SECTION ================= */}
        <div className="space-y-6">

          <img
            src={state?.thumbnail?.secure_url}
            alt="Course Thumbnail"
            className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-sm"
          />

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">

            <div className="flex justify-between text-sm sm:text-base">
              <p className="text-[#64748B]">
                Total Lectures
              </p>
              <p className="font-semibold text-[#1E293B]">
                {lectures?.length}
              </p>
            </div>

            <div className="flex justify-between text-sm sm:text-base">
              <p className="text-[#64748B]">
                Instructor
              </p>
              <p className="font-semibold text-[#1E293B]">
                {state?.createdBy}
              </p>
            </div>

            {role === "ADMIN" || data?.subscription?.status === "active" ? (
              <button
                onClick={() =>
                  navigate("/course/displaylecture", { state: { ...state } })
                }
                className="w-full mt-4 bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                Watch Lectures
              </button>
            ) : (
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                Subscribe to Access
              </button>
            )}

          </div>
        </div>


        {/* ================= RIGHT SECTION ================= */}
        <div className="space-y-6">

          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
            {state?.title}
          </h1>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#2563EB]">
              Course Description
            </h2>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              {state?.description}
            </p>
          </div>

        </div>

      </div>
    </div>
  </HomeLayout>
);
}

export default CourseDescription;
