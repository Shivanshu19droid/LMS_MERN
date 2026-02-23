import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../../Redux/Slices/AuthSlice";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // this function will handle the change in fields name, email ans password
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  //this function is to be used when the form will be submitted
  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    //dispatch login action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
  <HomeLayout>
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-16 bg-[#F8FAFC] overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 sm:p-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B] text-center mb-8">
          Welcome Back
        </h1>

        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col gap-6"
        >

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
              value={loginData.email}
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
              value={loginData.password}
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-[#64748B] mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>

    </div>
  </HomeLayout>
);

}

export default LogIn;
