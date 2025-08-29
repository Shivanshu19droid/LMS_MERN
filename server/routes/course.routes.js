import { Router } from "express";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  createCourse,
  getAllCourses,
  updateCourse,
  removeCourse,
  getLecturesByCourseId,
  addLectureToCourseById,
  removeLectureFromCourse
} from "../controllers/course.controller.js";
import upload from '../middlewares/multer.middleware.js';

const courseRoutes = Router();

courseRoutes
  .route("/")
  .get(getAllCourses)
  .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("thumbnail"), createCourse)
  .delete(isLoggedIn, authorizedRoles('ADMIN'), removeLectureFromCourse);

courseRoutes
  .route("/:id")
  .get(isLoggedIn,authorizedSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
  .delete(isLoggedIn, authorizedRoles('ADMIN'), removeCourse)
  .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("lecture"), addLectureToCourseById);

export default courseRoutes;
