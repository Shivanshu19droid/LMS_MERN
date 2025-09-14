import { Router } from "express";
import {
  getStripeApiKey,
  buySubscription,
  cancelSubscription,
  getSubscription,
  getMonthlyPayments,
} from "../controllers/new_stripe_controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/auth.middleware.js";

const paymentRoutes = Router();

paymentRoutes.route("/stripe-key").get(isLoggedIn, getStripeApiKey);

paymentRoutes.route("/subscribe").post(isLoggedIn, buySubscription);

paymentRoutes.route("/get-subscription").get(isLoggedIn, getSubscription);

paymentRoutes.route("/unsubscribe").get(isLoggedIn, cancelSubscription);

paymentRoutes
  .route("/get-monthly-payments")
  .get(isLoggedIn, authorizedRoles("ADMIN"), getMonthlyPayments);

export default paymentRoutes;
