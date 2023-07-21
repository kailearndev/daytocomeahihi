/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import ListService from "../../services/list.service";
import PopupConfirm from "../PopupConfirm";
import SelectDatime from "../SeclectDatetime";
import Loading from "../Loading";
import ModalAdd from "../ModalAdd";
import ModalEdit from "../ModalEdit";

interface DataType {
  id: number;
  date: string;
  isLate: number;
  detail: string;
}

const DataList: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState<DataType[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [loadingApp, setLoadingApp] = useState<boolean>(false);
  const [idDay, setIdDay] = useState<number>(0);
  const [dateSearch, setDaySearch] = useState<string>("");
  const [filter, setFilter] = useState<any>({
    date: '' || {}
  })
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const fetchData = async () => {
    setLoadingApp(true);
    const res: any = await ListService.getList(filter);
    setDataLoaded(res);
    setLoadingApp(false);
  };

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
      date: date
    })
    setDaySearch(date);
  };
  const handleOk = async () => await fetchData();
  const handleSave = async () => {
    setFilter({})
    setDaySearch('')
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
        value === 0 ? (
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
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <div style={{
        display: 'flex',

        gap: 4

      }}>
        <SelectDatime
          placeholder="Search Date..."
          typePicker="month"
          onChange={(_, date) => {
            handleSearch(_, date);
          }}
          value={dateSearch}
        />
        <Button type="dashed" onClick={() => setOpenModalAdd(true)} >Add New Date</Button>
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

export default DataList;
