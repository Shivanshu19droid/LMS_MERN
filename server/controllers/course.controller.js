import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import fs from 'fs';
import cloudinary from 'cloudinary';
import mongoose from "mongoose";


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
        lecture: {},
        thumbnail:{
            public_id: 'DUMMY',
            secure_url: 'DUMMY'
        }
       };

       if(req.file){
        try{

            const result = await cloudinary.v2.uploader.upload(req.file.path);

            if(result){
                lectureData.thumbnail.public_id = result.public_id;
                lectureData.thumbnail.secure_url = result.secure_url;
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

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}