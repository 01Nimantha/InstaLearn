import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
  name:"user",
  initialState:{userArr:[
    {
      Id: "SC12405",
      Name: "Alia Bhatt",
      Email: "abc@gmail.com",
      Number: "076 789 2017",
      Address: "123 Main Street, Colombo, Western Province, 10000",
      ParentName: "Soni Razdan",
      ParentNumber: "076 700 2087"
    }
  ]},
  reducers:{
    updateUser:(state,action)=>{
      state.userArr=action.payload;
    }
  }
});

export const userAction = userSlice.actions 
export default userSlice;