import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../../Redux/Slices/CourseSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //defininng an initial state for the input
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  //a function to create a data url for the uploaded image
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All Fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
    }
    navigate("/courses");
  }

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-12 flex items-center justify-center">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative">

        {/* Back Button */}
        <Link
          to="/admin/dashboard"
          className="absolute top-6 left-6 text-[#64748B] hover:text-[#2563EB] transition-all"
        >
          <AiOutlineArrowLeft size={22} />
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B] text-center mb-10">
          Create New Course
        </h1>

        <form onSubmit={onFormSubmit} className="space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT COLUMN */}
            <div className="space-y-6">

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer block">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="Course Thumbnail"
                      className="w-full h-52 object-cover rounded-xl border border-slate-300"
                    />
                  ) : (
                    <div className="w-full h-52 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-[#64748B] hover:border-[#2563EB] transition-all">
                      <span className="font-medium">
                        Upload Course Thumbnail
                      </span>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Course Title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-[#1E293B]"
                >
                  Course Title
                </label>

                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  value={userInput.title}
                  onChange={handleUserInput}
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

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">

              {/* Instructor */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="createdBy"
                  className="text-sm font-semibold text-[#1E293B]"
                >
                  Course Instructor
                </label>

                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter instructor name"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
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

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-[#1E293B]"
                >
                  Course Category
                </label>

                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter course category"
                  value={userInput.category}
                  onChange={handleUserInput}
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
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-[#1E293B]"
                >
                  Course Description
                </label>

                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter course description"
                  value={userInput.description}
                  onChange={handleUserInput}
                  className="w-full px-4 py-3 rounded-xl 
                             !bg-white !text-[#1E293B] 
                             border border-slate-300 
                             placeholder:text-slate-400
                             focus:outline-none 
                             focus:ring-2 focus:ring-[#2563EB]/40 
                             focus:border-[#2563EB] 
                             resize-none h-28
                             transition-all"
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Create Course
          </button>

        </form>
      </div>

    </div>
  </HomeLayout>
);
}

export default CreateCourse;
