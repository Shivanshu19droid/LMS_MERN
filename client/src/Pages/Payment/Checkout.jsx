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
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all the available courses
              on our platform for a{" "}
              <span className="text-yellow-500 font-bold">
                duration of 1 year.
                <br />
              </span>{" "}
              All the existing and newly launched courses will be available.
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499</span> only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions applied *</p>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
