import { message } from "antd";
import React, { useEffect } from "react";

// class  AlertProps = {
//   content: string
//   type: "error" | "success" | "warning";
// }

export const AlertComponent = (props: {
  content: string;
  type: "error" | "success" | "warning";
}) => {
  message.open({
    type: props.type,
    content: props.content,
  });
};
