import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { addCourseLecture } from "../../../Redux/Slices/LectureSlice";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { getCourseLectures } from "../../../Redux/Slices/LectureSlice";

function AddLecture() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(addCourseLecture(userInput));
    console.log(response);
    if (response?.payload?.data?.success) {
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
      navigate(-1);
      dispatch(getCourseLectures(courseDetails._id));
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-12 flex items-center justify-center">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative">

        {/* Header */}
        <div className="flex items-center justify-center relative mb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-[#64748B] hover:text-[#2563EB] transition-all"
          >
            <AiOutlineArrowLeft size={22} />
          </button>

          <h1 className="text-3xl font-bold text-[#1E293B]">
            Add New Lecture
          </h1>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-6">

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#1E293B]">
              Lecture Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter lecture title"
              onChange={handleInputChange}
              value={userInput.title}
              className="w-full px-4 py-3 rounded-xl 
                         !bg-white !text-[#1E293B] 
                         border border-slate-300 
                         placeholder:text-slate-400
                         focus:outline-none 
                         focus:ring-2 focus:ring-[#2563EB]/40 
                         focus:border-[#2563EB] 
                         transition-all"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#1E293B]">
              Lecture Description
            </label>

            <textarea
              name="description"
              placeholder="Enter lecture description"
              onChange={handleInputChange}
              value={userInput.description}
              className="w-full px-4 py-3 rounded-xl 
                         !bg-white !text-[#1E293B] 
                         border border-slate-300 
                         placeholder:text-slate-400
                         focus:outline-none 
                         focus:ring-2 focus:ring-[#2563EB]/40 
                         focus:border-[#2563EB] 
                         resize-none h-32
                         transition-all"
            />
          </div>

          {/* Video Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#1E293B]">
              Upload Video
            </label>

            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="w-full rounded-xl border border-slate-300"
              />
            ) : (
              <div className="w-full h-56 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 hover:border-[#2563EB] transition-all cursor-pointer">

                <label
                  htmlFor="lecture"
                  className="text-[#64748B] font-medium cursor-pointer"
                >
                  Click to choose lecture video
                </label>

                <input
                  type="file"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4 video/xmp4 video/*"
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Upload Lecture
          </button>

        </form>
      </div>
    </div>
  </HomeLayout>
);
}

export default AddLecture;
