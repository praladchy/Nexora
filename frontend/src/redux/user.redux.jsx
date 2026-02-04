import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({

  name: "user",
  initialState: { data: null },
  reducers: {
    userLogin: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
