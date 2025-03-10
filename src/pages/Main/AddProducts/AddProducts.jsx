// import { useState } from "react";
// import { Input, Select, Button, Upload, Typography } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAddProductMutation } from "../../../redux/features/productsSlice";

// const { TextArea } = Input;

// const AddProducts = () => {

//   const [addProduct] = useAddProductMutation()
//   const [image, setImage] = useState(null);

//   const handleUpload = ({ file }) => {
//     setImage(file);
//   };

//   const handleSave = () => {
//     console.log("Save Product");
//   };

//   const handleAddVariant = () => {
//     console.log("Add Variant");
//   };

//   return (
//     <div className="container mx-auto px-6 py-8 bg-white shadow-md rounded-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <Link to={"/products"}>
//             <Button
//               type="link"
//               icon={
//                 <span className="material-icons">
//                   <ArrowLeft />
//                 </span>
//               }
//               className="text-black text-lg"
//             />
//           </Link>
//           <h2 className="text-3xl font-semibold">Order Product List</h2>
//         </div>
//       </div>

//       {/* Product Form */}
//       <div className=" gap-6">
//         {/* Image Upload */}
//         <div className="flex  gap-10">
//           <Upload
//             listType="picture-card"
//             maxCount={1}
//             onChange={handleUpload}
//             // className="w-full"
//           >
//             {!image && (
//               <div className="text-center">
//                 <UploadOutlined className="text-2xl mb-2" />
//                 <Typography.Text>Upload Image</Typography.Text>
//               </div>
//             )}
//           </Upload>
//           <div>
//             <Typography.Title level={4} className="mt-4 text-gray-500">
//               Product Name
//             </Typography.Title>
//             <div className="flex flex-col">
//               <Typography.Text className="text-gray-400">
//                 Product Description
//               </Typography.Text>
//             </div>
//             <div className="flex gap-5 items-center">
//               <Typography.Text className="line-through text-gray-500">
//                 $100.00
//               </Typography.Text>
//               <Typography.Text className="text-gray-800 text-lg font-semibold ">
//                 $300.00
//               </Typography.Text>
//             </div>
//           </div>
//         </div>

//         {/* Form Inputs */}
//         <div className="col-span-2 mt-10 border p-4 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {/* Product Name */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Product Name
//               </label>
//               <Input placeholder="Enter a product name" className="py-3" />
//             </div>

//             {/* Brand */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Brand
//               </label>
//               <Input placeholder="Enter a brand name" className="py-3" />
//             </div>

//             {/* Model Name */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Model Name
//               </label>
//               <Input placeholder="Enter a model name" className="py-3" />
//             </div>

//             {/* Product Condition */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Product Condition
//               </label>
//               <Select
//                 placeholder="Select condition"
//                 options={[
//                   { value: "New", label: "New" },
//                   { value: "Used", label: "Used" },
//                 ]}
//                 className="w-full rounded-lg"
//                 allowClear
//               />
//             </div>

//             {/* Controller */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Controller
//               </label>
//               <Input placeholder="Enter a controller name" className="py-3" />
//             </div>

//             {/* Memory */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Memory
//               </label>
//               <Select
//                 placeholder="Select memory"
//                 options={[
//                   { value: "16GB", label: "16GB" },
//                   { value: "32GB", label: "32GB" },
//                   { value: "64GB", label: "64GB" },
//                 ]}
//                 className="w-full"
//                 allowClear
//               />
//             </div>
//           </div>

//           {/* Product Description */}
//           <div className="mb-6">
//             <label className="block mb-1 text-gray-700 font-medium">
//               Product Description
//             </label>
//             <TextArea
//               rows={6}
//               placeholder="Enter a product description"
//               className="py-3"
//             />
//           </div>

//           {/* Pricing and Availability */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Regular Price */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Regular Price
//               </label>
//               <Input placeholder="$0.00" type="number" className="py-3" />
//             </div>

//             {/* Offer Price */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Add Offer Price
//               </label>
//               <Input placeholder="$0.00" type="number" className="py-3" />
//             </div>

//             {/* Available Products */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Available Products
//               </label>
//               <Input placeholder="Enter available products" className="py-3" />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4">
//             <Button
//               onClick={handleAddVariant}
//               className="border border-black text-black hover:bg-gray-100"
//             >
//               Add Variant
//             </Button>
//             <Button
//               type="primary"
//               onClick={handleSave}
//               className="bg-black text-white py-3"
//             >
//               Save Product
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProducts;



// import { useState } from "react";
// import { Input, Select, Button, Upload, Typography, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAddProductMutation } from "../../../redux/features/productsSlice";

