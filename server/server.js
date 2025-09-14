import app from "./app.js";
import connectionToDB from "./config/dbConnection.js";
const PORT = process.env.PORT || 5000;
import cloudinary from "cloudinary";
import { config } from "dotenv";
config();
import Stripe from "stripe";

//cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//stripe configuration
export const stripe = new Stripe({
  secret_key: process.env.STRIPE_SECRET_KEY,
  publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
});

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`App is running at http://localhost:${PORT}`);
});
