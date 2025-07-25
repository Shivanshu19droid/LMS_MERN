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
    //console.log(response?.payload);
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
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          <label htmlFor="image_upload" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              ></img>
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>

          {/* hidden input to upload the image */}
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_upload"
            accept=".jpg, .jprg, .png, .svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>

            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>

            <input
              type="text"
              name="fullName"
              required
              id="fullName"
              placeholder="Enter your full name"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          <button
            className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-large cursor-pointer"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account ?
            <Link to="/login" className="link text-accent cursor-pointer">
              {" "}
              Login{" "}
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
