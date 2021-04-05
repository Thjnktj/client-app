import React, { useState } from "react";
import { Breadcrumb, Carousel, Col, Row } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import "./index.css";
import Cards from "../../components/Cards";
import { useSelector } from "react-redux";

function Home() {
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(4);
  const [num3, setNum3] = useState(4);

  const product = useSelector((state) => state.product);

  const cheap = product.find.cheap;
  const midrange = product.find.midrange;
  const luxury = product.find.luxury;

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
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }} key="1">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
      </Breadcrumb>
      <Carousel autoplay key="2" style={{ marginBottom: "1rem" }}>
        <div>
          <img
            src="https://i1.wp.com/clicktomart.com/wp-content/uploads/2018/08/brand-page-banner-Dell-1.jpg?ssl=1"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://laptopvang.com/wp-content/uploads/2019/01/dell-banner.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://banlaptopgiare.com/wp-content/uploads/2019/12/dell-precision-m4800.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://cohotech.vn/wp-content/uploads/2019/07/dell-banner-2-1.jpg"
            alt=""
          />
        </div>
      </Carousel>
      <section key="3">
        <div className="title-pass">
          <div className="title-content">Sản phẩm giá rẻ</div>
        </div>
        <Row gutter={[16, 24]}>
          {renderList(cheap === undefined ? [] : cheap, num1)}
          <div
            className="show-list"
            style={{ cursor: "pointer" }}
            onClick={() => setNum1(num1 < 8 ? num1 + 4 : num1)}
          >
            Xem thêm <DoubleRightOutlined />
          </div>
        </Row>
      </section>
      <section key="4">
        <div className="title-pass">
          <div className="title-content">Sản phẩm tầm chung</div>
        </div>
        <Row gutter={[16, 24]}>
          {renderList(midrange === undefined ? [] : midrange, num2)}
          <div
            className="show-list"
            style={{ cursor: "pointer" }}
            onClick={() => setNum2(num2 < 8 ? num2 + 4 : num2)}
          >
            Xem thêm <DoubleRightOutlined />
          </div>
        </Row>
      </section>
      <section key="5">
        <div className="title-pass">
          <div className="title-content">Sản phẩm cao cấp</div>
        </div>
        <Row gutter={[16, 24]}>
          {renderList(luxury === undefined ? [] : luxury, num3)}
          <div
            className="show-list"
            style={{ cursor: "pointer" }}
            onClick={() => setNum3(num3 < 8 ? num3 + 4 : num3)}
          >
            Xem thêm <DoubleRightOutlined />
          </div>
        </Row>
      </section>
    </>
  );
}

export default Home;
