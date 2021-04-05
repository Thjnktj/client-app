import { Col, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modals from "../../components/Modals";
import { updateUser } from "../../redux/actions/auth.action";

function Update(props) {
  const [firstName, setFirstName] = useState(props.data.firstName);
  const [lastName, setLastName] = useState(props.data.lastName);
  const [phone, setPhone] = useState(props.data.phone);
  const [address, setAddress] = useState(props.data.address);
  const [email, setEmail] = useState(props.data.email);

  const dispatch = useDispatch();

  const user = {
    firstName,
    lastName,
    phone,
    address,
    email,
  };

  console.log(user);

  return (
    <>
      <Modals
        nameBtn="Cập nhật thông tin"
        title="Cập nhật thông tin khách hàng"
        dispatch={() =>
          dispatch(updateUser(user))
            .then((result) => {
              if (result) {
                setTimeout(() => {
                  message.success("Cập nhật thông tin thành công");
                }, 1000);
              }
            })
            .catch((error) => {
              if (error) {
                setTimeout(() => {
                  message.error("Cập nhật thất bại");
                }, 1000);
              }
            })
        }
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
      </Modals>
    </>
  );
}

export default Update;
