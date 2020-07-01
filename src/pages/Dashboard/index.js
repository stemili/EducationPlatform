import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./index.css";

import { HomeOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
import apiCall from "../../service/apiCall";
import AuthService from "../../auth/AuthService";
import DataCharts from "./components/DataCharts/DataCharts";
import UsersTable from "./components/UsersTable/UsersTable";
import CoursesTable from "./components/CoursesTable/CoursesTable";

const { Content, Footer, Sider } = Layout;

class Dashboard extends Component {
  state = {
    collapsed: false,
    currentNavItem: "1",
    itemData: null,
  };

  handleNavChange = e => {
    this.setState({ currentNavItem: e.key });
  };
  componentDidMount() {
    this.props.setDashboard(true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentNavItem !== this.state.currentNavItem) {
      if (this.state.currentNavItem === "1") {
      } else if (this.state.currentNavItem === "2") {
        apiCall
          .get("/users", {
            headers: {
              authorization: AuthService.getAuthHeader(),
            },
          })
          .then(res => {
            this.setState({ itemData: res.data });
          });
      } else if (this.state.currentNavItem === "3") {
        apiCall.get("/courses").then(res => {
          this.setState({ itemData: res.data });
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.setDashboard(false);
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderDashPanel = () => {
    if (this.state.currentNavItem === "1") {
      return <DataCharts />;
    } else if (this.state.currentNavItem === "2") {
      return <UsersTable itemData={this.state.itemData} />;
    } else if (this.state.currentNavItem === "3") {
      return <CoursesTable itemData={this.state.itemData} />;
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className="dark-blue"
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={[this.state.currentNavItem]}
            mode="inline"
          >
            <Menu.Item key="1" onClick={this.handleNavChange}>
              <HomeOutlined />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.handleNavChange}>
              <UserOutlined />
              <span>Users</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={this.handleNavChange}>
              <BookOutlined />
              <span>Courses</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "16px 16px" }}>
            {this.renderDashPanel()}
          </Content>
          <Footer style={{ textAlign: "center" }}>Discite ©2020</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
