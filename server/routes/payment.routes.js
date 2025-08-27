import { Router } from "express";
import {
  getStripeApiKey,
  buySubscription,
  cancelSubscription,
  allPayments,
  getSubscription
} from "../controllers/new_stripe_controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/auth.middleware.js";


const paymentRoutes = Router();

paymentRoutes.route("/stripe-key").get(isLoggedIn, getStripeApiKey);

paymentRoutes.route("/subscribe").post(isLoggedIn, buySubscription);

paymentRoutes.route("/get-subscription").get(isLoggedIn, getSubscription);

//paymentRoutes.route("/verify").post(isLoggedIn, verifySubscription); 

paymentRoutes.route("/unsubscribe").get(isLoggedIn, cancelSubscription);

//paymentRoutes.route("/create_checkout_session").get(isLoggedIn, createCheckoutSession);

paymentRoutes //this route is to show all the payment details and will be accessible to the admin only
  .route("/")
  .get(isLoggedIn, authorizedRoles('ADMIN'), allPayments);

export default paymentRoutes;
