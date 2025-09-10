import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
    allUserCount: 0,
    subscribedCount: 0,
    monthlyPurchaseRecord: {}
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
      return (await response).data;
    } catch(error){
        toast.error(error?.message);
    }
})

//function to get the monthly purchase data
export const getMonthlyPurchaseData = createAsyncThunk(
  "stats/monthly",
  async (_, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.get("/payments/get-monthly-payments");

      toast.promise(promise, {
        loading: "Getting monthly purchase records...",
        success: (res) => res?.data?.message || "Fetched successfully",
        error: "Failed to get monthly purchase records",
      });

      const result = await promise;
      console.log(result.data);

      return result.data; // triggers 'fulfilled'
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



//reducers
const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action)=> {
            state.allUserCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedUsersCount;
        })
        builder.addCase(getMonthlyPurchaseData.fulfilled, (state, action) => {
            state.monthlyPurchaseRecord = action?.payload?.data;
            console.log(state.monthlyPurchaseRecord);
        })
    }
});

export default statSlice.reducer;