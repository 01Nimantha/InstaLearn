import { createSlice } from "@reduxjs/toolkit";

const studentSlice =createSlice({
  name:"student",
  initialState:{studentArr:[
    {
      Id: "ST_2025_10000",
      Name: "Alia Bhatt",
      Email: "abc@gmail.com",
      Number: "0767892017",
      Address: "123 Main Street, Colombo, Western Province, 10000",
      ParentName: "Soni Razdan",
      ParentNumber: "0767002087"
    }
  ]},
  reducers:{
    updateStudent:(state,action)=>{
      state.studentArr=action.payload;
    }
  }
});

export const studentAction = studentSlice.actions 
export default studentSlice;