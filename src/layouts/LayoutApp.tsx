import { AlertOutlined, PoweroffOutlined } from "@ant-design/icons";

import {
  Avatar,
  Badge,
  Layout,
  Menu,
  MenuProps
} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Profile from "../components/Profile";

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
}

const LayoutApp: React.FC<SidebarAppProps> = (props) => {
  const items: MenuItem[] = [
    getItem(
      "Infomation",
      "1",
      <Link to={"/"}>
        <AlertOutlined />
      </Link>
    ),
    getItem("Navigation Two", "2", <PoweroffOutlined />),
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
         <Profile/>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "calc(100vh - 70px)", borderRight: 1 }}
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
