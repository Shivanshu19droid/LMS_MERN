import { Router } from "express";
import {
  contactUs,
  userStats,
} from "../controllers/miscellaneous.controllers.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const miscellaneousroutes = Router();

miscellaneousroutes.route("/contact").post(contactUs);
miscellaneousroutes
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizedRoles("ADMIN"), userStats);

export default miscellaneousroutes;
