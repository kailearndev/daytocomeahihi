import {
  AlertOutlined,
  CustomerServiceOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Badge,
  Dropdown,
  FloatButton,
  Image,
  Layout,
  Menu,
  MenuProps,
  message,
  Space,
} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Playback from "../components/Playback";
import { getAvatar, getUser, getUserInfo } from "../redux/Login/login.slice";
import AuthService from "../services/auth.service";
import { UserInfoReponse } from "../types/login.interface";
import { helloUser } from "../ultils/helloUser";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

interface SidebarAppProps {
  children?: React.ReactNode;
  // userInfo: any;
}

const LayoutApp: React.FC<SidebarAppProps> = (props) => {
  const navigate = useNavigate();
  const avt = useSelector(getAvatar);
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // dispatch(setItemMenu(key));
  };
  const items: MenuItem[] = [
    getItem(
      "Day Infomation",
      "1",
      <Link to={"/"}>
        <AlertOutlined />
      </Link>
    ),
    getItem(
      "User Profile",
      "2",
      <Link to={"/user"}>
        <UserOutlined />
      </Link>
    ),
  ];
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        width={250}
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            height: "70px",
            width: "100%",
            display: "flex",
            padding: "1rem",
            backgroundColor: "InfoBackground",
            borderBottom: "1px solid whitesmoke",
            // borderStyle: "dashed",
          }}
        >
          <Space>
            <Image
              style={{
                borderRadius: 5,
              }}
              width={50}
              src={avt}
              preview={{
                mask: false,
              }}
            ></Image>
            <Badge size="small" dot color="green"></Badge>
            {`${helloUser()}`}
          </Space>
        </div>

        <Menu
          onClick={onClick}
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "calc(100vh - 70px)", borderRight: 2 }}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          margin: "10px 0 0 250px",
          padding: 15,
          backgroundColor: "#f4f6f9",
        }}
      >
        <FloatButton
          shape="circle"
          type="default"
          style={{
            top: 20,
            left: 200,
          }}
          icon={<CustomerServiceOutlined />}
        />
        <Content>
          <Outlet />
        </Content>
        {/* <Playback /> */}
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
