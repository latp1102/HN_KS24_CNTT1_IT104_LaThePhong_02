import { Button, Card, Checkbox, Form, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
interface Product {
  id: number;
  name: string;
  price: number;
  status: string;
}
export default function ManagerProduct() {
    const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop Dell XPS 13", price: 29990000, status: "còn hàng" },
    { id: 2, name: "Chuột Logitech MX Master 3S", price: 2490000, status: "hết hàng" },
    { id: 3, name: "Bàn phím Keychron K6", price: 2190000, status: "còn hàng" },
  ]);
  const [form] = Form.useForm();

  const handleAdd = (values: any) => {
    const newProduct: Product = {
      id: Date.now(),
      name: values.name,
      price: Number(values.price),
      status: values.status || false,
    };
    setProducts([...products, newProduct]);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleStaus = (id: number) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: !p.status } : p
      )
    );
  };

  const cloumns: ColumnsType<Product> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {price.toLocaleString("vi-VN")}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status ? (
          <Tag color="green">Còn hàng</Tag>
        ) : (
          <Tag color="red">Hết hàng</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleToggleStaus(record.id)}>
            Đánh dấu
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
        <h2 className="bg-blue-500 rounded-[8px] w-[100%] h-[100px] flex justify-center align-center text-white font-bold" >Quản lý sản phẩm</h2>
    <div style={{ padding: "20px", maxWidth: 1000, margin: "0 auto" }}>
      <Card title="+ Thêm sản phẩm mới" style={{ marginBottom: 20 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleAdd}
          initialValues={{ status: true }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Nhập giá sản phẩm" }]}
          >
            <Input type="number" placeholder="Giá (đ)" />
          </Form.Item>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Còn hàng</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title=" Danh sách sản phẩm">
        <Table
          columns={cloumns}
          dataSource={products}
          rowKey="id"
          pagination={{pageSize: 5, total: 20}}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        </div>
      </Card>
    </div>
    </div>
  )
}