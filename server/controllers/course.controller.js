import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import fs from 'fs';
import cloudinary from 'cloudinary';
import mongoose from "mongoose";
import asyncHandler from '../middlewares/asyncHandler.middleware.js';


const getAllCourses = async function(req, res, next){
    try{
        const courses = await Course.find({}).select('-lectures');

    res.status(200).json({
        success: true,
        message: 'All Courses',
        courses,
    });

    } catch(e){
        return next(
            new AppError(e.message, 500)
        )
    }
}

const getLecturesByCourseId = async function(req, res, next){
    try{
        const {id} = req.params;

        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('course not found', 400)
            )
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures
        })
    } catch(e){ 
        return next(
            new AppError('Failed to fetch course lectures', 500)
        )
    }
}

const createCourse = async function(req, res, next){
   const {title, description, category, createdBy} = req.body;
   
   if(!title || !description || !category || !createdBy){
    return next(
        new AppError('All fields are required', 400)
    )
   }

   const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: { //since thumbnail is a required field, so cannot create an instance of course without defining thumbnail, later we update with the original credentials
        public_id: 'Dummy',
        secure_url: 'Dummy'
    }
   })

   if(!course){
    return next(
        new AppError('Course could not be created, please try again', 500)
    )
   }

   //thumbnail upload
   if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'lms'});

    if(result){
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
    }

    await fs.promises.rm(`uploads/${req.file.filename}`);
   }
 
   await course.save();

   res.status(200).json({
    success: true,
    message: 'Course created successfully',
    course
   })
}

const updateCourse = async function(req, res, next){
  try{
     const {id} = req.params;
     const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: req.body
        },
        {
            runValidators: true
        },
        {
            new: true
        }
     );

     if(!course){
        return next(
            new AppError('Course with given id does not exist', 500)
        )
     }

     res.status(200).json({
        success: true,
        message: 'Course updated successfully!',
        course
     });

  } catch(e){
    return next(
        new AppError(e.message, 500)
    )
  }
}

const removeCourse = async function(req, res, next){
   try{
      const {id} = req.params;

      const courseId = new mongoose.Types.ObjectId(id);

      const course = await Course.findById(courseId);

      if(!course){
        return next(
            new AppError('course with the given id does not exist', 500)
        )
      };

      await Course.findByIdAndDelete(courseId);

      return res.status(200).json({
        success: true,
        message: "Course deleted successfully"
      })

   } catch(e){
       return next(
        new AppError(e.message, 500)
       )
   }
}

const addLectureToCourseById = async function(req, res, next){
    try{
        //console.log(req.body)
       const {title, description} = req.body;
       const {id} = req.params;

       if(!title || !description){
        return next(
            new AppError('All fields are required', 400)
        )
       }

       const course = await Course.findById(id);

       if(!course){
        return next(
            new AppError('course with the given id not found', 400)
        )
       }

       const lectureData = {
        title,
        description,
        lecture: {
            public_id: "DUMMY",
            secure_url: "DUMMY"
        },
        thumbnail:{
            public_id: 'DUMMY',
            secure_url: 'DUMMY'
        }
       };

       if(req.file){
        try{

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                resource_type : "auto",
            });

            if(result){
                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;
            }
            await fs.promises.rm(`uploads/${req.file.filename}`);

        } catch(e){
            return next(
                new AppError(e.message, 500)
            )
        }
       }

       course.lectures.push(lectureData);

       course.numberOfLectures = course.lectures.length;

       await course.save();

       res.status(200).json({
        success: true,
        message: 'Lecture successfully added to the course',
        course
       });

    } catch(e){
        return next(
            new AppError(e.message, 500)
        )
    }
}

const removeLectureFromCourse = asyncHandler(async (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
});


export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    removeLectureFromCourse
}