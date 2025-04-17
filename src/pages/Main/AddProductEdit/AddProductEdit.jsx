/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input, Select, Button, Upload, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	useDeleteProductMutation,
	useEditProductMutation,
	useProductByNameQuery,
} from "../../../redux/features/productsSlice";
import Swal from "sweetalert2";

const { TextArea } = Input;

const AddProductEditComponent = ({ product, refetch }) => {
	const [editProduct] = useEditProductMutation();
	const [deleteProduct] = useDeleteProductMutation();

	const IMAGE = import.meta.env.VITE_IMAGE_API;

	const [image, setImage] = useState(null);
	const [oldImage, setOldImage] = useState(true);
	const [formData, setFormData] = useState(product);

	const [productTypeColor, setProductTypeColor] = useState(product?.product_type);

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
			productData.append("slug", formData.slug.trim());
			image && productData.append("images", image);

			productData.append("modelDes", formData.modelDes);
			productData.append("conditionDes", formData.conditionDes);
			productData.append("controllerDes", formData.controllerDes);
			productData.append("memoryDes", formData.memoryDes);

			console.log("Submitting Form Data:", Object.fromEntries(productData));

			// Call the editProduct mutation with id and formData
			const response = await editProduct({
				id: product._id, // Pass the product ID
				formData: productData, // Pass the FormData object
			}).unwrap();

			// navigate("/products"); // Redirect to the product list page after successful update

			message.success(response.message);
			console.log("Product updated successfully:", response.data);
		} catch (error) {
			message.error("Failed to update product");
			console.error("Error updating product:", error);
		}
	};

	const handleDeleteProduct = async (productId) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				// Call the deleteProduct mutation
				await deleteProduct(productId).unwrap();

				// Show success message
				Swal.fire({
					title: "Deleted!",
					text: "Your product has been deleted.",
					icon: "success",
				});
				await refetch();

				// Optionally, you can refetch the products list here if needed
				// refetch();
			}
		} catch (error) {
			// Handle error
			Swal.fire({
				title: "Error!",
				text: "An error occurred while deleting the product.",
				icon: "error",
			});
			console.error("Error deleting product:", error);
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
		<div className='container mx-auto px-6 py-8 bg-white shadow-md rounded-md'>
			{/* Header */}
			<div className='flex justify-between items-center mb-6'>
				<div className='flex items-center gap-2'>
					<Link to={"/products"}>
						<Button
							type='link'
							icon={<ArrowLeft />}
							className='text-black text-lg'
						/>
					</Link>
					<h2 className='text-3xl font-semibold'>Edit Product</h2>
				</div>
			</div>

			{/* Product Form */}
			<div className='gap-6'>
				{/* Image Upload */}
				<div className='flex gap-10'>
					<Upload
						listType='picture-card'
						maxCount={1}
						beforeUpload={() => false}
						onChange={handleUpload}>
						{oldImage ? (
							<img src={IMAGE + product?.images?.[0]} />
						) : (
							!image && (
								<div className='text-center'>
									<UploadOutlined className='text-2xl mb-2' />
									<Typography.Text>Upload Image</Typography.Text>
								</div>
							)
						)}
					</Upload>
				</div>

				{/* Form Inputs */}
				<div className={`col-span-2 mt-10 border p-4 rounded-lg ${getBackgroundColor()}`}>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
						<div>
							<label className='block text-sm font-medium mb-1'>Product Name</label>
							<Input
								name='name'
								placeholder='Product Name'
								value={formData.name}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Brand</label>
							<Input
								name='brand'
								placeholder='Brand'
								value={formData.brand}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Model Name</label>
							<Input
								name='model'
								placeholder='Model Name'
								value={formData.model}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Condition</label>
							<Select
								placeholder='Condition'
								value={formData.condition}
								options={[
									{ value: "New", label: "New" },
									{ value: "Used", label: "Used" },
								]}
								onChange={(value) => handleSelectChange("condition", value)}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Controller</label>
							<Input
								name='controller'
								placeholder='Controller'
								type='number'
								value={formData.controller}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Memory</label>
							<Select
								placeholder='Memory'
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
								className='w-full h-10' // Fixed width and height
							/>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium mb-1'>Product Description</label>
						<TextArea
							name='description'
							className='w-full h-24 mb-6' // Fixed width and height
							rows={4}
							placeholder='Product Description'
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
						<div>
							<label className='block text-sm font-medium mb-1'>Regular Price ($)</label>
							<Input
								name='price'
								placeholder='Regular Price ($)'
								type='number'
								value={formData.price}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Offer Price ($)</label>
							<Input
								name='offer_price'
								placeholder='Offer Price ($)'
								type='number'
								value={formData.offer_price}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Available Products</label>
							<Input
								name='quantity'
								placeholder='Available Products'
								type='number'
								value={formData.quantity}
								onChange={handleInputChange}
								className='w-full h-10' // Fixed width and height
							/>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium mb-1'>Product Type</label>
						<Select
							placeholder='Product Type'
							value={formData.product_type}
							options={[
								{ value: "xbox", label: "Xbox" },
								{ value: "playstation", label: "PlayStation" },
								{ value: "nintendo", label: "Nintendo" },
							]}
							onChange={(value) => handleSelectChange("product_type", value)}
							className='w-full h-10' // Fixed width and height
						/>
					</div>

					<div className='mt-6'>
						<label className='block text-sm font-medium mb-1'>Slug</label>
						<Input
							name='slug'
							placeholder='Slug'
							value={formData.slug}
							onChange={handleInputChange}
							className='w-full h-10'
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 my-4'>
						<div>
							<label className='block text-sm font-medium mb-1'>Model description</label>
							<Input
								name='modelDes'
								value={formData.modelDes}
								placeholder='Model placeholder description'
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Controller description</label>
							<Input
								name='controllerDes'
								value={formData.controllerDes}
								placeholder='Controller placeholder description'
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Memory description</label>
							<Input
								name='memoryDes'
								value={formData.memoryDes}
								placeholder='Memory placeholder description'
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Condition description</label>
							<Input
								name='conditionDes'
								value={formData.conditionDes}
								placeholder='Condition placeholder description'
								onChange={handleInputChange}
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex justify-end gap-4 mt-6'>
						<Button
							type='primary'
							onClick={handleSave}
							className='bg-black text-white py-3'>
							Save Product
						</Button>
						<Button
							type='error'
							onClick={() => handleDeleteProduct(product._id)}
							className='bg-rose-500 text-white py-3'>
							Delete
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const AddProductEdit = () => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	const { name } = useParams();
	const { data, refetch } = useProductByNameQuery({
		name,
	});

	useEffect(() => {
		if (data) {
			if (data?.data?.length === 0) navigate("/products");
			else setProducts(data?.data);
		}
	}, [data, navigate]);

	return (
		<div className='flex flex-col gap-10'>
			{products.map((product) => (
				<AddProductEditComponent
					key={product?._id}
					product={product}
					refetch={refetch}
				/>
			))}
		</div>
	);
};

export default AddProductEdit;
