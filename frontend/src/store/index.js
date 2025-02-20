import {configureStore, createSlice} from "@reduxjs/toolkit"
import logingSlice from "./logingSlice";
import eventSlice from "./eventSlice";
import quizSlice from "./quizSlice";
import studentSlice from "./studentSlice";
import imageSlice from "./imageSlice";
import quistionSlice from "./quistionSlice";


const mystore=configureStore({reducer:{
  logingreducer: logingSlice.reducer,
  eventreducer: eventSlice.reducer,
  quizreducer: quizSlice.reducer,
  studentreducer: studentSlice.reducer,
  imagereducer: imageSlice.reducer,
  quistionreducer: quistionSlice.reducer
}});

export default mystore;