import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name:"image",
  initialState:{imagePath:"/src/assets/StudentImg.svg"},
  reducers:{
    addImage:(state,action)=>{
      state.imagePath=action.payload
    }
  }
});

export const imageAction = imageSlice.actions;
export default imageSlice;
