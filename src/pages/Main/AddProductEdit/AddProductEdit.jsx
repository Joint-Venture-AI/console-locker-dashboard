/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input, Button, Upload, Typography, message } from "antd";
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
	const [oldImage, setOldImage] = useState(product?.images?.length);
	const [formData, setFormData] = useState(product);

	const handleUpload = ({ file }) => {
		setImage(file);
		setOldImage(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value ?? "" });
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

			if (!formData.controller.trim()) {
				message.error("Controller is required");
				return;
			}

			if (!formData.quantity || isNaN(Number(formData.quantity))) {
				message.error("Quantity must be a valid number");
				return;
			}

			if (!oldImage && !image) {
				message.error("An image is required");
				return;
			}

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
				slug: product.slug, // Pass the product ID
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
		switch (product?.product_type) {
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
			className={`container mx-auto p-6 my-0 ${getBackgroundColor()} shadow-md rounded-md`}
		>
			<div className="gap-6">
				<div className="flex gap-4 mb-4">
					<div className="flex gap-10 h-fit bg-white rounded-lg p-2">
						<Upload
							listType="picture-card"
							maxCount={1}
							beforeUpload={() => false}
							onChange={handleUpload}
						>
							{oldImage ? (
								<img src={IMAGE + product?.images?.[0]} />
							) : (
								!image && (
									<div className="text-center">
										<UploadOutlined className="text-2xl mb-2" />
										<Typography.Text>Upload Image</Typography.Text>
									</div>
								)
							)}
						</Upload>
					</div>
					<div className="flex-grow">
						<label className="block text-lg font-medium -mt-1 mb-1">
							Description
						</label>
						<TextArea
							name="description"
							className="w-full"
							rows={8}
							placeholder="Product Description"
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Form Inputs */}
				<div className={`col-span-2 border p-4 rounded-lg`}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
						<div>
							<label className="block text-sm font-medium mb-1">
								Model Name
							</label>
							<Input
								name="model"
								placeholder="Model Name"
								value={formData.model}
								onChange={handleInputChange}
								className="w-full h-10"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Condition
							</label>
							<Input
								name="condition"
								placeholder="Condition"
								type="text"
								value={formData.condition}
								onChange={handleInputChange}
								className="w-full h-10"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Controller
							</label>
							<Input
								name="controller"
								placeholder="Controller"
								type="text"
								value={formData.controller}
								onChange={handleInputChange}
								className="w-full h-10"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Memory</label>
							<Input
								name="memory"
								placeholder="Memory"
								type="text"
								value={formData.memory}
								onChange={handleInputChange}
								className="w-full h-10"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
								className="w-full h-10"
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
								className="w-full h-10"
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
								className="w-full h-10"
							/>
						</div>
					</div>

					<div className="mt-2">
						<label className="block text-sm font-medium mb-1">Slug</label>
						<Input
							name="slug"
							placeholder="Slug"
							value={formData.slug}
							onChange={handleInputChange}
							className="w-full h-10"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 my-2">
						<div>
							<label className="block text-sm font-medium mb-1">
								Model description
							</label>
							<Input
								name="modelDes"
								value={formData.modelDes}
								placeholder="Model placeholder description"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Controller description
							</label>
							<Input
								name="controllerDes"
								value={formData.controllerDes}
								placeholder="Controller placeholder description"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Memory description
							</label>
							<Input
								name="memoryDes"
								value={formData.memoryDes}
								placeholder="Memory placeholder description"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Condition description
							</label>
							<Input
								name="conditionDes"
								value={formData.conditionDes}
								placeholder="Condition placeholder description"
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="flex justify-end gap-4 mt-4">
						<Button
							type="primary"
							onClick={handleSave}
							className="bg-black text-white py-3"
						>
							Save Product
						</Button>
						{product?._id && (
							<Button
								type="error"
								onClick={() => handleDeleteProduct(product._id)}
								className="bg-rose-500 text-white py-3"
							>
								Delete
							</Button>
						)}
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
		<div className="flex flex-col gap-6">
			<div className="sticky top-0 z-10 p-4 bg-white">
				<div className="flex items-center gap-2">
					<Link to={"/products"}>
						<Button
							type="link"
							icon={<ArrowLeft />}
							className="text-black text-lg"
						/>
					</Link>
					<div className="flex flex-col">
						<h3 className="text-lg font-bold">{products[0]?.name}</h3>
						<p>{products[0]?.brand}</p>
					</div>
				</div>
			</div>
			{products.map((product) => (
				<AddProductEditComponent
					key={product?._id}
					product={product}
					refetch={refetch}
				/>
			))}
			<Button
				type="primary"
				disabled={!products.at(-1)?._id}
				onClick={() => {
					setProducts([
						...products,
						{
							images: undefined,
							name: products.at(-1)?.name,
							description: "",
							price: undefined,
							offer_price: undefined,
							brand: products.at(-1)?.brand,
							model: "",
							condition: "",
							controller: "",
							memory: "",
							quantity: undefined,
							isVariant: false,
							product_type: products.at(-1)?.product_type,
							slug: products.at(-1)?.slug + "-" + Date.now(),
							modelDes: "",
							conditionDes: "",
							controllerDes: "",
							memoryDes: "",
						},
					]);
				}}
				className="w-fit p-6"
			>
				Add Variant
			</Button>
		</div>
	);
};

export default AddProductEdit;
