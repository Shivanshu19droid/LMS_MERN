//we will make a new error class which extends the standard error class
import { config } from "dotenv";
config();

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
