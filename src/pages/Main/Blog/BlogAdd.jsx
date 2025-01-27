import React, { useState } from "react";
import { Button, Input, Upload, Typography, Card } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const { TextArea } = Input;

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = ({ file }) => {
    setImage(file);
  };

  const handleSave = () => {
    console.log("Blog Saved:", { title, description, image });
    // Add your save logic here
  };

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen">
      {/* Header */}
      <Link to={'/blog'}>
        <button className="mb-6 flex items-center  gap-2">
          <ArrowLeft className="size-10" />
          <h1 className=" text-[32px] font-medium">Add Blog</h1>
        </button>
      </Link>

      {/* Form Card */}
      <Card className="shadow-lg rounded-lg p-6">
        <div className="">
          {/* Image Upload */}
          <div className="w-1/3 flex flex-col items-center border border-dashed border-gray-300 rounded-lg p-4">
            <Upload
              listType="picture-card"
              maxCount={1}
              onChange={handleUpload}
              className="w-full"
            >
              {!image && (
                <div className="text-center ">
                  <UploadOutlined className="text-2xl mb-2" />
                  <Typography.Text className="h-[400px]">
                    Upload Image
                  </Typography.Text>
                </div>
              )}
            </Upload>
            <Typography.Text className="mt-4 text-gray-500 text-center">
              Blog Title Name
            </Typography.Text>
            <Typography.Text className="text-gray-400 text-center">
              Product Description
            </Typography.Text>
          </div>

          {/* Input Fields */}
          <div className="border p-8 mt-6 rounded-lg">
            <div className="mb-4">
              <Typography.Text className="block mb-2 font-medium  text-[16px] ">
                Blog Title
              </Typography.Text>
              <Input
                placeholder="Enter a name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div>
              <Typography.Text className="block mb-2 font-medium  text-[16px]">
                Blog Description
              </Typography.Text>
              <TextArea
                rows={10}
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button
            // type="primary"
            size="large"
            className="bg-[#101010] px-12 text-white hover:"
            onClick={handleSave}
          >
            Save Blog
          </Button>
        </div>
      </Card>
    </div>
  );
}
