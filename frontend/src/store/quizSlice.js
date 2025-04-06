import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name:"quiz",
  initialState:{quizArr:[
    {
      "id": 1,
      "duration": "08.00am-10.00am",
      "date": "2025-03-24",
    },{
      "id": 2,
      "duration": "08.00am-10.00am",
      "date": "2025-03-24",
    },{
      "id": 3,
      "duration": "08.00am-10.00am",
      "date": "2025-03-24",
    },{
      "id": 4,
      "duration": "08.00am-10.00am",
      "date": "2025-03-24",
    }
]

  },
  reducers:{
    addQuiz:(state,action)=>{
      state.quizArr.push(action.payload);
    },
    removeQuize:(state,action)=>{
      state.quizArr=[state.quizArr.filter((item)=>item.id!==action.payload.id)]
    },
    updateQuize:(state,action)=>{
      state.quizArr=action.payload;
    }
  }
});

export const quizAction = quizSlice.actions;
export default quizSlice;