// const { TextArea } = Input;

// const AddProducts = () => {
//   const [addProduct] = useAddProductMutation();
//   const [image, setImage] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     offer_price: 0,
//     brand: "",
//     model: "",
//     condition: "",
//     controller: "",
//     memory: "",
//     quantity: 0,
//     product_type: "",
//   });

//   console.log(formData)

//   const handleUpload = ({ file }) => {
//     setImage(file);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       // Validate product_type and controller
//       if (!formData.product_type.trim()) {
//         message.error("Product type is required");
//         return;
//       }

//       if (isNaN(formData.controller)) {
//         message.error("Controller must be a valid number");
//         return;
//       }

//       // Validate image
//       if (!image) {
//         message.error("An image is required");
//         return;
//       }

//       const productData = new FormData();
//       productData.append("name",  JSON.stringify(formData.name));
//       productData.append("description", JSON.stringify(formData.description));
//       productData.append("price", JSON.stringify(formData.price));
//       productData.append("offer_price", JSON.stringify(formData.offer_price));
//       productData.append("brand", formData.brand);
//       productData.append("model", formData.model);
//       productData.append("condition", formData.condition);
//       productData.append("controller", Number(formData.controller)); // Ensure it's a number
//       productData.append("memory", formData.memory);
//       productData.append("quantity", formData.quantity);
//       productData.append("product_type", formData.product_type.trim()); // Ensure it's not empty
//       productData.append("images", image); // Append the image file

//       // Log form data for debugging
//       console.log("Form Data:", JSON.stringify(Object.fromEntries(productData), null, 2));

//       const response = await addProduct(productData).unwrap();
//       message.success(response.message);
//       console.log("Product created successfully:", response.data);
//     } catch (error) {
//       message.error("Failed to create product");
//       console.error("Error creating product:", error);
//     }
//   };

//   const handleAddVariant = () => {
//     console.log("Add Variant");
//   };

//   return (
//     <div className="container mx-auto px-6 py-8 bg-white shadow-md rounded-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <Link to={"/products"}>
//             <Button
//               type="link"
//               icon={
//                 <span className="material-icons">
//                   <ArrowLeft />
//                 </span>
//               }
//               className="text-black text-lg"
//             />
//           </Link>
//           <h2 className="text-3xl font-semibold">Order Product List</h2>
//         </div>
//       </div>

//       {/* Product Form */}
//       <div className=" gap-6">
//         {/* Image Upload */}
//         <div className="flex  gap-10">
//           <Upload
//             listType="picture-card"
//             maxCount={1}
//             onChange={handleUpload}
//           >
//             {!image && (
//               <div className="text-center">
//                 <UploadOutlined className="text-2xl mb-2" />
//                 <Typography.Text>Upload Image</Typography.Text>
//               </div>
//             )}
//           </Upload>
//           <div>
//             <Typography.Title level={4} className="mt-4 text-gray-500">
//               Product Name
//             </Typography.Title>
//             <div className="flex flex-col">
//               <Typography.Text className="text-gray-400">
//                 Product Description
//               </Typography.Text>
//             </div>
//             <div className="flex gap-5 items-center">
//               <Typography.Text className="line-through text-gray-500">
//                 $100.00
//               </Typography.Text>
//               <Typography.Text className="text-gray-800 text-lg font-semibold ">
//                 $300.00
//               </Typography.Text>
//             </div>
//           </div>
//         </div>

//         {/* Form Inputs */}
//         <div className="col-span-2 mt-10 border p-4 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {/* Product Name */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Product Name
//               </label>
//               <Input
//                 name="name"
//                 placeholder="Enter a product name"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Brand */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Brand
//               </label>
//               <Input
//                 name="brand"
//                 placeholder="Enter a brand name"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Model Name */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Model Name
//               </label>
//               <Input
//                 name="model"
//                 placeholder="Enter a model name"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Product Condition */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Product Condition
//               </label>
//               <Select
//                 placeholder="Select condition"
//                 options={[
//                   { value: "New", label: "New" },
//                   { value: "Used", label: "Used" },
//                 ]}
//                 className="w-full rounded-lg"
//                 allowClear
//                 onChange={(value) => handleSelectChange("condition", value)}
//               />
//             </div>

//             {/* Controller */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Controller
//               </label>
//               <Input
//                 name="controller"
//                 placeholder="Enter a controller number"
//                 type="number"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Memory */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Memory
//               </label>
//               <Select
//                 placeholder="Select memory"
//                 options={[
//                   { value: "16GB", label: "16GB" },
//                   { value: "32GB", label: "32GB" },
//                   { value: "64GB", label: "64GB" },
//                 ]}
//                 className="w-full"
//                 allowClear
//                 onChange={(value) => handleSelectChange("memory", value)}
//               />
//             </div>
//           </div>

