import React, { useState } from "react";
import { Drawer, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./index.css";
import { useSelector } from "react-redux";
import Update from "./Update";

function User(props) {
  const { nameBtn } = props;
  const [visible, setVisible] = useState(false);

  const auth = useSelector((state) => state.auth);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="link" style={{ color: "#fff" }} onClick={showDrawer}>
        {nameBtn}
      </Button>
      <Drawer
        title="Thông tin khách hàng"
        placement="right"
        width={300}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Image
          width={200}
          preview={false}
          src={`https://1.bp.blogspot.com/-A7UYXuVWb_Q/XncdHaYbcOI/AAAAAAAAZhM/hYOevjRkrJEZhcXPnfP42nL3ZMu4PvIhgCLcBGAsYHQ/s1600/Trend-Avatar-Facebook%2B%25281%2529.jpg`}
        />
        <p>Họ tên: {auth.user.fullName}</p>
        <p>Số điện thoại: {auth.user.phone}</p>
        <p>Email: {auth.user.email}</p>
        <p>Địa chỉ: {auth.user.address}</p>
        <p className="edit-info">
          <EditOutlined />
          <Update data={auth.user} />
        </p>
        <p>Lịch sử mua hàng</p>
      </Drawer>
    </>
  );
}

export default User;
