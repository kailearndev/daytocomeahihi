import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfoReponse } from "../../types/login.interface";

// Define a type for the slice state
interface LoginState {
  avatar?: string | undefined;
  isLogged: boolean;
  error: string;
  userInfo?: UserInfoReponse;
}
// Define the initial state using that type
const initialState: LoginState = {
  avatar: undefined,
  isLogged: false,
  error: "",
  userInfo: undefined,
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
    getUser: (state, action: PayloadAction<UserInfoReponse>) => {
      state.userInfo = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.avatar = action.payload;
    },
  },
});

export const { verifyLogin, loginFailedMessage, getUser, setAvatar } =
  loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isLogged = (state: RootState) => state.login.isLogged;
export const getErrorMessage = (state: RootState) => state.login.error;
export const getUserInfo = (state: RootState) => state.login.userInfo;
export const getAvatar = (state: RootState) => state.login.avatar;

export default loginSlice.reducer;
