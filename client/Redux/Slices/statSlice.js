import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
    allUserCount: 0,
    subscribedCount: 0
}

//async thunks/functions to intreact with the backend
export const getStatsData = createAsyncThunk("stats/get", async () => {
    try{
      const response = axiosInstance.get("/admin/stats/users");
      toast.promise(response, {
        loading: "Getting the stats ...",
        success: (data) => {
            return data?.data?.message
        },
        error: "Failed to load data stats"
      });
    } catch(error){
        toast.error(error?.message);
    }
})

//reducers
const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action)=> {
            state.allUserCount = action?.payload?.allUserCount;
            state.subscribedCount = action?.payload?.subscribedUsersCount;
        })
    }
});

export default statSlice.reducer;