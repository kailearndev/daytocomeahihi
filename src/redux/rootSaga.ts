import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import loginSaga from "../auth/loginSaga";

export default function* rootSaga() {
  yield all([loginSaga()]);
}
