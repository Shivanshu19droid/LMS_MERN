import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { toast } from "react-hot-toast";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
  const dispatch = useDispatch();

  const { loading, error, courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    loadCourses();
  }, []);

  console.log(courseData);

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-12">

      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Explore Courses by
            <span className="text-[#2563EB] ml-2">
              Industry Experts
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
            Learn from experienced mentors and gain practical skills
            designed for real-world impact.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courseData?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </div>

      </div>
    </div>
  </HomeLayout>
);
}

export default CourseList;
