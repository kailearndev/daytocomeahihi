/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox, Input, Modal, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs from "dayjs";
import React, { useState } from "react";
import SelectDatime from "./SeclectDatetime";
import ListService from "../services/list.service";
import { useSelector } from "react-redux";
import { getUserInfo } from "../redux/Login/login.slice";

interface ModalAddProps {
  open: boolean;
  handleCancel: () => void;
  title: string;
  // content: React.ReactNode
  onOk: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = (props) => {
  const userName = useSelector(getUserInfo);
  const { handleCancel, open, title, onOk } = props;
  const [date, setDate] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [isLate, setIsLate] = useState<boolean>(false);

  const handleChangeDate = (_: any, value: string) => {
    setDate(value);
  };
  const handleCheckLate = (e: CheckboxChangeEvent) => {
    setIsLate(e.target.checked);
  };
  const handleOnchangeDetail = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetail(event.target.value);
  };

  const handleSave = async () => {
    try {
      await ListService.createDateTime({
        date: dayjs(date).format("YYYY-MM-DD"),
        isLate: isLate,
        detail: detail,
        userId: userName?.id,
      });
      onOk();
      handleCancel();
    } catch (error) {
      error;
    }
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onOk={handleSave}
        onCancel={handleCancel}
        okButtonProps={{ disabled: date === "" }}
      >
        <Space direction="vertical">
          <SelectDatime
            name="datetime"
            typePicker={undefined}
            onChange={(_, value) => handleChangeDate(_, value)}
            value={date}
          />
          <Checkbox autoFocus checked={isLate} onChange={handleCheckLate}>
            Is Late
          </Checkbox>
          <Input.TextArea
            style={{
              width: "450px",
              marginBottom: 10,
            }}
            rows={4}
            value={detail}
            onChange={(e) => handleOnchangeDetail(e)}
          />
        </Space>
      </Modal>
    </>
  );
};

export default ModalAdd;
