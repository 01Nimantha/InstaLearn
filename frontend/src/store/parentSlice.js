import { createSlice } from "@reduxjs/toolkit";

const parentSlice =createSlice({
  name:"student",
  initialState:{parentArr:[
    {
      Id: "ST_2025_10000",
      Name: "Kim Tae-hyung",
      Email: "kimtae-hyung@gmail.com",
      Number: "0767892017",
      Address: "123 Main Street, Colombo, Western Province, 10000",
      ParentName: "Soni Razdan",
      ParentNumber: "0767002087"
    }
  ]},
  reducers:{
    updateparent:(state,action)=>{
      state.parentArr=action.payload;
    }
  }
});

export const parentAction = parentSlice.actions 
export default parentSlice;