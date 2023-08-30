import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Space,
  Spin,
  Tag,
  Upload,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserInfo } from "../redux/Login/login.slice";
import { UserInfoRes } from "../types/user.interface";
import UploadImageService from "../services/uploadImage.service";

const { Text, Link } = Typography;
const { Meta } = Card;
type FieldType = {
  username?: string;
  oldPwd?: string;
};

const User: React.FC = () => {
  const user = useSelector(getUserInfo);
  const [userInfo, setUserInfo] = useState<UserInfoRes>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileValid, setFileValid] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<any>();
  const [avatarDetail, setAvatarDetail] = useState<any>();
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const fetchUserInfo = async () => {
    const res = await UserService.getUserInfo(user?.id);
    setUserInfo(res);
  };
  useEffect(() => {
    if (user?.id === undefined) {
      return;
    }
    fetchUserInfo();
  }, [user?.id]);

  const handleUploadAvatar = async () => {
    setUploading(true);
    const res = await UploadImageService.uploadImage({
      image: avatarUrl,
      key: "0225911f830d8e199d9f0489db3878be",
    });
    setAvatarDetail(res.data);
    setUploading(false);
  };

  const props: UploadProps = {
    multiple: false,
    maxCount: 1,
    onChange(info) {
      if (info.fileList[0].originFileObj) {
        console.log(info.fileList[0].originFileObj.size);
        const size = 20000000;
        if (info.fileList[0].originFileObj.size < size) {
          setAvatarUrl(info.file.originFileObj);
          setFileValid(false);
        } else {
          setFileValid(true);
          message.error("Size Too Late");
        }
      }
    },
    customRequest: !fileValid ? handleUploadAvatar : undefined,
    itemRender() {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Progress
            percent={uploading ? 0 : 100}
            showInfo={true}
            size="default"
            status={fileValid ? "exception" : "success"}
            success={{
              percent: uploading ? 0 : 100,
              strokeColor: "#F82",
            }}
          />
        </div>
      );
    },
    showUploadList: {
      showPreviewIcon: false,
      showDownloadIcon: false,
      showRemoveIcon: true,
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values: any) => {
    const res = await UserService.updateUser(user?.id, {
      avatar: avatarDetail.thumb.url ?? userInfo?.avatar,
      avatarName: avatarDetail.image.name,
      username: values.username,
      password: values.oldPwd,
    });
    if (res) {
      dispatch(
        getUser({
          id: res?.id,
          username: res?.username,
        })
      );
      message.success("Change Info Sucess");
      setIsModalOpen(false);
      fetchUserInfo();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  return (
    <Row
      gutter={16}
      style={{
        borderRadius: 10,
        minHeight: "20vh",
        padding: 6,
        boxShadow: "",
        // backgroundColor: "#FFF",
      }}
    >
      <Col className="gutter-row" span={24}>
        <Row gutter={16} style={{}}>
          <Col className="gutter-row" span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderRadius: 10,
                height: "300px",
              }}
            >
              <Space direction="vertical" size={"middle"}>
                <Avatar
                  alt={userInfo?.avatarName}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                  src={userInfo?.avatar}
                />
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Tag color="geekblue-inverse">Name</Tag>
                  <Tag color="volcano">@{userInfo?.username}</Tag>
                </div>
                <div>
                  <Button
                    onClick={showModal}
                    size="small"
                    type="dashed"
                    color="#FF8"
                  >
                    Change Infomation
                  </Button>
                </div>
              </Space>
            </div>
          </Col>

          <Col className="gutter-row" span={16}>
            <Row gutter={[12, 12]} style={{}}>
              <Col className="gutter-row" span={24}>
                <div
                  style={{
                    borderRadius: 10,
                  }}
                >
                  <Card
                    title="Default size card"
                    extra={<a href="#">More</a>}
                    style={{ width: 500 }}
                  >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={24}>
                <div
                  style={{
                    // padding: "10px",
                    // backgroundColor: "#FFF",
                    borderRadius: 10,
                    height: 200,
                    // width: "100%",
                  }}
                >
                  <Card
                    title="Default size card"
                    extra={<a href="#">More</a>}
                    style={{ width: 500 }}
                  >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Modal
        title="Change User Infomation"
        open={isModalOpen}
        closeIcon={false}
        footer
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400 }}
          initialValues={{
            username: userInfo?.username,
            avatar: userInfo?.avatar,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="oldPwd"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType> label="Avatar" name="avatar">
            <Upload {...props} listType="text" accept=".png, .jpg, .jpeg">
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space size={"large"}>
              <Button onClick={handleCancel} danger>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default User;
