import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name:"quiz",
  initialState:{quizArr:[
    {
      "Id": 1,
      "Duration": "08.00am-10.00am",
      "Date": "2025-03-24",
      "Mark": "90%"
    },
    {
      "Id": 2,
      "Duration": "10.00am-12.00pm",
      "Date": "2025-03-25",
      "Mark": "85%"
    },
    {
      "Id": 3,
      "Duration": "01.00pm-03.00pm",
      "Date": "2025-03-26",
      "Mark": "92%"
    },
    {
      "Id": 4,
      "Duration": "03.00pm-05.00pm",
      "Date": "2025-03-27",
      "Mark": "88%"
    },
    {
      "Id": 5,
      "Duration": "08.00am-10.00am",
      "Date": "2025-03-28",
      "Mark": "63%"
    }
  ]
  },
  reducers:{
    addQuiz:(state,action)=>{
      state.quizArr.push(action.payload);
    },
    removeQuize:(state,action)=>{
      state.quizArr=[state.quizArr.filter((item)=>item.Id!==action.payload.Id)]
    }
  }
});

export const quizAction = quizSlice.actions;
export default quizSlice;