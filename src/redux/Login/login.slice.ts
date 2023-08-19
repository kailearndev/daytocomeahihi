import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface LoginState {
  token: string;
  error: string;
}
// Define the initial state using that type
const initialState: LoginState = {
  token: "",
  error: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    verifyLogin: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    loginFailedMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { verifyLogin, loginFailedMessage } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getToken = (state: RootState) => state.login.token;
export const getErrorMessage = (state: RootState) => state.login.error;

export default loginSlice.reducer;