//           {/* Product Description */}
//           <div className="mb-6">
//             <label className="block mb-1 text-gray-700 font-medium">
//               Product Description
//             </label>
//             <TextArea
//               name="description"
//               rows={6}
//               placeholder="Enter a product description"
//               className="py-3"
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Pricing and Availability */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Regular Price */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Regular Price
//               </label>
//               <Input
//                 name="price"
//                 placeholder="$0.00"
//                 type="number"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Offer Price */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Add Offer Price
//               </label>
//               <Input
//                 name="offer_price"
//                 placeholder="$0.00"
//                 type="number"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Available Products */}
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Available Products
//               </label>
//               <Input
//                 name="quantity"
//                 placeholder="Enter available products"
//                 type="number"
//                 className="py-3"
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           {/* Product Type */}
//           <div className="mb-6">
//             <label className="block mb-1 text-gray-700 font-medium">
//               Product Type
//             </label>
//             <Input
//               name="product_type"
//               placeholder="Enter product type"
//               className="py-3"
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4">
//             <Button
//               onClick={handleAddVariant}
//               className="border border-black text-black hover:bg-gray-100"
//             >
//               Add Variant
//             </Button>
//             <Button
//               type="primary"
//               onClick={handleSave}
//               className="bg-black text-white py-3"
//             >
//               Save Product
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProducts;


import { useState } from "react";
import { Input, Select, Button, Upload, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../redux/features/productsSlice";

const { TextArea } = Input;

const AddProducts = () => {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const [image, setImage] = useState(null);
  const [productTypeColor, setProductTypeColor] = useState("");
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

  const handleUpload = ({ file }) => {
    setImage(file);
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

      if (!image) {
        message.error("An image is required");
        return;
      }

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
      productData.append("images", image);

      console.log("Submitting Form Data:", Object.fromEntries(productData));

      const response = await addProduct(productData).unwrap();

      navigate('/products'); // Redirect to product detail page after successful creation

      message.success(response.message);
      console.log("Product created successfully:", response.data);
    } catch (error) {
      message.error("Failed to create product");
      console.error("Error creating product:", error);
    }
  };

  // const handleAddVariant = () => {
  //   console.log("Add Variant");
  // };

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
    <div className={`container mx-auto px-6 py-8 shadow-md rounded-md ${getBackgroundColor()}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to={"/products"}>
            <Button type="link" icon={<ArrowLeft />} className="text-black text-lg" />
          </Link>
          <h2 className="text-3xl font-semibold">Add Product</h2>
        </div>
      </div>

      {/* Product Form */}
      <div className="gap-6">
        {/* Image Upload */}
        <div className="flex gap-10">
          <Upload listType="picture-card" maxCount={1} beforeUpload={() => false} onChange={handleUpload}>
            {!image && (
              <div className="text-center">
                <UploadOutlined className="text-2xl mb-2" />
                <Typography.Text>Upload Image</Typography.Text>
              </div>
            )}
          </Upload>
        </div>

        {/* Form Inputs */}
        <div className={`col-span-2 mt-10 border p-4 rounded-lg`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input name="name" placeholder="Product Name" onChange={handleInputChange} />
            <Input name="brand" placeholder="Brand" onChange={handleInputChange} />
            <Input name="model" placeholder="Model Name" onChange={handleInputChange} />
            <Select placeholder="Condition" options={[{ value: "New", label: "New" }, { value: "Used", label: "Used" }]} onChange={(value) => handleSelectChange("condition", value)} />
            <Input name="controller" placeholder="Controller" type="number" onChange={handleInputChange} />
            <Select placeholder="Memory" options={[{ value: "16GB", label: "16GB" }, { value: "32GB", label: "32GB" }, { value: "64GB", label: "64GB" }]} onChange={(value) => handleSelectChange("memory", value)} />
          </div>

          <TextArea name="description" className="mb-6" rows={4} placeholder="Product Description" onChange={handleInputChange} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input name="price" placeholder="Regular Price ($)" type="number" onChange={handleInputChange} />
            <Input name="offer_price" placeholder="Offer Price ($)" type="number" onChange={handleInputChange} />
            <Input name="quantity" placeholder="Available Products" type="number" onChange={handleInputChange} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Type</label>
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
            {/* <Button onClick={handleAddVariant} className="border border-black text-black hover:bg-gray-100">
              Add Variant
            </Button> */}
            <Button type="primary" onClick={handleSave} className="bg-black text-white py-3">
              Save Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
