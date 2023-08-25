import { Button, Card, Checkbox, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AlertComponent } from "../components/AlertComponent";
import { useAppDispatch } from "../redux/hook";
import AuthService from "../services/auth.service";
import Cookies from "js-cookie";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    const res = await AuthService.Login({
      username: values.username,
      password: values.password,
    });
    if (res && res.access_token) {
      Cookies.set("_TOKEN", res.access_token, { expires: 1 });
      if (res.access_token) {
        AlertComponent({
          type: "success",
          content: "Login Success",
        });
        navigate("/");
      }
    } else {
      AlertComponent({
        type: "error",
        content: "Please check User and Password !!",
      });
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space direction="vertical" size={16}>
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                height={55}
                src={logo}
                style={{
                  marginTop: 22,
                }}
              />
            </div>
          }
          headStyle={{
            height: 100,
            border: "unset",
          }}
          style={{
            width: 500,
            height: 350,
            borderRadius: 10,
            boxShadow: "10px",
          }}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 400 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                {/* <Button type="primary" color="" htmlType="button">
                  Register
                </Button> */}
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default Login;
