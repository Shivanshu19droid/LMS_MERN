import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../../Redux/Slices/LectureSlice";

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseId));
  }

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-10">

      {/* Course Title */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
          {state?.title}
        </h1>
      </div>

      {lectures && lectures.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= VIDEO SECTION ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">

            <video
              src={lectures[currentVideo]?.lecture?.secure_url}
              className="w-full aspect-video bg-black"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            />

            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-[#1E293B]">
                {lectures[currentVideo]?.title}
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                {lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          {/* ================= LECTURE LIST ================= */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1E293B]">
                Lectures
              </h3>

              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", { state: { ...state } })
                  }
                  className="px-3 py-1.5 text-sm rounded-xl bg-[#2563EB] text-white font-medium hover:bg-blue-700 transition-all"
                >
                  Add Lecture
                </button>
              )}
            </div>

            <ul className="space-y-3 overflow-y-auto max-h-[500px] pr-2">

              {lectures.map((lecture, idx) => (
                <li
                  key={lecture._id}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    currentVideo === idx
                      ? "bg-[#2563EB]/10 text-[#2563EB]"
                      : "hover:bg-slate-100 text-[#1E293B]"
                  }`}
                  onClick={() => setCurrentVideo(idx)}
                >
                  <div className="flex items-center justify-between">

                    <span className="text-sm font-medium">
                      Lecture {idx + 1}: {lecture?.title}
                    </span>

                    {currentVideo === idx && (
                      <span className="text-xs font-semibold text-[#10B981]">
                        Playing
                      </span>
                    )}
                  </div>

                  {role === "ADMIN" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLectureDelete(state?._id, lecture?._id);
                      }}
                      className="mt-2 text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}

            </ul>
          </div>
        </div>
      ) : (
        role === "ADMIN" && (
          <div className="max-w-7xl mx-auto flex justify-center">
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="px-6 py-3 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Add First Lecture
            </button>
          </div>
        )
      )}
    </div>
  </HomeLayout>
);

}

export default Displaylectures;
