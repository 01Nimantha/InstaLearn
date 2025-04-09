import {configureStore, createSlice} from "@reduxjs/toolkit"
import logingSlice from "./logingSlice";
import eventSlice from "./eventSlice";
import quizSlice from "./quizSlice";
import studentSlice from "./studentSlice";
import imageSlice from "./imageSlice";
import quistionSlice from "./quistionSlice";
import parentimageSlice from "./parentimageSlice";
import parentSlice from "./parentSlice";



const mystore=configureStore({reducer:{
  logingreducer: logingSlice.reducer,
  eventreducer: eventSlice.reducer,
  quizreducer: quizSlice.reducer,
  studentreducer: studentSlice.reducer,
  imagereducer: imageSlice.reducer,
  quistionreducer: quistionSlice.reducer,
  parentimagereducer: parentimageSlice.reducer,
  parentreducer: parentSlice.reducer,
}});


export default mystore;