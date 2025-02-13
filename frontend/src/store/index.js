import {configureStore, createSlice} from "@reduxjs/toolkit"

const testSlice = createSlice({
  name:"test",
  initialState:{testVal:0},
  reducers:{
    increment:(state,action)=>{
        console.log(state,action);
    },
    decrement:(state,action)=>{
        console.log(state,action);
    }
  }
});

const mystore=configureStore({reducer:{
  testreducer:testSlice.reducer
}});

export const testAction = testSlice.actions;
export default mystore;