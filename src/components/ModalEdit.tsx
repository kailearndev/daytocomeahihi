/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Checkbox, Input, Modal, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useEffect, useState } from "react";

import SelectDatime from "./SeclectDatetime";
import dayjs from "dayjs";
import { DayDataResponse } from "../types/daydata.interface";
import ListService from "../services/list.service";

interface ModalEditProps {
  open: boolean;
  handleCancel: () => void;
  title: string;
  id: number;
  // content: React.ReactNode
  onOk: () => void;
}

const ModalEdit: React.FC<ModalEditProps> = (props) => {
  const { handleCancel, open, title, id, onOk } = props;
  const [data, setData] = useState<DayDataResponse>();
  const [date, setDate] = useState<string>('');
  const [detail, setDetail] = useState<string>("");
  const [isLate, setIsLate] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
  const handleFetch = async () => {
    if (id === 0) {
      return
    }
    setConfirmLoading(true);
    const res: DayDataResponse = await ListService.getId(id);
    res && setData(res);
    res.isLate === 0 ? setIsLate(true) : setIsLate(false);
    setDate(res.date)
    setDetail(res.detail);
    // setIsLate()
    setConfirmLoading(false);
  };
  const handleSave = async () => {
    try {
      await ListService.updateDateTime(id, {
        date: dayjs(date).format('YYYY-MM-DD'),
        isLate: isLate === true ? 0 : 1,
        detail: detail,
      });
      onOk();
      handleCancel();
    } catch (error) {
      error;
    }
  };
  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleSave}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okButtonProps={{ disabled: date === data?.date }}
      >
        <Space direction="vertical">
          <SelectDatime
            name="datetime"
            typePicker={undefined}
            onChange={(_, value) => handleChangeDate(_, value)}
            value={data?.date ? data.date : date}
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

export default ModalEdit;
