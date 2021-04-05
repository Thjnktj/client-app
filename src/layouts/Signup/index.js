import { Col, Input, message, Row } from "antd";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Modals from "../../components/Modals";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");

  const dispatch = useDispatch();

  const dispatchLogin = () => {
    const user = { firstName, lastName, phone, address, email, password };
    dispatch(logout(user))
      .then((result) => {
        if (result) {
          setTimeout(() => {
            message.success("Đăng ký thành công");
          }, 1000);
        }
      })
      .catch((error) => {
        if (error) {
          setTimeout(() => {
            message.error("Tài khoản đã tồn tại");
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
        nameBtn="Đăng ký"
        title="Đăng ký"
        dispatch={dispatchLogin}
      >
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <label htmlFor="#firstName">Họ và đệm</label>
            <Input
              id="firstName"
              type="text"
              required={true}
              value={firstName}
              onChange={(e) => {
                let { value } = e.target;
                if (value === "" || value.length > 15) {
                  document.getElementById("errFirst").innerText =
                    "Họ không đúng";
                } else {
                  document.getElementById("errFirst").innerText = "";
                }
                setFirstName(value);
              }}
            />
            <label id="errFirst" style={{ color: "red" }}></label>
          </Col>
          <Col span={12}>
            <label htmlFor="#lastName">Tên</label>
            <Input
              id="lastName"
              type="text"
              required={true}
              value={lastName}
              onChange={(e) => {
                let { value } = e.target;
                if (value === "" || value.length > 10) {
                  document.getElementById("errLast").innerText =
                    "Tên không đúng";
                } else {
                  document.getElementById("errLast").innerText = "";
                }
                setLastName(value);
              }}
            />
            <label id="errLast" style={{ color: "red" }}></label>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <label htmlFor="#phone">Số điện thoại</label>
            <Input
              id="phone"
              type="text"
              required={true}
              value={phone}
              onChange={(e) => {
                const reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                let { value } = e.target;
                if (value === "" || !reg.test(value)) {
                  document.getElementById("errPhone").innerText =
                    "Số điện thoại không đúng";
                } else {
                  document.getElementById("errPhone").innerText = "";
                }
                setPhone(value);
              }}
            />
            <label id="errPhone" style={{ color: "red" }}></label>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <label htmlFor="#address">Địa chỉ</label>
            <Input
              id="address"
              type="text"
              required={true}
              value={address}
              onChange={(e) => {
                let { value } = e.target;
                if (value === "") {
                  document.getElementById("errAddress").innerText =
                    "Địa chỉ không được bỏ trống";
                } else {
                  document.getElementById("errAddress").innerText = "";
                }
                setAddress(value);
              }}
            />
            <label id="errAddress" style={{ color: "red" }}></label>
          </Col>
        </Row>
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
        </Row>
        <Row gutter={[16, 24]}>
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
                const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                let { value } = e.target;
                if (value === "" || !reg.test(value)) {
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
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <label htmlFor="#checkPass">Nhập lại mật khẩu</label>
            <Input.Password
              id="checkPass"
              required={true}
              value={checkPass}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) => {
                let { value } = e.target;
                if (value === "" || value !== password) {
                  document.getElementById("errCheckPass").innerText =
                    "Mật khẩu không khớp";
                } else {
                  document.getElementById("errCheckPass").innerText = "";
                }
                setCheckPass(value);
              }}
            />
            <label id="errCheckPass" style={{ color: "red" }}></label>
          </Col>
        </Row>
      </Modals>
    </>
  );
}

export default Signup;
