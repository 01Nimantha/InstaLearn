import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name:"quiz",
  initialState:{quizArr:[
    {
      "Id": 1,
      "Duration": "08.00am-10.00am",
      "Date": "2025-03-24",
      "Mark": "25%"
    },
    {
      "Id": 2,
      "Duration": "10.00am-12.00pm",
      "Date": "2025-03-25",
      "Mark": "50%"
    },
    {
      "Id": 3,
      "Duration": "01.00pm-03.00pm",
      "Date": "2025-03-26",
      "Mark": "40%"
    },
    {
      "Id": 4,
      "Duration": "03.00pm-05.00pm",
      "Date": "2025-03-27",
      "Mark": "95%"
    },
    {
      "Id": 5,
      "Duration": "08.00am-10.00am",
      "Date": "2025-03-28",
      "Mark": "60%"
    },
    {
      "Id": 6,
      "Duration": "10.00am-12.00pm",
      "Date": "2025-03-29",
      "Mark": "55%"
    },
    {
      "Id": 7,
      "Duration": "01.00pm-03.00pm",
      "Date": "2025-03-30",
      "Mark": "20%"
    },
    {
      "Id": 8,
      "Duration": "03.00pm-05.00pm",
      "Date": "2025-03-31",
      "Mark": "80%"
    },
    {
      "Id": 9,
      "Duration": "08.00am-10.00am",
      "Date": "2025-04-01",
      "Mark": "65%"
    },
    {
      "Id": 10,
      "Duration": "10.00am-12.00pm",
      "Date": "2025-04-02",
      "Mark": "70%"
    },
    {
      "Id": 11,
      "Duration": "01.00pm-03.00pm",
      "Date": "2025-04-03",
      "Mark": "60%"
    },
    {
      "Id": 12,
      "Duration": "03.00pm-05.00pm",
      "Date": "2025-04-04",
      "Mark": "75%"
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