import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../../Redux/Slices/AuthSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // this function will handle the change in fields name, email ans password
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  //we will handle the image/file upload separately here
  function getImage(event) {
    event.preventDefault();

    //getting the image
    const uploadedImage = event.target.files[0];

    const supportedFormats = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    // ✅ Validate MIME type
    if (!supportedFormats.includes(uploadedImage.type)) {
      toast.error(
        "Unsupported format! Only JPG, JPEG, PNG, and WEBP are allowed."
      );
      return;
    }

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        console.log(this.result);
        setPreviewImage(this.result);
      });
    }
  }

  //this function is to be used when the form will be submitted
  async function createNewAccount(event) {
    event.preventDefault();

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details");
      return;
    }

    //other validations
    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least of 5 characters");
      return;
    }

    if (!signupData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!signupData.password.match(/^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,16}$/)) {
      toast.error(
        "Password must be 6 - 16 characters long and have at least a number and a special character"
      );
      return;
    }

    //once all the validations are done, we will create a form data instance and append the details
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    //dispatch account create action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/");

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
  <HomeLayout>
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-16 bg-[#F8FAFC] overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 sm:p-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B] text-center mb-8">
          Create Your Account
        </h1>

        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col gap-6"
        >

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <label
              htmlFor="image_upload"
              className="cursor-pointer relative group"
            >
              {previewImage ? (
                <img
                  src={previewImage}
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
              onChange={getImage}
              className="hidden"
              type="file"
              name="image_uploads"
              id="image_upload"
              accept=".jpg, .jpeg, .png, .svg"
            />

            <span className="text-xs text-[#64748B]">
              Click to upload profile photo
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#1E293B]"
            >
              Email
            </label>

            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleUserInput}
              value={signupData.email}
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

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#1E293B]"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              id="password"
              placeholder="Enter your password"
              onChange={handleUserInput}
              value={signupData.password}
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

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-[#1E293B]"
            >
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              required
              id="fullName"
              placeholder="Enter your full name"
              onChange={handleUserInput}
              value={signupData.fullName}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>

          {/* Redirect */}
          <p className="text-center text-sm text-[#64748B] mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>

    </div>
  </HomeLayout>
);


}

export default SignUp;
