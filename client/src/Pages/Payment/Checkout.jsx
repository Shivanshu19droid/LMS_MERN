import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getStripeApiKey,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../../Redux/Slices/sripeSliceReducer";
import HomeLayout from "../../Layouts/HomeLayout";
import { loadStripe } from "@stripe/stripe-js";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";
import { getUserData } from "../../../Redux/Slices/AuthSlice";

function Checkout() {
  const dispatch = useDispatch();

  async function handleSubscription(e) {
    e.preventDefault();

    const resultAction = await dispatch(purchaseCourseBundle());

    if (purchaseCourseBundle.fulfilled.match(resultAction)) {
      window.location.href = resultAction?.payload?.url;
    } else {
      toast.error("Something went wrong");
    }
  }

  //UI RENDERING
  return (
  <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-12">

      <form
        onSubmit={handleSubscription}
        className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-6"
      >

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] text-center">
          Subscription Bundle
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#64748B] text-center leading-relaxed">
          Get unlimited access to all available courses for
          <span className="text-[#2563EB] font-semibold"> 1 year</span>.
          Includes all existing and newly launched courses.
        </p>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-[#2563EB]">
          <BiRupee />
          <span>499</span>
          <span className="text-sm font-medium text-[#64748B]">/ year</span>
        </div>

        {/* Benefits */}
        <div className="bg-[#10B981]/10 text-[#10B981] text-sm rounded-xl py-3 px-4 text-center">
          100% refund on cancellation
        </div>

        <p className="text-xs text-[#64748B] text-center">
          * Terms and conditions apply
        </p>

        {/* CTA */}
        <button
          type="submit"
          className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
        >
          Buy Now
        </button>

      </form>
    </div>
  </HomeLayout>
);

}

export default Checkout;
