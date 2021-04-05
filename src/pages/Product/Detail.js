import { Breadcrumb, Button, Col, message, Row } from "antd";
import React from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { addBasket, getCart } from "../../redux/actions";

function Detail() {
  const slug = window.location.pathname;

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  let data = product.products.filter(
    (item) => item.slug === slug.split("/")[2]
  );

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          <Breadcrumb style={{ margin: "16px 0", textTransform: "uppercase" }}>
            <Breadcrumb.Item>
              <h1>{data[0].name}</h1>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Slider {...settings}>
                        {data.length > 0
                          ? data[0].images.map((picture, index) => {
                              return (
                                <div key={index}>
                                  <img src={picture.url} alt="" />
                                </div>
                              );
                            })
                          : null}
                      </Slider>
                    </Col>
                  </Row>

                  <Row gutter={16} style={{ marginTop: "3rem" }}>
                    <Col span={24}>
                      <h3>Đánh giá sản phẩm</h3>
                      <div
                        style={{ fontSize: "1.2rem" }}
                        dangerouslySetInnerHTML={{
                          __html: data[0].description,
                        }}
                      ></div>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <h2>Hãng sản xuất: {data[0].category.name}</h2>
                  <p style={{ fontSize: "2rem", color: "red" }}>
                    {`${String(data[0].price).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}Đ`}
                  </p>
                  <p>CPU</p>
                  <p>RAM</p>
                  <p>Ổ cứng</p>
                  <p>Card đồ họa</p>
                  <p>Màn hình</p>
                  <Row gutter={16} style={{ marginBottom: "1rem" }}>
                    <Col span={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ width: "100%" }}
                      >
                        Mua ngay
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ width: "100%" }}
                        onClick={() => {
                          const key = "updatable";
                          console.log(data[0]);
                          dispatch(addBasket(data[0])).then((result) => {
                            if (result) {
                              dispatch(getCart());
                            }
                            message.success({
                              content: "Đã thêm giỏ hàng",
                              key,
                              duration: 2,
                            });
                          });
                        }}
                      >
                        Thêm giỏ hàng
                      </Button>
                    </Col>
                  </Row>

                  <p>✅Bảo hành 12 tháng chính hãng - Xem chính sách</p>
                  <p>✅Giá ở trên đã bao gồm 10% VAT</p>
                  <p>✅MIỄN PHÍ GIAO HÀNG</p>
                  <p>{`- Với đơn hàng < 4.000.000 đồng: Miễn phí giao hàng cho đơn hàng < 5km tính từ cửa hàng gần nhất`}</p>
                  <p>{`- Với đơn hàng > 4.000.000 đồng: Miễn phí giao hàng (khách hàng chịu phí bảo hiểm hàng hóa nếu có)`}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
}

export default Detail;
