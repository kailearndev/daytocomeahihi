import { DatePicker, Space } from "antd";
import React from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface SelectDatimeProps {
  typePicker?: "week" | "month" | "quarter" | "year" | undefined;
  onChange: (value: any | null, dateString: string) => void;
  value?: string | number | Dayjs | Date | null | undefined;
  defaultValue?: Dayjs | undefined;
  name?: string;
  placeholder?: string
}

const SelectDatime: React.FC<SelectDatimeProps> = (props) => {
  const { typePicker, value, onChange, defaultValue, name, placeholder } =
    props;

  return (
    <Space direction="vertical">
      <DatePicker
        style={{ width: "250px" }}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        picker={typePicker}
        value={value ? dayjs(value) : null}
        defaultValue={defaultValue}
      />
    </Space>
  );
};
export default SelectDatime;
