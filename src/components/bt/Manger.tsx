import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Select, Tag } from 'antd';

interface RecordType {
  id: number;
  name: string;
  email: string;
  status: string;
}

export default function Manager() {
  const [data, setData] = useState<RecordType[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', status: 'Hoạt động' },
    { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', status: 'Không hoạt động' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordType | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<RecordType | null>(null);
  const [form] = Form.useForm();

  const openModal = (record?: RecordType) => {
    setEditingRecord(record || null);
    setIsModalVisible(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editingRecord.id ? { ...editingRecord, ...values } : item
          )
        );
      } else {
        const newRecord: RecordType = {
          id: Date.now(),
          ...values,
        };
        setData((prev) => [...prev, newRecord]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const openDeleteModal = (record: RecordType) => {
    setDeletingRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingRecord) {
      setData((prev) => prev.filter((item) => item.id !== deletingRecord.id));
    }
    setIsDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name' as const,
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email' as const,
      key: 'email',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status' as const,
      key: 'status',
      render: (status: string) =>
        status === 'Hoạt động' ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Không hoạt động</Tag>
        ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: RecordType) => (
        <Space>
          <Button type="primary" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Button danger onClick={() => openDeleteModal(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý thành viên</h2>
      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm mới
      </Button>
      <Table rowKey="id" columns={columns} dataSource={data} pagination={{pageSize: 5, total: 20}} />

      <Modal
        title={editingRecord ? 'Sửa thông tin' : 'Thêm mới'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select
              options={[
                { value: 'Hoạt động', label: 'Hoạt động' },
                { value: 'Không hoạt động', label: 'Không hoạt động' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa bản ghi này không</p>
      </Modal>
    </div>
  );
}
