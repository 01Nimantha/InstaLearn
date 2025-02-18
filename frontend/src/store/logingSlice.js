import {createSlice} from "@reduxjs/toolkit"

const logingSlice = createSlice({
  name:"login",
  initialState:{userId:"SC12405",email:"123@gmail.com"},
  reducers:{
    addUser:(state,action)=>{
      state.email=action.payload.email;
      state.userId=action.payload.userId;
    }
  }
});

export const logingAction = logingSlice.actions
export default logingSlice;