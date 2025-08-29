import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../src/Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures: []
}

//function to fetch the lecture
export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cid) => {
    try{
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "Failed to load the lectures"
        });
        //console.log(await response);
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

//function to post a new lecture
export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data, {rejectWithValue}) => {
    try{
        //formdata to store the lecture details
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const promise = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(promise, {
            loading: "Adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        });
        const response = await promise;
        return response;
    } catch(error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

//lecture deletion
export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try{
        console.log(data);
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "Deleting course lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete the lectures"
        });
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

const lectureSlice = createSlice ({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
            //console.log(action?.payload);
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
    }
});

export default lectureSlice.reducer;