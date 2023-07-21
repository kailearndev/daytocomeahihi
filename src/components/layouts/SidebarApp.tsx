import { AlertOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge, Layout,
  Menu,
  MenuProps,
  theme,
  Typography
} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React from "react";

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
const urlAvt =
  "https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-1/357782820_300943715665987_8840645895291334356_n.jpg?stp=c0.42.160.160a_dst-jpg_p160x160&_nc_cat=110&cb=99be929b-3346023f&ccb=1-7&_nc_sid=7206a8&_nc_ohc=PC0zwJNiegEAX_wO1O0&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfDRrzHCXeHdPp5XqWE-pkP5nCfoTUxOw-i8wtgATSwKMw&oe=64B4838D";
const items: MenuItem[] = [
  // getItem("Navigation One", "1", <Avatar src={urlAvt} />),
  getItem("Infomation", "2", <AlertOutlined />),
  // getItem("Navigation Two", "3", <UserOutlined />),
];
const { Text } = Typography;

interface SidebarAppProps {
  children: React.ReactNode;
}

const SidebarApp: React.FC<SidebarAppProps> = (props) => {
  const { children } = props;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        }}
      >
        <div
          style={{
            height: "70px",
            width: "100%",
            display: "flex",
            padding: "1rem",
            justifyContent: "flex-start",
            backgroundColor: "InfoBackground",
            borderBottom: "1px solid whitesmoke",
            borderStyle: 'dashed'
          }}
        >
          <Avatar style={{}} src={urlAvt} size={40} />
          <Badge dot count={3}></Badge>
          <div
            style={{
              margin: "0 0 0 10px",
            }}
          >
            <h5 color="#FFFF">
              Lung Zu
            </h5>
            <Text type="secondary" ellipsis={true} code>
              aksdadksjajkajdakls
            </Text>
          </div>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "calc(100vh - 70px)", borderRight: 1 }}
          items={items}
        />
      </Sider>

      <Layout className="site-layout" style={{ marginLeft: 250 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "5px  8px 0" }}>
          <div
            style={{
              padding: 10,
              // textAlign: "center",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarApp;
