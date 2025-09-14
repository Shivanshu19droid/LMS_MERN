import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import { config } from "dotenv";

//first we have to initialise with our secret key on the backend
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//funcion to send the stripe api key to the front end
const getStripeApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Stripe publishable key",
    key: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

//function to create a check out session when buy now button is clicked

const buySubscription = async (req, res, next) => {
  try {
    const priceId = process.env.STRIPE_PRICE_ID; // you already have this ID stored in Stripe
    const { id } = req.user;
    const user = await User.findById(id); // assuming you have authentication middleware

    if (!user) {
      return next(new AppError("Unauthorised! Please Login", 401));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 403));
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: user.email, // or map to stripe customer if you store IDs
      line_items: [
        {
          price: priceId, // recurring priceId from Stripe dashboard
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/failure`,
    });

    console.log(session);

    const session_id = session.id;
    console.log("session id in purchase course :", session_id);
    user.stripeSessionId = session_id;
    await user.save();

    //console.log(user);

    res
      .status(200)
      .json({
        success: true,
        url: session.url,
        session_id: session.id,
        subscriptionId: session.subscription,
      });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//to get the subscription_id usign the session id after the payment is successful
// controller/stripe.js
const getSubscription = async (req, res, next) => {
  try {
    const { session_id } = req.query;
    console.log("session id :", session_id);
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user || !session_id) {
      return next(new AppError("No session found for user", 400));
    }

    // retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // subscription ID is only available AFTER payment success
    const subscriptionId = session.subscription;

    if (!subscriptionId) {
      return next(new AppError("Payment not completed yet", 400));
    }

    // optional: fetch subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // save subscription ID in DB
    user.subscription = {
      id: subscriptionId,
      status: subscription.status,
    };
    //session_id = undefined; // clear old session
    await user.save();

    console.log(user);

    return res.status(200).json({
      success: true,
      subscriptionId,
      subscription,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

//cancelling the subscription
const cancelSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscriptionId = user.subscription.id;
    console.log(subscriptionId);
    const canceled = await stripe.subscriptions.cancel(subscriptionId);

    user.subscription.id = null;
    user.subscription.status = "inactive";
    await user.save();

    res.status(200).json({ success: true, canceled });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//gettign the monthly payment recrods
const getMonthlyPayments = async (req, res, next) => {
  try {
    console.log("backend function called");

    const year = new Date().getFullYear();
    let month;

    const monthlyList = [];

    for (month = 0; month < 12; month++) {
      //first we define the month using a start date and end date
      const startDate = Math.floor(new Date(year, month, 1).getTime() / 1000);
      const endDate = Math.floor(new Date(year, month + 1, 1).getTime() / 1000);

      //fetch the monthly invoices
      const invoices = await stripe.invoices.list({
        created: { gte: startDate, lt: endDate }, // paginate if needed
      });

      //pushing the monthly numbers in the array
      monthlyList.push(invoices?.data?.length || 0);
    }

    res.status(200).json({
      message: "Monthly purchase records fetched successfully",
      success: true,
      data: monthlyList,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  getStripeApiKey,
  buySubscription,
  cancelSubscription,
  getSubscription,
  getMonthlyPayments,
};
