import { Avatar, Col, Descriptions, Row, Space } from "antd";
import React from "react";
import { Typography } from "antd";

const { Text, Link } = Typography;
const User: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={12}>
        <div style={{}}>col-12</div>
      </Col>
      <Col className="gutter-row" span={12}>
        <Row>
          <Col className="gutter-row" span={24}>
            24
          </Col>
          <Col className="gutter-row" span={24}>
            24
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default User;
