import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  BarElement,
  CategoryScale,
} from "chart.js";
import { deleteCourse, getAllCourses } from "../../../Redux/Slices/CourseSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getMonthlyPurchaseData,
  getStatsData,
} from "../../../Redux/Slices/statSlice";
import { getPaymentRecord } from "../../../Redux/Slices/sripeSliceReducer";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount, subscribedCount, monthlyPurchaseRecord } = useSelector(
    (state) => state.stat
  );
  const { allPayments, finalMonths, monthlySalesRecord } = useSelector(
    (state) => state.stripe
  );
  const { courseData } = useSelector((state) => state.course);

  //we prepare the data to be displayed in the graphs
  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUserCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales/Month",
        data: monthlyPurchaseRecord,
        backgroundColor: ["rgb(225, 99, 32)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ? ")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getMonthlyPurchaseData());
    })();
  }, []);

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-10 space-y-12">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
          Admin Dashboard
        </h1>
        <p className="text-sm text-[#64748B] mt-2">
          Monitor platform growth, revenue and course performance.
        </p>
      </div>


      {/* ================= ANALYTICS SECTION ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Users Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 space-y-6">

          <h2 className="text-lg font-semibold text-[#1E293B]">
            User Analytics
          </h2>

          <div className="h-72">
            <Pie data={userData} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex items-center justify-between bg-[#2563EB]/5 p-4 rounded-xl hover:scale-[1.02] transition-all duration-200">
              <div>
                <p className="text-sm text-[#64748B]">Registered Users</p>
                <h3 className="text-2xl font-bold text-[#1E293B]">
                  {allUserCount}
                </h3>
              </div>
              <FaUsers className="text-[#2563EB] text-3xl" />
            </div>

            <div className="flex items-center justify-between bg-[#10B981]/5 p-4 rounded-xl hover:scale-[1.02] transition-all duration-200">
              <div>
                <p className="text-sm text-[#64748B]">Subscribed Users</p>
                <h3 className="text-2xl font-bold text-[#1E293B]">
                  {subscribedCount}
                </h3>
              </div>
              <FaUsers className="text-[#10B981] text-3xl" />
            </div>

          </div>
        </div>


        {/* Revenue Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 space-y-6">

          <h2 className="text-lg font-semibold text-[#1E293B]">
            Revenue Overview
          </h2>

          <div className="h-72">
            <Bar data={salesData} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex items-center justify-between bg-[#2563EB]/5 p-4 rounded-xl hover:scale-[1.02] transition-all duration-200">
              <div>
                <p className="text-sm text-[#64748B]">Subscriptions</p>
                <h3 className="text-2xl font-bold text-[#1E293B]">
                  {subscribedCount}
                </h3>
              </div>
              <FcSalesPerformance className="text-3xl" />
            </div>

            <div className="flex items-center justify-between bg-[#10B981]/5 p-4 rounded-xl hover:scale-[1.02] transition-all duration-200">
              <div>
                <p className="text-sm text-[#64748B]">Total Revenue</p>
                <h3 className="text-2xl font-bold text-[#1E293B]">
                  ₹ {subscribedCount * 499}
                </h3>
              </div>
              <GiMoneyStack className="text-[#10B981] text-3xl" />
            </div>

          </div>
        </div>
      </div>


      {/* ================= COURSES TABLE ================= */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-[#1E293B]">
            Courses Overview
          </h2>

          <button
            onClick={() => navigate("/course/create")}
            className="px-5 py-2 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-blue-700 transition-all"
          >
            Create New Course
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            <thead>
              <tr className="text-left text-[#64748B] border-b">
                <th className="py-3">S No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {courseData?.map((course, idx) => (
                <tr
                  key={course._id}
                  className="border-b hover:bg-slate-50 transition-all"
                >
                  <td className="py-3">{idx + 1}</td>
                  <td>{course?.title}</td>
                  <td>{course?.category}</td>
                  <td>{course?.createdBy}</td>
                  <td>{course?.numberOfLectures}</td>
                  <td className="max-w-xs truncate">
                    {course?.description}
                  </td>
                  <td className="flex items-center gap-3 py-3">

                    <button
                      onClick={() =>
                        navigate("/course/displaylectures", {
                          state: { ...course },
                        })
                      }
                      className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/20 transition-all"
                    >
                      <BsCollectionPlayFill />
                    </button>

                    <button
                      onClick={() => onCourseDelete(course?._id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                    >
                      <BsTrash />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </HomeLayout>
);

}

export default AdminDashboard;
