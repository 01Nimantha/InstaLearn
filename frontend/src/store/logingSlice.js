import {createSlice} from "@reduxjs/toolkit"

const logingSlice = createSlice({
  name:"login",
  initialState:{id:""},
  reducers:{
    addUser:(state,action)=>{
      state.id=action.payload;
    }
  }
});

export const logingAction = logingSlice.actions
export default logingSlice;