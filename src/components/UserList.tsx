import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Card,
  Input,
  Spin,
  Tooltip,
  Avatar,
  Select,
  Row,
  Col,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TruncateText } from "../utils/helper";

const { Search } = Input;
const { Option } = Select;

interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
    email: string;
  };
  picture: {
    thumbnail: string;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
}

const TooltipText: React.FC<{ text: string; maxLength: number }> = ({
  text,
  maxLength,
}) => <Tooltip title={text}>{TruncateText(text, maxLength)}</Tooltip>;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=30"
        );
        const fetchedUsers: User[] = response.data.results;
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newGender: string | null) => {
    setGenderFilter(newGender);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const renderTooltipText = (text: string, maxLength: number) => (
    <TooltipText text={text} maxLength={maxLength} />
  );

  const columns: ColumnsType<User> = [
    {
      title: "Profile",
      dataIndex: "picture",
      key: "avatar",
      fixed: "left",
      render: (picture: { thumbnail: string }, record: User) => (
        <Tooltip title="Profile Picture">
          <Link
            to={{
              pathname: `/user-details/${encodeURIComponent(
                JSON.stringify(record)
              )}`, // Encode the user object in the URL
              state: { user: record }, // Pass the user object in the state
            }}
          >
            <Avatar src={picture.thumbnail} alt="User Avatar" />
          </Link>
        </Tooltip>
      ),
      width: 100,
    },
    {
      title: "First Name",
      dataIndex: ["name", "first"],
      key: "first",
      sorter: (a, b) => a.name.first.localeCompare(b.name.first),
      render: (text: string) => renderTooltipText(text, 10),
    },
    {
      title: "Last Name",
      dataIndex: ["name", "last"],
      key: "last",
      sorter: (a, b) => a.name.last.localeCompare(b.name.last),
      render: (text: string) => renderTooltipText(text, 10),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => renderTooltipText(text, 30),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      onFilter: (value, record) => record.gender === value,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      (!genderFilter || user.gender === genderFilter) &&
      (!searchText ||
        user.name.first.toLowerCase().includes(searchText.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <Card
      style={{ width: "100%" }}
      title={
        <Row justify="space-between" align="middle">
          <Col>
            {`User List (${filteredUsers.length} ${
              filteredUsers.length === 1 ? "user" : "users"
            })`}
          </Col>
          <Col>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Select
                  allowClear
                  placeholder="Filter by Gender"
                  style={{ width: "100%" }}
                  onChange={handleFilterChange}
                  value={genderFilter}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Search
                  placeholder="Search by name"
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      }
    >
      <Spin spinning={loading}>
        <Table
          className="orders-table"
          scroll={{
            x: true,
          }}
          size="middle"
          showHeader
          columns={columns}
          dataSource={filteredUsers}
          // expandable={{}}
        />
      </Spin>
    </Card>
  );
};

export default UserList;



