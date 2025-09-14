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
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-green-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">
            {" "}
            Payment Successful{" "}
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center spaace-y-2">
              <h2 className="text-lg font-semibold">
                Welcome to the pro bundle!
              </h2>
              <p className="text-lg font-semibold">
                Now you can access all the courses available on this platform
                <br />
                HAPPY LEARNING!
              </p>
            </div>
            <AiFillCheckCircle className="text-green-500 text-5xl" />
          </div>

          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-left"
          >
            <button>Go to dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
