import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  EditOutlined,
  ApartmentOutlined,
  PercentageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PushpinOutlined,
  UserOutlined,
  DashboardOutlined,
  FileImageOutlined,
  PropertySafetyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import OrderModal from '../components/Features/Modals/OrderModal';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function DashboardScreen(props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div className="logo-dashboard">
          <Link to="/">
            <img
              src={`${process.env.REACT_APP_BASE_URL}/images/logo-footer.png`}
              alt="Logo"
              width={105}
              height={25}
            />
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<EditOutlined />} title="Posts">
            <Menu.Item key="2">All posts</Menu.Item>
            <Menu.Item key="3">Add post</Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<ApartmentOutlined />}>
            <Link to="/admin/categories">Categories</Link>
          </Menu.Item>
          <SubMenu key="sub3" icon={<FileImageOutlined />} title="Media">
            <Menu.Item key="6">All media</Menu.Item>
            <Menu.Item key="7">Add media</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<PushpinOutlined />} title="Products">
            <Menu.Item key="8">
              <Link to="/admin/products">All product</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/admin/products/add">Add product</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="12" icon={<PropertySafetyOutlined />}>
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<UserOutlined />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <SubMenu key="sub5" icon={<PercentageOutlined />} title="Coupons">
            <Menu.Item key="10">All coupon</Menu.Item>
            <Menu.Item key="11">Add coupon</Menu.Item>
          </SubMenu>
          <Menu.Item key="16" icon={<LogoutOutlined />}>
            <Link to="/admin">Sign Out</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="admin-layout">
        <Header className="admin-layout-header">
          {collapsed ? (
            <MenuUnfoldOutlined onClick={toggle} className="trigger-dashboard" />
          ) : (
            <MenuFoldOutlined onClick={toggle} className="trigger-dashboard" />
          )}
        </Header>
        <Content className="admin-layout-content">{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright © 2021 Molla Store. All Rights Reserved.
        </Footer>
        <OrderModal />
      </Layout>
    </Layout>
  );
}

export default DashboardScreen;
