import Cookies from "js-cookie";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import AuthService from "../services/auth.service";
import { getUser } from "../redux/Login/login.slice";

function* getUserInfo(): any {
  const token = Cookies.get("_TOKEN");
  const user = yield call(AuthService.tokenVerify, token);
  yield put(
    getUser({
      id: user.id,
      username: user.username,
    })
  );
}

export default function* loginSaga() {
  yield takeEvery(getUser, getUserInfo);
}
