import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import stripeSliceReducer from "./Slices/sripeSliceReducer";
import statSliceReducer from "./Slices/statSlice";

//all the slices will be added in the reducers section below
const dummyReducer = (state = {}, action) => state;
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: LectureSliceReducer,
    stripe: stripeSliceReducer,
    stat: statSliceReducer,
  },
  devTools: true,
});

export default store;
