

import { useState } from "react";
import { Card, Button, Pagination, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const products = [
  {
    id: 1,
    name: "Xbox",
    price: "$452",
    image: "/projects.png",
  },
  {
    id: 2,
    name: "Xbox",
    price: "$452",
    image: "/projects.png",
  },
  {
    id: 3,
    name: "Xbox",
    price: "$452",
    image: "/projects.png",
  },
  {
    id: 4,
    name: "Xbox",
    price: "$452",
    image: "/projects.png",
  },
  {
    id: 5,
    name: "Xbox",
    price: "$452",
    image: "/projects.png",
  },
  {
    id: 6,
    name: "Xbox",
    price: "$452",
    image: "/projects.png",
  },
];

export default function ProductQuesation() {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  return (
    <div className="p-6">
      <div className="flex justify-between  items-center mb-4 container mx-auto">
        
        <div className="flex items-center gap-2">
          <Link to={'/'}>
            <Button
              type="link"
              icon={
                <span className="material-icons">
                  <ArrowLeft />
                </span>
              }
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Estimete your Product Price</h2>
        </div>

        <Link to={'/productForm'} className="flex gap-2 items-center cursor-pointer">
          <button className="bg-[#101010] px-6 py-3 rounded-lg  font-normal text-white">
          Add New Product
          </button>
        </Link>
      </div>

      <List className="border-2 p-4 rounded-lg"
        dataSource={products}
        renderItem={(product) => (
          <Card className="mb-4 shadow-sm border-2">
            <div className="flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-[120px] h-[120px] rounded-lg object-cover"
              />
              <div className="ml-4 flex-1 space-y-4">
                <h3 className="text-[24px] font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-lg font-medium">Price: {product.price}</p>
              </div>
              <div className="flex gap-2">
                <Button type="text" className="bg-rose-100 p-3 rounded-full" onClick={()=> toast.success('Successfully toasted!')} danger icon={<DeleteOutlined />} />
                {/* <Button type="text" className="bg-blue-100 rounded-full p-3"  icon={<EditOutlined />} /> */}
                <Link to={'/editProducts'}>
                  <Button type="text" className="bg-green-100 rounded-full p-3" icon={<EditOutlined />} />
                </Link>
                
              </div>
            </div>
          </Card>
        )}
      />

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={12 * pageSize}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
