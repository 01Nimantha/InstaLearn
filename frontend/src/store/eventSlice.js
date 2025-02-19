import {createSlice} from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name:"event",
  initialState:{eventarr:[
    {
      "eventId": 1,
      "eventName": "Kabaddi Tournament",
      "eventBody": "🔥 Get ready for an action-packed Kabaddi Tournament, where strength, strategy, and team spirit collide! Watch as top teams face off in electrifying matches, battling fiercely to claim the victory. The intensity on the court will keep you at the edge of your seat, as each team gives their all to emerge as champions. Don’t miss this thrilling experience!"
    },
    {
      "eventId": 2,
      "eventName": "Football Championship",
      "eventBody": "⚽ The ultimate football championship is here, bringing together the best teams from across the region! Witness high-stakes matches filled with speed, skill, and passion as players give everything they’ve got to win. Expect powerful shots, incredible saves, and unforgettable moments as teams compete for glory and the title of champions. Be part of the excitement!"
    },
    {
      "eventId": 3,
      "eventName": "Music Concert",
      "eventBody": "🎶 Get ready for a spectacular music concert like no other! Enjoy an incredible night filled with live performances from some of the most talented artists. From the first note to the final encore, this concert promises to be an unforgettable experience with captivating music, stunning visuals, and an electrifying atmosphere. It’s an event you won’t want to miss!"
    },
    {
      "eventId": 4,
      "eventName": "Science Exhibition",
      "eventBody": "🔬 Dive into the fascinating world of science at our hands-on exhibition! Experience interactive displays, live experiments, and cutting-edge innovations from various fields of science. Whether you're a student, a science enthusiast, or just curious, there’s something for everyone. Come explore, learn, and get inspired by the future of science and technology!"
    },
    {
      "eventId": 5,
      "eventName": "Coding Hackathon",
      "eventBody": "💻 Get ready to unleash your coding skills at the ultimate hackathon! Collaborate with fellow developers, solve real-world challenges, and build innovative solutions in a fast-paced, high-energy environment. Whether you’re a beginner or an experienced coder, this hackathon is the perfect opportunity to test your abilities, learn new things, and push your limits. Join us for an epic coding challenge!"
    }
  ]
  
  },
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