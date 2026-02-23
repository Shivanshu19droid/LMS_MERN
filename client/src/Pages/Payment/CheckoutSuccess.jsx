import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubscriptionId } from "../../../Redux/Slices/sripeSliceReducer";
import { getUserData } from "../../../Redux/Slices/AuthSlice";
import { useSearchParams } from "react-router-dom";

function CheckoutSuccess() {
  const dispatch = useDispatch();
  const { susbcriptionId, isPaymentVerified } = useSelector(
    (state) => state.stripe
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    dispatch(getSubscriptionId(sessionId)).then(() => dispatch(getUserData()));
  }, [dispatch]);

  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center space-y-8">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center">
            <AiFillCheckCircle className="text-[#10B981] text-4xl" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
            Payment Successful
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Welcome to the Pro Bundle 🎉 <br />
            You now have full access to all available courses on the platform.
            Happy learning!
          </p>
        </div>

        {/* CTA */}
        <Link to="/">
          <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
            Go to Dashboard
          </button>
        </Link>

      </div>
    </div>
  </HomeLayout>
);
}

export default CheckoutSuccess;
