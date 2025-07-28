import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-hot-toast'
import axiosInstance from '../../src/Helpers/axiosInstance';

//define the initial state to be used in the slice
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== undefined ? JSON.parse(localStorage.getItem('data')) : {}   //used JSON.parse so that the data stored in redux stays in json form even after refreshing the page

};

//async thunk to handle account creation, and then this action will be dispatched to the redux on signup, dispatch is defined in the signUp page
export const createAccount = createAsyncThunk('/auth/signup', async(data) => {
    try{
       const resPromise = axiosInstance.post('user/register', data);
       const res = await toast.promise(resPromise, {
        loading: 'Please wait while we are creating your account!',
        success: (res) => {
            return res?.data?.message;
        },
        error: 'Failed to create account'
       })
       //console.log(res.data);
       return res.data;
    } catch(error){
        toast.error(error?.response?.data?.message);
    }
});

//async thunk to handle login,then this action will be dispached to redux
export const login = createAsyncThunk('/auth/login', async(data) => {
    try{
       const resPromise = axiosInstance.post('user/login', data);
       const res = await toast.promise(resPromise, {
        loading: 'Please wait ! Authentication in progress ...',
        success: (res) => {
            return res?.data?.message;
        },
        error: 'Failed to log in'
       })
       //console.log(res.data);
       return res.data;
    } catch(error){
        toast.error(error?.response?.data?.message);
    }
}); 

//inside this we will use a builder parameter to define the actions which have not been defined inside the slice - for example updating the states based on the status of promise
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;

        })
        //we need to add one more case to clear the local storage data when the user logs out
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })

        
    }

    
});

//async thunk to handle logout
    export const logout = createAsyncThunk('/auth/logout', async() => {
        try{
            const resPromise = axiosInstance.get('/user/logout');
            const res = await toast.promise(resPromise, {
                loading: 'PLease wait ! Logout in progress ...',
                success: (res) => {
                    return(res?.data?.message);
                },
                error: 'Failed to logout'
            });
            return res.data;
        } catch(error){
            toast.error(error?.response?.data?.message);
        }
    });

//async thunk to handle profile update
    export const updateProfile = createAsyncThunk('/user/update/profile', async({id, data}) => {
        try{
            const res = axiosInstance.post(`/user/update/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            toast.promise(res, {
                loading: "Wait! profile update in progress...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to update profile"
            });
            return (await res).data;
        } catch(error) {
            toast.error(error?.response?.data?.message);
            
        }
    });

//now sicne the user data is updated, the whole app will be needed to be refreshed to save the changes for the entire app - so we create another async thunk to fetch user data from the server, when the user data is fetched then we will do a state update
export const getUserData = createAsyncThunk("/user/details", async() => {
    try{
        const res = axiosInstance.get('user/me');
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})





export const {} = authSlice.actions;
export default authSlice.reducer;