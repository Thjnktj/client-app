import { Col, Input, message, Row } from "antd";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Modals from "../../components/Modals";
import { useDispatch } from "react-redux";
import { getCart, login } from "../../redux/actions";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const dispatchLogin = () => {
    const user = { email, password };

    dispatch(login(user)).then((result) => {
      dispatch(getCart());
      if (result) {
        setTimeout(() => {
          message.success("Đăng nhập thành công");
        }, 1000);
      }
    });
  };

  return (
    <>
      <Modals
        typeBtn={"link"}
        show={false}
        styleBtn={{ color: "white" }}
        nameBtn="Đăng nhập"
        title="Đăng nhập"
        dispatch={dispatchLogin}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <label htmlFor="#email">Email</label>
            <Input
              id="email"
              type="email"
              required={true}
              value={email}
              onChange={(e) => {
                const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                let { value } = e.target;
                if (value === "" || !reg.test(value)) {
                  document.getElementById("errEmail").innerText =
                    "Email không đúng định dạng";
                } else {
                  document.getElementById("errEmail").innerText = "";
                }
                setEmail(value);
              }}
            />
            <label id="errEmail" style={{ color: "red" }}></label>
          </Col>
          <Col span={24}>
            <label htmlFor="#password">Mật khẩu</label>
            <Input.Password
              id="password"
              required={true}
              value={password}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) => {
                // const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                let { value } = e.target;
                if (value === "" || value.length < 6) {
                  document.getElementById("errPass").innerText =
                    "Mật khẩu ít nhất 8 kí tự, 1 chữ cái và 1 số";
                } else {
                  document.getElementById("errPass").innerText = "";
                }
                setPassword(value);
              }}
            />
            <label id="errPass" style={{ color: "red" }}></label>
          </Col>
        </Row>
      </Modals>
    </>
  );
}

export default Signin;
