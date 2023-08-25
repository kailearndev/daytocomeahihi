import {
  AlertOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Badge,
  Dropdown,
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
import { Link, Outlet } from "react-router-dom";
import { getUserInfo, setUserInfo } from "../redux/Login/login.slice";
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
const onClick: MenuProps["onClick"] = ({ key }) => {
  // message.info(`Click on item ${key}`);
};
const LayoutApp: React.FC<SidebarAppProps> = (props) => {
  const dispatch = useDispatch();
  const useInfomation = useSelector(getUserInfo);
  useEffect(() => {
    const handleVerifyToken = async () => {
      const res: UserInfoReponse = await AuthService.tokenVerify(
        Cookies.get("_Token")
      );
      dispatch(setUserInfo(res));
      // setUserInfo(res.username);
    };
    handleVerifyToken();
  }, []);
  const itemsUser: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
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
            <Avatar shape="square" size={40}></Avatar>
            <Badge size="small" dot color="green"></Badge>
            {`${helloUser()}"${useInfomation.username}"`}
          </Space>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
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
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
