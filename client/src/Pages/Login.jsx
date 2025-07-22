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

    if (
      !loginData.email ||
      !loginData.password
    ) {
      toast.error("Please fill all the details");
      return;
    }

    //dispatch login action
    const response = await dispatch(login(loginData));
    //console.log(response?.payload);
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }


  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

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
              value={loginData.email}
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
              value={loginData.password}
            />
          </div>

          <button
            className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-large cursor-pointer"
            type="submit"
          >
            Login
          </button>

          <p className="text-center">
            Do not have an account ?
            <Link to="/signup" className="link text-accent cursor-pointer">
              {" "}
              Signup{" "}
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default LogIn;
