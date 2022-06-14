import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  auth: boolean;
}

const initialState: IInitialState = {
  auth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});

export const { changeAuthStatus } = authSlice.actions;
export default authSlice.reducer;
