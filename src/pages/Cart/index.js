import React, { Fragment } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  checkOut,
  clearProduct,
  getCart,
  productQuantity,
} from "../../redux/actions";
import "./index.css";
import { Breadcrumb, Button, Col, Empty, message, Row } from "antd";
import Modals from "../../components/Modals";

const { Option } = Select;

function Cart() {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let productsInCart = [];

  Object.keys(cart.products).forEach((item) => {
    if (cart.products[item].inCart) {
      productsInCart.push(cart.products[item]);
    }
  });

  const fomart = (money) => {
    const result = `${String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    return result;
  };

  productsInCart = productsInCart.map((product, index) => {
    return (
      <Fragment key={index}>
        <div className="line-bottom">
          <div className="product">
            <DeleteOutlined
              onClick={() => {
                dispatch(clearProduct(product)).then((result) => {
                  if (result) {
                    dispatch(getCart());
                  }
                  const key = "updatable";
                  message.error({
                    content: "Đã xóa sản phẩm",
                    key,
                    duration: 2,
                  });
                });
              }}
            />
            <img src={product.images} alt="" />
            <span className="sm-hide">{product.name}</span>
          </div>
          <div className="price sm-hide">{fomart(product.price)}Đ</div>
          <div className="quantity">
            <MinusOutlined
              onClick={() => {
                dispatch(productQuantity("decrease", product._id)).then(
                  (result) => {
                    if (result) {
                      dispatch(getCart());
                    }
                    const key = "updatable";
                    message.success({
                      content: "Cập nhật thành công",
                      key,
                      duration: 2,
                    });
                  }
                );
              }}
            />
            <span>&nbsp;{product.numbers}&nbsp;</span>
            <PlusOutlined
              onClick={() =>
                dispatch(productQuantity("increase", product._id)).then(
                  (result) => {
                    if (result) {
                      dispatch(getCart());
                    }
                    const key = "updatable";
                    message.success({
                      content: "Cập nhật thành công",
                      key,
                      duration: 2,
                    });
                  }
                )
              }
            />
          </div>
          <div className="total">
            {fomart(product.numbers * product.price)}Đ
          </div>
        </div>
      </Fragment>
    );
  });

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }} key="1">
        <Breadcrumb.Item>
          <h1 style={{ color: "#ff9300", textTransform: "uppercase" }}>
            Giỏ hàng
          </h1>
        </Breadcrumb.Item>
      </Breadcrumb>
      {productsInCart.length === 0 ? (
        <Row gutter={16}>
          <Col span={24}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: "400px",
              }}
              description={
                <span>
                  Oh <a href="#API">no cart is empty</a>
                </span>
              }
            >
              <Button type="primary">
                <a href="/">Mua sắm</a>
              </Button>
            </Empty>
          </Col>
        </Row>
      ) : (
        <Row gutter={16}>
          <Col span={8} className="check-out">
            <h2>Thông tin khách hàng</h2>
            <p>
              <b>Họ tên</b>: {auth.user.fullName}
            </p>
            <p>
              <b>Số điện thoại</b>: {auth.user.phone}
            </p>
            <p>
              <b>Địa chỉ</b>: {auth.user.address}
            </p>
            <Modals
              nameBtn="Mua ngay"
              typeBtn="default"
              styleBtn={{ background: "#ff9400", marginLeft: "78%" }}
              title="Thiết lập đơn hàng"
              dispatch={() =>
                dispatch(checkOut()).then((result) => {
                  if (result) {
                    dispatch(getCart());
                    const key = "updatable";
                    message.success({
                      content: "Đặt hàng thành công",
                      key,
                      duration: 2,
                    });
                  }
                })
              }
            >
              <p>Cung cấp phương thức thanh toán</p>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chọn phương thức thanh toán"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="1">Thanh toán khi nhận hàng</Option>
                <Option value="2">Thanh toán qua internet banking</Option>
                <Option value="3">Thanh toán tại cửa hàng</Option>
              </Select>
              <br />
              <br />
              <p>
                Khi quý khách đồng ý mua đơn hàng nhân viên cửa hàng sẽ gọi điện
                lại cho quý khách để xác nhận đơn trong vòng 24h
              </p>
              <p>Chi tiết đơn hàng trong lịch sử mua hàng</p>
              <p>Cảm ơn quý khách</p>
            </Modals>
          </Col>
          <Col span={16} className="check-cart">
            <div className="container-products">
              <div className="product-header">
                <h5 className="clear">Xóa</h5>
                <h5 className="product-title">Sản phẩm</h5>
                <h5 className="price sn-hide">Giá</h5>
                <h5 className="quantity">Số lượng</h5>
                <h5 className="total">Tổng</h5>
              </div>
              <div className="products">{productsInCart}</div>
              <div className="basketTotalContainer">
                <h4 className="basketTotalTitle">Tổng đơn hàng</h4>
                <h4 className="basketTotal">{fomart(cart.cartCost)}Đ</h4>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Cart;
