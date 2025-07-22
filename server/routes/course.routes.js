import { Router } from "express";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  createCourse,
  getAllCourses,
  updateCourse,
  removeCourse,
  getLecturesByCourseId,
  addLectureToCourseById
} from "../controllers/course.controller.js";
import upload from '../middlewares/multer.middleware.js';

const courseRoutes = Router();

courseRoutes
  .route("/")
  .get(getAllCourses)
  .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("thumbnail"), createCourse);

courseRoutes
  .route("/:id")
  .get(isLoggedIn,authorizedSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
  .delete(isLoggedIn, authorizedRoles('ADMIN'), removeCourse)
  .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("thumbnail"), addLectureToCourseById);

export default courseRoutes;
