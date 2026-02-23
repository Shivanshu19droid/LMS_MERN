import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid Email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message ...",
        success: "Form Submitted Successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      toast.error("Operation failed");
    }
  }
  return (
  <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6 text-center">
          Contact Us
        </h1>

        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col gap-5"
        >

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#1E293B]"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={userInput.name}
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

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#1E293B]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={userInput.email}
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

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[#1E293B]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              onChange={handleInputChange}
              value={userInput.message}
              className="w-full px-4 py-3 rounded-xl 
                         bg-white text-[#1E293B] 
                         border border-slate-300 
                         placeholder:text-[#94A3B8]
                         focus:outline-none 
                         focus:ring-2 focus:ring-[#2563EB]/30 
                         focus:border-[#2563EB] 
                         transition-all 
                         resize-none h-36"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            Submit
          </button>

        </form>
      </div>

    </div>
  </HomeLayout>
);


}

export default Contact;
