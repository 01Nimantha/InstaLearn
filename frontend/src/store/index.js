import {configureStore, createSlice} from "@reduxjs/toolkit"
import logingSlice from "./logingSlice";
import eventSlice from "./eventSlice";
import quizSlice from "./quizSlice";
import userSlice from "./userSlice";

const testSlice = createSlice({
  name:"test",
  initialState:{testVal:5},
  reducers:{
    increment:(state)=>{
      state.testVal++;
    },
    decrement:(state,action)=>{
        console.log(state,action);
    }
  }
});

const mystore=configureStore({reducer:{
  testreducer:testSlice.reducer,
  logingreducer: logingSlice.reducer,
  eventreducer: eventSlice.reducer,
  quizreducer: quizSlice.reducer,
  userreducer: userSlice.reducer
}});

export const testAction = testSlice.actions;
export default mystore;