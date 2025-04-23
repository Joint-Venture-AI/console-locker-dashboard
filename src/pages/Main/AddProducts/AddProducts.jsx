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
		modelDes: "",
		conditionDes: "",
		controllerDes: "",
		memoryDes: "",
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
			const res = await fetch(
				import.meta.env.VITE_IMAGE_API +
					"/products/name/" +
					formData?.name +
					"/exists"
			);

			const data = await res.json();

			if (data?.data?.exists) {
				message.error("Product already exists");
				return;
			}

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

			productData.append("modelDes", formData.modelDes);
			productData.append("conditionDes", formData.conditionDes);
			productData.append("controllerDes", formData.controllerDes);
			productData.append("memoryDes", formData.memoryDes);

			console.log("Submitting Form Data:", Object.fromEntries(productData));

			const response = await addProduct({
				product: productData,
			}).unwrap();

			navigate("/products");

			message.success(response.message);
			console.log("Product created successfully:", response.data);
		} catch (error) {
			message.error("Failed to create product");
			console.error("Error creating product:", error);
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
		<div
			className={`container mx-auto px-6 py-8 shadow-md rounded-md ${getBackgroundColor()}`}
		>
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
					<h2 className="text-3xl font-semibold">Add Product</h2>
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
						<Input
							name="name"
							placeholder="Product Name"
							onChange={handleInputChange}
						/>
						<Input
							name="brand"
							placeholder="Brand"
							onChange={handleInputChange}
						/>
						<Input
							name="model"
							placeholder="Model Name"
							onChange={handleInputChange}
						/>
						<Input
							name="condition"
							placeholder="Condition"
							type="text"
							onChange={handleInputChange}
						/>
						<Input
							name="controller"
							placeholder="Controller"
							type="text"
							onChange={handleInputChange}
						/>
						<Input
							name="memory"
							placeholder="Memory"
							type="text"
							onChange={handleInputChange}
						/>
					</div>

					<TextArea
						name="description"
						className="mb-6"
						rows={4}
						placeholder="Product Description"
						onChange={handleInputChange}
					/>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<Input
							name="price"
							placeholder="Regular Price ($)"
							type="number"
							onChange={handleInputChange}
						/>
						<Input
							name="offer_price"
							placeholder="Offer Price ($)"
							type="number"
							onChange={handleInputChange}
						/>
						<Input
							name="quantity"
							placeholder="Available Products"
							type="number"
							onChange={handleInputChange}
						/>
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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 my-4">
						<Input
							name="modelDes"
							placeholder="Model placeholder description"
							onChange={handleInputChange}
						/>
						<Input
							name="controllerDes"
							placeholder="Controller placeholder description"
							onChange={handleInputChange}
						/>
						<Input
							name="memoryDes"
							placeholder="Memory placeholder description"
							onChange={handleInputChange}
						/>
						<Input
							name="conditionDes"
							placeholder="Condition placeholder description"
							onChange={handleInputChange}
						/>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end gap-4 mt-6">
						{/* <Button onClick={handleAddVariant} className="border border-black text-black hover:bg-gray-100">
              Add Variant
            </Button> */}
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
