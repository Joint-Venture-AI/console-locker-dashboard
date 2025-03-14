import { useState, useEffect } from "react";
import { Input, Select, Button, Upload, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useSingleProductGetQuery,
} from "../../../redux/features/productsSlice";

const { TextArea } = Input;

const AddProductEdit = () => {
  const navigate = useNavigate();
  const [editProduct] = useEditProductMutation();
  const { id } = useParams();

  const { data } = useSingleProductGetQuery({
    slug: id,
  });

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    offer_price: "",
    brand: "",
    model: "",
    condition: "",
    controller: "",
    memory: "",
    quantity: "",
    product_type: "",
  });

  const [productTypeColor, setProductTypeColor] = useState("");

  useEffect(() => {
    if (data?.data?.product) {
      const product = data.data.product;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        offer_price: product.offer_price,
        brand: product.brand,
        model: product.model,
        condition: product.condition,
        controller: product.controller,
        memory: product.memory,
        quantity: product.quantity,
        product_type: product.product_type,
      });
      setProductTypeColor(product.product_type);
    }
  }, [data]);

  const handleUpload = ({ file }) => {
    setImage(file);
    setOldImage(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "product_type") {
      setProductTypeColor(value);
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.product_type.trim()) {
        message.error("Product type is required");
        return;
      }

      if (!formData.price || isNaN(Number(formData.price))) {
        message.error("Price must be a valid number");
        return;
      }

      if (!formData.offer_price || isNaN(Number(formData.offer_price))) {
        message.error("Offer price must be a valid number");
        return;
      }

      if (!formData.controller || isNaN(Number(formData.controller))) {
        message.error("Controller must be a valid number");
        return;
      }

      if (!formData.quantity || isNaN(Number(formData.quantity))) {
        message.error("Quantity must be a valid number");
        return;
      }

      // if (!image) {
      //   message.error("An image is required");
      //   return;
      // }

      // Create FormData object
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", Number(formData.price));
      productData.append("offer_price", Number(formData.offer_price));
      productData.append("brand", formData.brand);
      productData.append("model", formData.model);
      productData.append("condition", formData.condition);
      productData.append("controller", Number(formData.controller));
      productData.append("memory", formData.memory);
      productData.append("quantity", Number(formData.quantity));
      productData.append("product_type", formData.product_type.trim());
      image && productData.append("images", image);

      console.log("Submitting Form Data:", Object.fromEntries(productData));

      // Call the editProduct mutation with id and formData
      const response = await editProduct({
        id: data.data.product._id, // Pass the product ID
        formData: productData, // Pass the FormData object
      }).unwrap();

      navigate("/products"); // Redirect to the product list page after successful update

      message.success(response.message);
      console.log("Product updated successfully:", response.data);
    } catch (error) {
      message.error("Failed to update product");
      console.error("Error updating product:", error);
    }
  };




  const getBackgroundColor = () => {
    switch (productTypeColor) {
      case "xbox":
        return "bg-[#63B95D]";
      case "playstation":
        return "bg-[#1761BF]";
      case "nintendo":
        return "bg-[#F34040]";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-white shadow-md rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to={"/products"}>
            <Button
              type="link"
              icon={<ArrowLeft />}
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Edit Product</h2>
        </div>
      </div>

      {/* Product Form */}
      <div className="gap-6">
        {/* Image Upload */}
        <div className="flex gap-10">
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleUpload}
          >
          
            {
              oldImage ? <img src={IMAGE + data?.data?.product?.images?.[0]}/>: !image &&(
                <div className="text-center">
                  <UploadOutlined className="text-2xl mb-2" />
                  <Typography.Text>Upload Image</Typography.Text>
                </div>
              )
            }
          </Upload>
        </div>

        {/* Form Inputs */}
        <div
          className={`col-span-2 mt-10 border p-4 rounded-lg ${getBackgroundColor()}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <Input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <Input
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Model Name
              </label>
              <Input
                name="model"
                placeholder="Model Name"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Condition
              </label>
              <Select
                placeholder="Condition"
                value={formData.condition}
                options={[
                  { value: "New", label: "New" },
                  { value: "Used", label: "Used" },
                ]}
                onChange={(value) => handleSelectChange("condition", value)}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Controller
              </label>
              <Input
                name="controller"
                placeholder="Controller"
                type="number"
                value={formData.controller}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Memory</label>
              <Select
                placeholder="Memory"
                value={formData.memory}
                options={[
                  { value: "8GB", label: "8GB" },
                  { value: "16GB", label: "16GB" },
                  { value: "32GB", label: "32GB" },
                  { value: "64GB", label: "64GB" },
                  { value: "128GB", label: "128GB" },
                  { value: "256GB", label: "256GB" },
                  { value: "512GB", label: "512GB" },
                ]}
                onChange={(value) => handleSelectChange("memory", value)}
                className="w-full h-10" // Fixed width and height
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Product Description
            </label>
            <TextArea
              name="description"
              className="w-full h-24 mb-6" // Fixed width and height
              rows={4}
              placeholder="Product Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Regular Price ($)
              </label>
              <Input
                name="price"
                placeholder="Regular Price ($)"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Offer Price ($)
              </label>
              <Input
                name="offer_price"
                placeholder="Offer Price ($)"
                type="number"
                value={formData.offer_price}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Available Products
              </label>
              <Input
                name="quantity"
                placeholder="Available Products"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full h-10" // Fixed width and height
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Product Type
            </label>
            <Select
              placeholder="Product Type"
              value={formData.product_type}
              options={[
                { value: "xbox", label: "Xbox" },
                { value: "playstation", label: "PlayStation" },
                { value: "nintendo", label: "Nintendo" },
              ]}
              onChange={(value) => handleSelectChange("product_type", value)}
              className="w-full h-10" // Fixed width and height
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
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

export default AddProductEdit;
