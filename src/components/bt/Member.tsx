// import { Button, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
// import type { ColumnsType } from 'antd/es/table';

// import React, { useState } from 'react'
// interface RecordType {
//     id: number;
//     name: string;
//     email: string;
//     status: string;
// }
// export default function Member() {
//     const [data, setData] = useState<RecordType[]>([
//         { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', status: 'Hoạt động' },
//         { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', status: 'Không hoạt động' },
//     ]);

//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//     const [editingRecord, setEditingRecord] = useState<RecordType | null>(null);
//     const [deletingRecord, setDeletingRecord] = useState<RecordType | null>(null);
//     const [form] = Form.useForm();
    
//     const openModal = (record?: RecordType) => {
//         setEditingRecord(record || null);
//         setIsModalVisible(true);
//         if(record){
//             form.setFieldsValue(record);
//         } else {
//             form.resetFields();
//         }
//     }
//     const handleOk = () => {
//         form.validateFields().then((values) => {
//             if(editingRecord){
//                 setData((prev) => prev.map((item) => 
//                 item.id === editingRecord.id ? {...editingRecord, ...values} : item))
//             } else {
//                 const newRecord: RecordType = {
//                     id: Date.now(),
//                     ...values,
//                 }
//                 setData((prev) => [...prev, newRecord])
//             }
//             setIsModalVisible(false);
//             form.resetFields();
//         })
//     }
//     const handleCancel = () => {
//         setIsModalVisible(false);
//         form.resetFields();
//     }
//     const openDeleteModal = (record: RecordType) => {
//         setDeletingRecord(record);
//         setIsDeleteModalVisible(true);
//     }
//     const handleDeleteConfirm = () => {
//         if(deletingRecord){
//             setData((prev) => prev.filter((item) => item.id !== deletingRecord.id));
//         }
//         setIsDeleteModalVisible(false);
//     }
//     const handleDeleteCancel = () => {
//         setIsDeleteModalVisible(false);
//     }
//     const cloumns: ColumnsType<RecordType> = [
//         {
//             title: "Tên",
//             dataIndex: "name" as const,
//             key: "name",
//         },
//         {
//             title: "Email",
//             dataIndex: "email" as const,
//             key: "email",
//         },
//         {
//             title: "Trạng thái",
//             dataIndex: "status" as const,
//             key: "status",
//             render: (status: string) => 
//                 status === "Hoạt động" ? (
//                     <Tag color="green">Hoạt động</Tag>
//                 ) : (
//                     <Tag color="red">Không hoạt động</Tag>
//                 ),
//         },
//         {
//             title: "Hành động",
//             key: "action",
//             render: (_: unknown, record: RecordType) => (
//             <Space>
//                 <Button type="primary" onClick={() => openModal(record)}>Sửa</Button>
//                 <Button danger onClick={() => openDeleteModal(record)}>Xóa</Button>
//             </Space>
// )

//         }
//     ];
//   return (
//     <div style={{padding: 20}}>
//         <h2>Quản lý thành viên</h2>
//         <Button type="primary" onClick={() => openModal()} style={{marginBottom: 16}}>Thêm mới</Button>
//         <Table rowKey="id" columns={cloumns} dataSource={data} pagination={{pageSize: 5, total: 20}}/>

//         <Modal title={editingRecord ? "Sửa thông tin" : "Thêm mới"}
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Xác nhận"
//         cancelText="Hủy"
//         >
//             <Form form={form} layout="vertical">
//                 <Form.Item
//                 name="name"
//                 label="Tên"
//                 rules={[{required: true, message: "Vui lòng nhập tên"}]}
//                 >
//                     <Input/>
//                 </Form.Item>
//                 <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                     {required: true, message: "Vui lòng nhập email"},
//                 ]}>
//                     <Input/>
//                 </Form.Item>
//                 <Form.Item
//                 name="status"
//                 label="Trạng thái"
//                 rules={[
//                     {required: true, message: "Vui lòng nhập trạng thái"}
//                 ]}>
//                     <Select
//                         options={[
//                             { value: 'Hoạt động', label: 'Hoạt động' },
//                             { value: 'Không hoạt động', label: 'Không hoạt động' },
//                       ]}
//                         />
//                 </Form.Item>
//             </Form>
//         </Modal>

//         <Modal
//         title="Xác nhận xóa"
//         open={isDeleteModalVisible}
//         onOk={handleDeleteConfirm}
//         onCancel={handleDeleteCancel}
//         okText="Xác nhận"
//         cancelText="Hủy">
//             <p>Bạn có chắc chắn muốn xóa bản ghi này không</p>
//         </Modal>
//     </div>
//   )
// }
import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Checkbox,
  Form,
  Space,
  Tag,
  Card,
} from "antd";
import type { ColumnsType } from "antd/es/table";

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop Dell XPS 13", price: 29990000, inStock: true },
    { id: 2, name: "Chuột Logitech MX Master 3S", price: 2490000, inStock: false },
    { id: 3, name: "Bàn phím Keychron K6", price: 2190000, inStock: true },
  ]);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handleAdd = (values: any) => {
    const newProduct: Product = {
      id: Date.now(),
      name: values.name,
      price: Number(values.price),
      inStock: values.inStock || false,
    };
    setProducts([...products, newProduct]);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleStock = (id: number) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, inStock: !p.inStock } : p
      )
    );
  };

  const columns: ColumnsType<Product> = [
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
          {price.toLocaleString("vi-VN")} đ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) =>
        inStock ? (
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
          <Button type="primary" onClick={() => handleToggleStock(record.id)}>
            Đánh dấu
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Data for current page
  const paginatedData = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: "20px", maxWidth: 1000, margin: "0 auto" }}>
      <Card  title="+ Thêm sản phẩm mới" style={{ marginBottom: 20 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleAdd}
          initialValues={{ inStock: true }}
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
          <Form.Item name="inStock" valuePropName="checked">
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
          columns={columns}
          dataSource={paginatedData}
          rowKey="id"
          pagination={{pageSize: 5, total: 20}}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        </div>
      </Card>
    </div>
  );
};

export default ProductManager;
