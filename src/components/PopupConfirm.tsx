import { Button, Popconfirm } from "antd";
import React from "react";

interface PopupConfirmProps {
  title: string;
  description: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

const PopupConfirm: React.FC<PopupConfirmProps> = (props) => {
  const { title, cancelText, description, okText, onConfirm } = props;
  return (
    <Popconfirm title={title} description={description} okText={okText} cancelText={cancelText} onConfirm={onConfirm}>
      <Button danger type="dashed">Delete</Button>
    </Popconfirm>
  );
};
export default PopupConfirm;
