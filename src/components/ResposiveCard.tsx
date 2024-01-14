// ResponsiveCard.tsx
import React from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  UsergroupAddOutlined,
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface ResponsiveCardProps {
  data: {
    picture: { large: string };
    name: { first: string; last: string };
    gender: string;
    email: string;
    dob: { date: string };
    phone: string;
    cell: string;
    location: {
      street: { number: number; name: string };
      city: string;
      state: string;
      country: string;
      postcode: string;
    };
    id: { value: string };
    login: { username: string };
  };
}
const renderIcon = (icon: React.ReactNode) => (
  <span style={{ marginRight: "5px" }}>{icon}</span>
);

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({ data }) => {
  return (
    <Card className="responsive-card">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6} xl={4}>
          <img
            src={data.picture.large}
            alt="User Avatar"
            style={{ width: "100%", borderRadius: "50%", objectFit: "contain" }}
          />
        </Col>
        <Col xs={24} sm={24} md={16} lg={18} xl={20}>
          <Typography.Title level={4}>
            {`${data.name.first} ${data.name.last}`}
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              {renderIcon(<UsergroupAddOutlined />)}
              <Text strong>{data.gender}</Text>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              {renderIcon(<MailOutlined />)}
              <Text strong>{data.email}</Text>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              {renderIcon(<CalendarOutlined />)}
              <Text strong>{new Date(data.dob.date).toLocaleDateString()}</Text>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              {renderIcon(<PhoneOutlined />)}
              <Text strong>{data.phone}</Text>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              {renderIcon(<PhoneOutlined />)}
              <Text strong>{data.cell}</Text>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {renderIcon(<EnvironmentOutlined />)}
              <Text strong>
                {`${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.country}, ${data.location.postcode}`}
              </Text>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {renderIcon(<IdcardOutlined />)}
              <Text strong>{data.id.value}</Text>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {renderIcon(<UserOutlined />)}
              <Text strong>{data.login.username}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ResponsiveCard;
