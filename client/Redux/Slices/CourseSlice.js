import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../src/Helpers/axiosInstance";
import {toast} from 'react-hot-toast'

//step-1: define the initial state
const initialState = {
    courseData: []
}

//step-3: define the functions using async thunk
export const getAllCourses = createAsyncThunk('course/get', async() => {
   try{
    const response = axiosInstance.get('/courses');
    toast.promise(response, {
        loading: "Loading course data ...",
        success: "Courses loaded successfully!",
        error: "Failed to get the course"
    });
    
    return (await response).data.courses;
    
   } catch(error){
    toast.error(error?.response?.data?.message);
    throw error;
   }
});

//creating a function to create a new course
export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try{

        let formData = new FormData();
        formData.append('title', data?.title);
        formData.append('description', data?.description);
        formData.append('category', data?.category);
        formData.append('createdBy', data?.createdBy);
        formData.append('thumbnail', data?.thumbnail);

        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create the course"
        });

        return (await response).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

//step-2: define the slice
const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
          builder.addCase(getAllCourses.fulfilled, (state, action) => {
              if(action.payload){
                console.log(action.payload)
                state.courseData = [...action.payload];
              }
          })
    }
});

export default courseSlice.reducer;