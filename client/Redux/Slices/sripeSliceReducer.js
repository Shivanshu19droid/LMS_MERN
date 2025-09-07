import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../src/Helpers/axiosInstance";
import toast from "react-hot-toast";
import { getUserData } from "./AuthSlice";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerfied: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getStripeApiKey = createAsyncThunk("/stripe/getKey", async () => {
    try{
        const response = await axiosInstance.get("/payments/stripe-key");
        return response.data;
    } catch(error){
        toast.error("Failed to load data");
    }
});

export const purchaseCourseBundle = createAsyncThunk("purchaseCourse", async () => {
    try{
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk("payments/verify", async (subscription_id) => {
    try{
        const response = await axiosInstance.post("/payments/verify", {
            subscription_id
        });
        return response.data;
    } catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const getPaymentRecord = createAsyncThunk("payments/record", async () => {
    try{
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get payment records"
        })
        return (await response).data;
    } catch(error){
        toast.error("Operation failed");
    }
});

export const cancelCourseBundle = createAsyncThunk("payments/cancel", async () => {
    try{
        const response = axiosInstance.get("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Processing cancellation",
            success: "Cancellation successful",
            error: "Failed to unsubscribe"
        })
        return (await response).data;
    } catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const getSubscriptionId = createAsyncThunk("payments/getSubscription_id", async(sessionId) => {
    try{
        const response = axiosInstance.get(`/payments/get-subscription?session_id=${sessionId}`);
        toast.promise(response, {
            loading: "Processing your request",
            success: "Subscription Active",
            error:"Failed to create subscription"
        })
        return(await response).data;
    } catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const stripeSlice = createSlice({
    name: "stripe",
    initialState,
    reducers: {},  //to handle synchronous actions
    extraReducers: (builder) => {  //extra reducers to handle async actions
      builder
      .addCase(getStripeApiKey.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        //state.subscription_id = action?.payload?.subscription_id;
        //state.clientSecret = action?.payload?.clientSecret;
        state.sessionId = action?.payload?.id;
        state.checkouturl = action?.payload?.url;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerfied = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerfied = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      })
      .addCase(getSubscriptionId.fulfilled, (state, action) => {
        state.subscriptionId = action?.payload?.subscriptionId;
        state.status = "active";
        state.isPaymentVerfied = true;
      })
    }

})

export default stripeSlice.reducer;