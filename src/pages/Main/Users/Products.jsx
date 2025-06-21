/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import Swal from "sweetalert2";
import {
	useAllProductGetQuery,
	useDeleteProductByNameMutation,
	useUpdateProductLabelMutation,
} from "../../../redux/features/productsSlice";
import toast from "react-hot-toast";
import { getBackgroundColor } from "../../../lib/productTypeColor";

const productTypes = ["xbox", "playstation", "nintendo"];

export default function ProductPage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [activeTab, setActiveTab] = useState(
		productTypes.find((type) => type === searchParams.get("product_type")) ||
			productTypes[0]
	);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		params.set("product_type", activeTab);
		setSearchParams(params, {
			replace: true,
		});
	}, [activeTab, setSearchParams, searchParams]);

	const [page, setPage] = useState(1);

	const { data, isLoading, isError, refetch } = useAllProductGetQuery({
		limit: 12,
		page,
		product_type: activeTab,
		refProduct: searchParams.get("ref"),
	});

	const [updateLabel] = useUpdateProductLabelMutation();

	const [deleteProduct] = useDeleteProductByNameMutation();
	const [view] = useState("grid");
	const [openMenu, setOpenMenu] = useState(null);

	// Extract products from API response safely
	const products = data?.data?.products || [];
	const pagination = data?.data?.meta?.pagination || {};

	const IMAGE = import.meta.env.VITE_IMAGE_API;
	console.log(IMAGE, "image api");

	const handleDeleteProduct = async (productName) => {
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
				await deleteProduct(productName).unwrap();

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

	return (
		<div className="pb-[250px]">
			<div className="sticky top-0 z-10 p-4 bg-white mb-4">
				<div className="flex items-center gap-2">
					<Button
						onClick={() => navigate(-1)}
						type="link"
						icon={<ArrowLeft />}
						className="text-black text-lg"
					/>

					<div className="flex items-center flex-col py-3">
						<h3 className="text-2xl font-bold">
							{searchParams?.get("ref")
								? "Accessories of " + searchParams?.get("ref")
								: "Products"}
						</h3>
					</div>
				</div>
				{
					<Link
						to={`/addProducts${
							searchParams.get("ref") ? "?ref=" + searchParams.get("ref") : ""
						}`}
						className="absolute top-1/2 -translate-y-1/2 right-4"
					>
						<button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium click">
							Add Product
						</button>
					</Link>
				}
			</div>

			<div className="flex flex-wrap gap-3 mt-[30px] mb-[10px] mx-10">
				{productTypes.map((tab, idx) => (
					<button
						key={idx}
						disabled={activeTab === tab}
						className={`${
							activeTab === tab
								? "font-bold  border-0 cursor-not-allowed text-white"
								: "text-gray-500 border-[#99caff] cursor-pointer border"
						} py-3 px-5 rounded-md box-border capitalize`}
						style={{
							backgroundColor: activeTab === tab && getBackgroundColor(tab),
							borderColor: activeTab !== tab && getBackgroundColor(tab),
						}}
						onClick={() => {
							setActiveTab(tab);
						}}
					>
						{tab}
					</button>
				))}
			</div>

			{isLoading ? (
				<p className="text-center text-lg">Loading products...</p>
			) : isError ? (
				<p className="text-center text-lg text-red-500">
					Error loading products.
				</p>
			) : (
				<div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
					<div className="w-full lg:ml-6">
						<div
							className={`grid ${
								view === "grid"
									? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
									: ""
							} gap-6`}
						>
							{products.map((product) => (
								<div
									key={product._id}
									className="shadow rounded-lg pb-2 relative"
								>
									<div className="relative">
										<img
											src={
												product.images.length > 0
													? `${IMAGE}${product.images[0]}`
													: "/placeholder.png"
											}
											alt={product.name}
											className="w-full aspect-square object-center rounded-t-lg"
										/>
										{product?.order > 0 &&
											product?.order < Number.MAX_SAFE_INTEGER - 1 && (
												<span className="absolute top-0 right-0 bg-black/20 backdrop-blur-sm px-4 py-1 font-bold rounded-bl-2xl text-[14px] text-white drop-shadow-md">
													{product?.order}
												</span>
											)}
									</div>
									<div className="px-3">
										<h3 className="text-lg font-semibold mb-2 mt-5">
											{product.name}
										</h3>
										<div className="text-gray-600 mb-2 flex items-center justify-between">
											<div>
												Condition:{" "}
												<span className="font-semibold">
													{product.condition}
												</span>
											</div>
											<div
												className="relative"
												onClick={() =>
													setOpenMenu((prev) =>
														prev === product._id ? null : product._id
													)
												}
											>
												<Info className="cursor-pointer" />
												{openMenu === product._id && (
													<div className="absolute right-0 top-6 bg-white shadow-lg rounded-md py-2 w-32 z-[99]">
														<form
															onClick={(e) => e.stopPropagation()}
															onSubmit={async (e) => {
																e.preventDefault();
																const order = parseInt(e.target.order.value);
																try {
																	await updateLabel({
																		name: product.name,
																		data: { order },
																	}).unwrap();
																} catch (error) {
																	toast.error(error.message);
																}
															}}
															className="flex gap-2 px-4 py-2 w-full relative"
														>
															<input
																type="number"
																name="order"
																placeholder="Order"
																defaultValue={
																	product?.order > 0 &&
																	product?.order <
																		Number.MAX_SAFE_INTEGER - 1 &&
																	product?.order
																}
																className="border border-gray-800 rounded-md w-full pl-2"
															/>
															<button
																type="submit"
																className="click hover:text-blue-500 transition"
															>
																<Save />
															</button>
														</form>
														<Link to={`/addEditProducts/${product?.name}`}>
															<button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
																Variant
															</button>
														</Link>
														{!searchParams?.get("ref") && (
															<button
																onClick={() => {
																	const params = new URLSearchParams(
																		searchParams
																	);
																	params.set("ref", product?.name);
																	setSearchParams(params);
																}}
																className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
															>
																Accessories
															</button>
														)}
														<Link to={`/review/${product?.name}`}>
															<button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
																Review
															</button>
														</Link>
														<button
															onClick={() => handleDeleteProduct(product?.name)}
															className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
														>
															Delete
														</button>
													</div>
												)}
											</div>
										</div>
										<div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
											<div className="flex items-center gap-2">
												<p>Price:</p>
												<span className="text-green-500 font-semibold">
													${product.offer_price || product.price}
												</span>
											</div>
											{product.offer_price && (
												<span className="line-through">${product.price}</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Pagination */}
						{pagination?.total_pages > 1 && (
							<div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
								<button
									onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
									className={`px-4 py-2 rounded-md hover:bg-gray-300 transition ${
										page === 1 ? "cursor-not-allowed opacity-50" : "bg-gray-200"
									}`}
									disabled={page === 1}
								>
									<ChevronLeft />
								</button>
								{Array.from({ length: pagination?.total_pages }, (_, index) => (
									<button
										key={index + 1}
										onClick={() => setPage(index + 1)}
										className={`px-4 py-2 m-1 rounded-md transition ${
											page === index + 1
												? "bg-black text-white"
												: "bg-gray-200 hover:bg-gray-300"
										}`}
										style={{ minWidth: "40px" }}
									>
										{index + 1}
									</button>
								))}
								<button
									onClick={() =>
										setPage((prev) =>
											Math.min(prev + 1, pagination?.total_pages)
										)
									}
									className={`px-4 py-2 rounded-md hover:bg-gray-300 transition ${
										page === pagination?.total_pages
											? "cursor-not-allowed opacity-50"
											: "bg-gray-200"
									}`}
									disabled={page === pagination?.total_pages}
								>
									<ChevronRight />
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
