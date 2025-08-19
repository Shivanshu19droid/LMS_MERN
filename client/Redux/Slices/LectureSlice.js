import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../src/Helpers/axiosInstance";

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
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

//function to post a new lecture
export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try{
        //formdata to store the lecture details
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response, {
            loading: "Adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        });
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

//lecture deletion
export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try{

        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`, formData);
        toast.promise(response, {
            loading: "Dleting course lecture",
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
    extraReducers: () => {}
});

export default lectureSlice.reducer;