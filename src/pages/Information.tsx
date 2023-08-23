import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import ListService from "../services/list.service";
import PopupConfirm from "../components/PopupConfirm";
import SelectDatime from "../components/SeclectDatetime";
import Loading from "../components/Loading";
import ModalAdd from "../components/ModalAdd";
import ModalEdit from "../components/ModalEdit";
import { useSelector } from "react-redux";
import { getUser } from "../redux/Login/login.slice";
import Cookies from "js-cookie";

interface DataType {
  id: number;
  date: string;
  isLate: number;
  detail: string;
}
const Information: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState<DataType[]>([]);
  const userInfo = Cookies.get('UserInfo')
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [loadingApp, setLoadingApp] = useState<boolean>(false);
  const [idDay, setIdDay] = useState<number>(0);
  const [dateSearch, setDaySearch] = useState<string>("");
  const [filter, setFilter] = useState<any>({
    date: "" || {},
  });
  
  const fetchData = async () => {
    setLoadingApp(true);
    if(userInfo){
      const parseUser = JSON.parse(userInfo)
      const res: any = await ListService.getListFromUser(JSON.parse(parseUser.id));
      setDataLoaded(res.day);
    }
    setLoadingApp(false);
  };
  useEffect(() => {
    
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  
 

  const handleCloseModal = () => {
    setOpenModalEdit(false);
  };
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };
  const handleEdit = (id: number) => {
    setIdDay(id);
    setOpenModalEdit(true);
  };
  const handleDelete = async (id: number) => {
    setLoadingApp(true);
    await ListService.deleteDay(id);
    await fetchData();
    setLoadingApp(false);
  };
  const handleSearch = (_: any, date: string) => {
    setFilter({
      ...filter,
      date: date,
    });
    setDaySearch(date);
  };
  const handleOk = async () => await fetchData();
  const handleSave = async () => {
    setFilter({});
    setDaySearch("");
    await fetchData();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value: string) => dayjs(value).format("DD-MM-YYYY"),
    },
    {
      title: "Late",
      dataIndex: "isLate",
      key: "isLate",
      render: (value) =>
        value === true ? (
          <Tag color={"red"}>YES</Tag>
        ) : (
          <Tag color={"cyan"}>NO</Tag>
        ),
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: number) => (
        <Space>
          <PopupConfirm
            title="Delete event"
            description="Are you sure?"
            onConfirm={() => {
              handleDelete(value);
            }}
          />
          <Button type="primary" onClick={() => handleEdit(value)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Space
      size={"large"}
      direction="vertical"
      style={{
        width: "100%",
        minHeight: 440,
        backgroundColor: "white",
        borderRadius: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "20px 0 0 15px",
          gap: 4,
        }}
      >
        <SelectDatime
          placeholder="Search Date..."
          typePicker="month"
          onChange={(_, date) => {
            handleSearch(_, date);
          }}
          value={dateSearch}
        />
        <Button danger type="default" onClick={() => setOpenModalAdd(true)}>
          Add New Date
        </Button>
      </div>
      <Loading loading={loadingApp}>
        <Table
          style={{
            minHeight: "40vh",
           
          }}
          // rowSelection
          rowKey="id"
          columns={columns}
          dataSource={dataLoaded}
          // pagination={{  }}
        />
        <ModalEdit
          id={idDay}
          onOk={() => {
            handleOk();
          }}
          open={openModalEdit}
          handleCancel={handleCloseModal}
          title="Edit"
        />
        <ModalAdd
          onOk={() => {
            handleSave();
          }}
          open={openModalAdd}
          handleCancel={handleCloseModalAdd}
          title="Add New Date"
        />
      </Loading>
    </Space>
  );
};

export default Information;
