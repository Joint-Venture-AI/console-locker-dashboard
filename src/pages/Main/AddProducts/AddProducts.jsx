import { useState } from "react";
import { Input, Select, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const AddProducts = () => {
  const [image, setImage] = useState(null);

  const handleUpload = ({ file }) => {
    setImage(file);
  };

  const handleSave = () => {
    console.log("Save Product");
  };

  const handleAddVariant = () => {
    console.log("Add Variant");
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-white shadow-md rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to={"/products"}>
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
          <h2 className="text-3xl font-semibold">Order Product List</h2>
        </div>
      </div>

      {/* Product Form */}
      <div className=" gap-6">
        {/* Image Upload */}
        <div className="flex  gap-10">
          <Upload
            listType="picture-card"
            maxCount={1}
            onChange={handleUpload}
            // className="w-full"
          >
            {!image && (
              <div className="text-center">
                <UploadOutlined className="text-2xl mb-2" />
                <Typography.Text>Upload Image</Typography.Text>
              </div>
            )}
          </Upload>
          <div>
            <Typography.Title level={4} className="mt-4 text-gray-500">
              Product Name
            </Typography.Title>
            <div className="flex flex-col">
              <Typography.Text className="text-gray-400">
                Product Description
              </Typography.Text>
            </div>
            <div className="flex gap-5 items-center">
              <Typography.Text className="line-through text-gray-500">
                $100.00
              </Typography.Text>
              <Typography.Text className="text-gray-800 text-lg font-semibold ">
                $300.00
              </Typography.Text>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="col-span-2 mt-10 border p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Product Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Product Name
              </label>
              <Input placeholder="Enter a product name" className="py-3" />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Brand
              </label>
              <Input placeholder="Enter a brand name" className="py-3" />
            </div>

            {/* Model Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Model Name
              </label>
              <Input placeholder="Enter a model name" className="py-3" />
            </div>

            {/* Product Condition */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Product Condition
              </label>
              <Select
                placeholder="Select condition"
                options={[
                  { value: "New", label: "New" },
                  { value: "Used", label: "Used" },
                ]}
                className="w-full rounded-lg"
                allowClear
              />
            </div>

            {/* Controller */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Controller
              </label>
              <Input placeholder="Enter a controller name" className="py-3" />
            </div>

            {/* Memory */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Memory
              </label>
              <Select
                placeholder="Select memory"
                options={[
                  { value: "16GB", label: "16GB" },
                  { value: "32GB", label: "32GB" },
                  { value: "64GB", label: "64GB" },
                ]}
                className="w-full"
                allowClear
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-medium">
              Product Description
            </label>
            <TextArea
              rows={6}
              placeholder="Enter a product description"
              className="py-3"
            />
          </div>

          {/* Pricing and Availability */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Regular Price */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Regular Price
              </label>
              <Input placeholder="$0.00" type="number" className="py-3" />
            </div>

            {/* Offer Price */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Add Offer Price
              </label>
              <Input placeholder="$0.00" type="number" className="py-3" />
            </div>

            {/* Available Products */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Available Products
              </label>
              <Input placeholder="Enter available products" className="py-3" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleAddVariant}
              className="border border-black text-black hover:bg-gray-100"
            >
              Add Variant
            </Button>
            <Button
              type="primary"
              onClick={handleSave}
              className="bg-black text-white py-3"
            >
              Save Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
