import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import crypto from "crypto";
import sendEmail from "../utils/email.util.js";
import { config } from "dotenv";
config();

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("Email already exists", 400));
  }

  //we try to create the new user in 2 steps, first we will simply populate all the fields of the data model and then try to upload the files using third party service(cloudinary)

  const user = await User.create({
    fullName,
    email,
    password, //the logic to encrypt this password is present in the user.model.js file
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/demo/image/upload/v1714035623/sample_image_ab12cd.jpg",
    },
  });

  if (!user) {
    return next(new AppError("User registration failed, please try again"));
  }

  //file upload logic

  if (req.file) {
    console.log(req.file);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //after uploading the file on cloudinary, we will delete it from the local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "File not uploaded, please try again", 500)
      );
    }
  }

  await user.save();

  user.password = undefined; //as we do not want to send the password as a response

  //once the user has registered, we will automatically login the user
  //for this we will have to generate a jwt token and pass it into the cookies
  const token = await user.generateJWTToken(); //function has been configured in the user.model.js
  res.cookie("token", token, cookieOptions); //sending the token in cookie response

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !user.comparePassword(password)) {
      //the compare password method is defined in user.model.js
      return next(new AppError("Email or password does not match", 400));
    }

    //to login the user, we will generate a jwt token ans pass it as a cookie response
    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const logout = (req, res) => {
  //logout can be implemented by deleting the access token generated
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; //in the auth.middleware file, we have fetched the user details and stored it in req.user
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch profile or user details", 500));
  }
};

//now to implement the forgot password feature, we will do it in 2 steps and different routes will be defined for each
//first step is to take email, generate a token and send an email to the user
//second step, the user clicks on the custom link in the email and resets the password

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is requried", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email not registered", 400));
  }

  const resetToken = await user.generatePasswordResetToken();

  await user.save();

  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  console.log(resetPasswordURL);

  const subject = "Reset password";
  const message = `You can reset your password by clicking <a href = ${resetPasswordURL} />`;

  console.log(process.env.SMTP_FROM_EMAIL);
  console.log(process.env.SMTP_PASSWORD);

  try {
    await sendEmail(email, subject, message); //sendEmail is defined in the util folder

    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully`,
    });
  } catch (e) {
    //in case this fails, we also need to remove the tokens which are set
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();
    return next(new AppError(e.message, 500));
  }
};

//now that we have generated the reset password token and sent email to the user - we will now implement the logic to reset the password when he clicks on the link
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //checking if there is any user with that token and if the token is not expired

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError(`Token is invalid or expired, please try again`, 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are mandatory", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError("Invalid old password", 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const id = req.user.id;

  console.log("user id is: ", id);
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id); //if user has uploaded a new avatar, then we will delete the previous avatar stored in cloudinary

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //after uploading the file on cloudinary, we will delete it from the local storage
        await fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "File not uploaded, please try again", 500)
      );
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User details updated successfully",
  });
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
};
