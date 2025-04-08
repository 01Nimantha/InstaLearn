import { createSlice } from "@reduxjs/toolkit";

const parentimageSlice = createSlice({
  name:"image",
  initialState:{imagePath:"/src/assets/ParentImg.svg"},
  reducers:{
    addImage:(state,action)=>{
      state.imagePath=action.payload
    }
  }
});

export const parentimageAction = parentimageSlice.actions;
export default parentimageSlice;
