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