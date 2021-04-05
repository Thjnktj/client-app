import React, { useState } from "react";
import { Modal, Button } from "antd";

function Modals(props) {
  const { typeBtn, show, nameBtn, title, styleBtn, dispatch } = props;
  const [isModalVisible, setIsModalVisible] = useState(show);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type={typeBtn ? typeBtn : "link"}
        onClick={showModal}
        style={styleBtn ? styleBtn : {}}
      >
        {nameBtn}
      </Button>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
}

export default Modals;
