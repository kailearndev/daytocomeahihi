import apiSetting from "./api";

const Login = async (body: { username?: string; password?: string }) => {
  try {
    const respone = await apiSetting.post("auth/login", body);
    return respone.data;
  } catch (error) {}
};

const tokenVerify = async (token: string | undefined | null) => {
  try {
    const respone = await apiSetting.get("auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respone.data;
  } catch (error) {
    throw new Error();
  }
};

const AuthService = {
  Login,
  tokenVerify,
};

export default AuthService;
