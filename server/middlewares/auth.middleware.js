import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 401));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;

  next();
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("You do not have permission to access this route")
      );
    }
    next();
  };

const authorizedSubscriber = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  const subscription = user.subscription;
  const currentUserRole = user.role;

  if (currentUserRole !== "ADMIN" && subscription.status !== "active") {
    return next(new AppError("Please subscribe to access the lectures", 400));
  }

  next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
