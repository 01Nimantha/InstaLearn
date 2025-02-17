import {createSlice} from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name:"event",
  initialState:{eventarr:[{
    eventId:1,
    eventName:"Kabaddi event",
    eventBody:"🔥 Get ready for an action-packed Kabaddi Tournament filled with strength, strategy, and spirit! Witness thrilling matches as top teams battle it out for victory! Witness thrilling matches as top teams battle itWitness thrilling matches as top teams battle it out for victory! Witness thrilling matches as top teams battle it out for victory! out for victory! Witness thrilling matches as top teams battle it out for victory!Witness thrilling matches as top teams battle it out for victory! Witness thrilling matches as top teams battle it out for victory!"
  }]},
  reducers:{
    addEvent:(state,action)=>{
      //state.eventarr=[...state.eventarr,action.payload];
      state.eventarr.push(action.payload);
    },
    removeEvent:(state,action)=>{
      state.eventarr=state.eventarr.filter((item)=>item.eventId!==action.payload.eventId);
    }
  }
});

export const eventAction = eventSlice.actions;
export default eventSlice;