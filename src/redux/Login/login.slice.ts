import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserReponse } from "../../types/login.interface";

// Define a type for the slice state
interface LoginState {
  isLogged: boolean;
  error: string;
  userInfo : {
    id: number,
    username: string
  }
}
// Define the initial state using that type
const initialState: LoginState = {
  isLogged: false,
  error: "",
  userInfo : {
    id: 1,
    username: ''
  }
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    verifyLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    loginFailedMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    getUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { verifyLogin, loginFailedMessage, getUserInfo } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isLogged = (state: RootState) => state.login.isLogged;
export const getErrorMessage = (state: RootState) => state.login.error;
export const getUser = (state: RootState) => state.login.userInfo;



export default loginSlice.reducer;
