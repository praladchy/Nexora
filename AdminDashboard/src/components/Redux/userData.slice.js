import { createSlice } from "@reduxjs/toolkit";

const userData=createSlice({
    name:"User",
    initialState:{data:null},
    reducers:{
        UserData:(state,action)=>{
            state.data=action.payload
        }
    }
})
export const {UserData}=userData.actions;
export default userData.reducer
