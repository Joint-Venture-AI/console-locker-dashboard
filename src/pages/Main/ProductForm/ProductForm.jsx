import { useState } from "react";
import { Upload, Input, Select, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProductForm() {
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList }) => setFileList(fileList);

  return (
    <div className="p-6 bg-white  rounded-lg">
        <div className="flex justify-between  items-center mb-4 container mx-auto">
        
        <div className="flex items-center gap-2">
          <Link to={'/productQuestion'}>
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

      <Form layout="vertical">
        <div className="flex gap-4">
          {/* Image Upload Section */}
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            className="flex items-center justify-center  rounded-md"
          >
            {fileList.length < 1 && (
              <div className="text-center" >
                <UploadOutlined className="text-gray-500 " />
                <p className="text-gray-500 text-sm">Upload Image</p>
              </div>
            )}
          </Upload>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <Form.Item label="Product Name" className="w-full">
              <Input className="py-3" placeholder="Enter a name" />
            </Form.Item>

            <div className="grid grid-cols-4 gap-4">
              <Form.Item label="Question" className="col-span-1">
                <Input className="py-3" placeholder="Enter your question.." />
              </Form.Item>

              <Form.Item label="Estimate Price" className="col-span-1 ">
                <Input className="py-3" placeholder="Enter an estimate price" />
              </Form.Item>

              <Form.Item label="Price" className="col-span-1">
                <Input className="py-3" placeholder="Enter a price" />
              </Form.Item>

              <Form.Item label="Conditions" className="col-span-1">
                <Select placeholder="Conditions">
                  <Select.Option value="new">New</Select.Option>
                  <Select.Option value="used">Used</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button className="px-10 py-5" danger>Cancel</Button>
              <Button type="primary"  className="bg-[#101010] px-10 py-5">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
