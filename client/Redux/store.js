import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from './Slices/CourseSlice';
import LectureSliceReducer from './Slices/LectureSlice';

//all the slices will be added in the reducers section below
const dummyReducer = (state = {}, action) => state;
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        lecture: LectureSliceReducer
    },
    devTools: true
});

export default store;