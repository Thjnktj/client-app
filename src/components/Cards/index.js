import React from "react";
import { Link } from "react-router-dom";
import { Card, message } from "antd";
import {
  StarOutlined,
  ShoppingCartOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBasket, getCart } from "../../redux/actions";

const { Meta } = Card;

function Cards(props) {
  const data = props.data;

  const dispatch = useDispatch();

  const key = "updatable";
  const handleClick = () => {
    dispatch(addBasket(data)).then((result) => {
      if (result) {
        dispatch(getCart());
      }
      message.success({
        content: "Đã thêm giỏ hàng",
        key,
        duration: 2,
      });
    });
  };
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          alt="example"
          src={data.images[0].url}
          style={{ width: "100%", height: "200px" }}
        />
      }
      actions={[
        <StarOutlined key="star" />,
        <Link to={`/detail/${data.slug}`}>
          <EditOutlined key="edit" />
        </Link>,
        <ShoppingCartOutlined key="cart" onClick={handleClick} />,
      ]}
    >
      <Meta
        title={data.name}
        description={`${String(data.price).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )}đ`}
      />
    </Card>
  );
}

export default Cards;
