import HomeLayout from "../../Layouts/HomeLayout";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

function CheckoutFailure() {
  return (
  <HomeLayout>
    <div className="min-h-[90vh] bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center space-y-8">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <RxCrossCircled className="text-red-500 text-4xl" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
            Payment Failed
          </h1>

          <p className="text-sm sm:text-base text-[#64748B]">
            Unfortunately, your payment could not be processed.
            Please try again or check your payment details.
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/checkout"
          className="block w-full"
        >
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
            Try Again
          </button>
        </Link>

      </div>

    </div>
  </HomeLayout>
);
}

export default CheckoutFailure;
