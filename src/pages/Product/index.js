import React, { createRef, useState } from "react";
import { Breadcrumb, Col, Menu, Row } from "antd";
import {
  FolderOpenTwoTone,
  SettingTwoTone,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards";
import { Link } from "react-router-dom";
import { findProductByPrice, getProductBySlug } from "../../redux/actions";

const { SubMenu } = Menu;

function Product() {
  const slug = window.location.pathname;

  const [num1, setNum1] = useState(8);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const list = product.productBySlug;

  const renderList = (products, limit) => {
    let list = [];
    let i = 0;
    for (let prod of products) {
      if (i < limit) {
        list.push(
          <Col className="card" span={6} key={prod._id}>
            <Cards key={prod._id} data={prod} />
          </Col>
        );
        i++;
      }
    }
    return list;
  };

  const renderCategories = (categories) => {
    let cat = [];
    for (let category of categories) {
      cat.push(
        <>
          <SubMenu
            ref={createRef()}
            key={category.name}
            icon={<SettingTwoTone />}
            title={category.name}
          >
            {category.parenId > 0 ? (
              <Menu.Item key={category.name}>{category.name}</Menu.Item>
            ) : (
              renderChildrenMenu(category.children)
            )}
          </SubMenu>
        </>
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
            key={child.name}
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

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0", textTransform: "uppercase" }}
        key="sub"
      >
        <Breadcrumb.Item key="sub2">{`${slug.split("/")[1]}/${
          slug.split("/")[2]
        }`}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[16, 24]} key="sub3">
        <Col span={5} style={{ marginTop: "1rem" }}>
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["Laptop"]}
            mode="inline"
          >
            {renderCategories(category.categories)}
            <SubMenu
              key="sub4"
              icon={<FolderOpenTwoTone />}
              title="Giá sản phẩm"
            >
              <Menu.Item key="5">
                <Link
                  key="price10"
                  to={`${slug}?_lt=10`}
                  onClick={() => dispatch(findProductByPrice(`${slug}?_lt=10`))}
                >
                  dưới 10 triệu
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link
                  to={`${slug}?_lte=10&_gte=15`}
                  onClick={() =>
                    dispatch(findProductByPrice(`${slug}?_lte=10&_gte=15`))
                  }
                >
                  từ 10 triệu - 15 triệu
                </Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link
                  to={`${slug}?_gt=15`}
                  onClick={() => dispatch(findProductByPrice(`${slug}?_gt=15`))}
                >
                  trên 15 triệu
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={19}>
          <section key="1">
            <div className="title-pass">
              <div className="title-content">{slug.split("/")[2]}</div>
            </div>
            <Row gutter={[16, 24]}>
              {renderList(list === undefined ? [] : list, num1)}
              <div
                className="show-list"
                onClick={() => setNum1(num1 < 40 ? num1 + 8 : num1)}
              >
                Xem thêm <DoubleRightOutlined />
              </div>
            </Row>
          </section>
        </Col>
      </Row>
    </>
  );
}

export default Product;
