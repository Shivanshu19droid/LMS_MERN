import { Router } from "express";
import {
  getStripeApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from "../controllers/payment_stripe.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/auth.middleware.js";


const paymentRoutes = Router();

paymentRoutes.route("/stripe-key").get(isLoggedIn, getStripeApiKey);

paymentRoutes.route("/subscribe").post(isLoggedIn, buySubscription);

paymentRoutes.route("/verify").post(isLoggedIn, verifySubscription);

paymentRoutes.route("/unsubscribe").get(isLoggedIn, cancelSubscription);

paymentRoutes //this route is to show all the payment details and will be accessible to the admin only
  .route("/")
  .get(isLoggedIn, authorizedRoles('ADMIN'), allPayments);

export default paymentRoutes;
