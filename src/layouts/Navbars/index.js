import React, { createRef } from "react";
import { Layout, Menu, Input, Space, message } from "antd";
import "./index.css";
import {
  AudioOutlined,
  RollbackOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signin from "../Signin";
import Signup from "../Signup";
import { getProductBySlug, isLogin } from "../../redux/actions";
import User from "../../pages/User";

const { Search } = Input;
const { SubMenu } = Menu;

const { Header, Content, Footer } = Layout;

function Navbars(props) {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let cat = [];
    for (let category of categories) {
      cat.push(
        <SubMenu ref={createRef()} key={category.name} title={category.name}>
          <Menu.ItemGroup key={category.name} title={category.name}>
            {category.parenId > 0 ? (
              <Menu.Item key={category.name}>{category.name}</Menu.Item>
            ) : (
              renderChildrenMenu(category.children)
            )}
          </Menu.ItemGroup>
        </SubMenu>
      );
    }
    return cat;
  };

  const renderChildrenMenu = (children) => {
    let cat = [];
    for (let child of children) {
      cat.push(
        <Menu.Item key={child.name}>
          <Link
            to={`/store/${child.slug}`}
            onClick={() => dispatch(getProductBySlug(child.slug))}
          >
            {child.name}
          </Link>
        </Menu.Item>
      );
    }
    return cat;
  };
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const onSearch = (value) => console.log(value);

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo">Laptop</div>
          <div className="search">
            <Space direction="vertical">
              <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
              />
            </Space>
          </div>

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            {category.categories.length > 0
              ? renderCategories(category.categories)
              : null}
            <div className="action">
              <span
                style={{ fontSize: "1rem", color: "#fff", marginRight: "1rem" }}
              >
                <Link to="/cart">
                  <ShoppingCartOutlined />
                  &nbsp;{cart.basketNumber}
                </Link>
              </span>
              {auth.authenticate ? (
                <>
                  <User nameBtn={`Chào: ${auth.user.lastName}`} />
                  <span
                    style={{ marginLeft: "1rem", cursor: "pointer" }}
                    onClick={() => {
                      setTimeout(() => {
                        message.success("Đăng xuất thành công");
                        dispatch(isLogin());
                      }, 1000);
                    }}
                  >
                    Thoát &nbsp;
                    <RollbackOutlined />
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <Signin />
                  </span>
                  <span>
                    <Signup />
                  </span>
                </>
              )}
            </div>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Laptop Website ©2021 Created by Lê Đức Thịnh
        </Footer>
      </Layout>
    </>
  );
}

export default Navbars;
