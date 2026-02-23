import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  //we handle the change in uploaded image(avatar) separately
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  //then we handle the change in any other input fields using a separate function
  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  //then we will create a function which will handle the form submission - asyncthunk will be used to update the data
  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(data);
    if (!data.fullName || !data.avatar) {
      toast.error("All Fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }

    //we create a new formdata
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile({ id: data.userId, data: data }));

    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
  <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] text-center mb-6">
          Edit Profile
        </h1>

        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-6"
        >

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <label
              htmlFor="image_uploads"
              className="cursor-pointer relative group"
            >
              {data.previewImage ? (
                <img
                  src={data.previewImage}
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-full object-cover border border-slate-300"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                  <BsPersonCircle className="w-16 h-16" />
                </div>
              )}

              <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
            </label>

            <input
              onChange={handleImageUpload}
              className="hidden"
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .png, .svg, .jpeg"
            />

            <span className="text-xs text-[#64748B]">
              Click to change profile photo
            </span>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-[#1E293B]"
            >
              Full Name
            </label>

            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl 
                         bg-white text-[#1E293B] 
                         border border-slate-300 
                         placeholder:text-[#94A3B8]
                         focus:outline-none 
                         focus:ring-2 focus:ring-[#2563EB]/30 
                         focus:border-[#2563EB] 
                         transition-all"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            Update Profile
          </button>

          {/* Back Link */}
          <Link
            to="/user/profile"
            className="flex items-center justify-center gap-2 text-sm text-[#64748B] hover:text-[#2563EB] transition-all"
          >
            <AiOutlineArrowLeft />
            Go back to Profile
          </Link>

        </form>
      </div>

    </div>
  </HomeLayout>
);

}

export default EditProfile;
