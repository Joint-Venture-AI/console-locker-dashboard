import { useEffect, useState } from "react";
import { Table, Button, Pagination, Input, Modal, Form } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
	useAllManageOrdersQuery,
	useOrderDetailsQuery,
	useSendReceipt0Mutation,
	useShipOrderMutation,
} from "../../../redux/features/manageOrderSlice";
import toast from "react-hot-toast";

const Orders = () => {
	const [statusFilter, setStatusFilter] = useState("All"); // Tracks selected status filter
	const [currentPage, setCurrentPage] = useState(1); // Tracks current page
	const pageSize = 10; // Number of items per page

	const { data } = useAllManageOrdersQuery({
		page: currentPage,
		limit: pageSize,
	});

	const [selectedOrder, setSelectedOrder] = useState(null); // Initialize as null
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [receiptNumber, setReceiptNumber] = useState("");
	const [shipOrder] = useShipOrderMutation();
	const [sendReceipt] = useSendReceipt0Mutation();

	// Fetch order details only if selectedOrder is defined
	const { data: orderDetails } = useOrderDetailsQuery(
		{ orderId: selectedOrder },
		{
			skip: !selectedOrder, // Skip the query if selectedOrder is not defined
		}
	);

	useEffect(() => {
		setReceiptNumber(orderDetails?.data?.receipt);
	}, [orderDetails]);

	console.log(orderDetails?.data?.productDetails);
	const handleFilter = (status) => {
		setStatusFilter(status);
		setCurrentPage(1); // Reset to the first page when changing filters
	};

	const handleShipOrder = async (orderId) => {
		const toastId = toast.loading("Shipping order...");
		try {
			await shipOrder(orderId).unwrap();
			setIsModalVisible(false); // Close the modal after shipping
			toast.success("Order shipped successfully", { id: toastId });
		} catch (err) {
			toast.error("Failed to ship the order.", { id: toastId });
		}
	};

	const handleSendReceipt = async () => {
		if (!receiptNumber) {
			toast.error("Please enter a receipt number.");
			return;
		}

		const toastId = toast.loading("Sending receipt...");

		try {
			await sendReceipt({
				orderId: selectedOrder,
				receipt: receiptNumber,
			}).unwrap();
			setIsModalVisible(false); // Close the modal after sending receipt
			toast.success("Order receipt sent successfully", { id: toastId });
		} catch (err) {
			toast.error("Failed to send order receipt.", { id: toastId });
		}
	};

	const showOrderDetails = (orderId) => {
		setSelectedOrder(orderId); // Set the selected order ID
		setIsModalVisible(true); // Show the modal
	};

	const filteredOrders =
		statusFilter === "All"
			? data?.data?.orders || []
			: data?.data?.orders.filter((order) => order.state === statusFilter);

	const totalOrders = data?.data?.meta?.total || 0;

	const IMAGE = import.meta.env.VITE_IMAGE_API;

	const columns = [
		{
			title: "Product",
			dataIndex: "productDetails",
			key: "productDetails",
			render: (productDetails, record) => (
				<div className="flex items-center gap-4">
					<img
						src={`${IMAGE}${productDetails[0]?.product?.images[0]}`}
						alt="Product"
						className="w-12 h-12 rounded-lg"
					/>
					<div>
						<p className="font-medium">
							{productDetails[0]?.product?.name || "Unknown Product"}
						</p>
						<p className="text-gray-500 text-sm">
							{new Date(record.createdAt).toLocaleString("en-US", {
								day: "numeric",
								month: "short",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}
						</p>
					</div>
				</div>
			),
		},
		{
			title: "Customer",
			dataIndex: "customer",
			key: "customer",
			render: (customer) => <span>{customer?.name || "Unknown Customer"}</span>,
		},
		{
			title: "Transaction ID",
			dataIndex: "transaction",
			key: "transaction",
			render: (transaction) => (
				<span>{transaction?.transaction_id || "N/A"}</span>
			),
		},
		{
			title: "Payment Method",
			dataIndex: "payment_method",
			key: "payment_method",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (amount) => `$${amount}`,
		},
		{
			title: "State",
			dataIndex: "state",
			key: "state",
			render: (state) => (
				<span
					className={`px-3 py-1 rounded-full text-sm ${
						state === "success"
							? "bg-green-100 text-green-600"
							: state === "pending"
							? "bg-blue-100 text-blue-600"
							: state === "cancel"
							? "bg-pink-100 text-pink-600"
							: "bg-yellow-100 text-yellow-600"
					}`}
				>
					{state}
				</span>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button type="primary" onClick={() => showOrderDetails(record._id)}>
					Info
				</Button>
			),
		},
	];

	return (
		<div className="container mx-auto px-6 py-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-2">
					<Link to={"/"}>
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
				<span className="text-lg font-medium">
					Total: <span className="text-black">{data?.data?.meta?.total}</span>
				</span>
			</div>

			{/* Filter Buttons */}
			<div className="flex gap-4 mb-6">
				{["All", "pending", "shipped", "success", "cancel"].map((status) => (
					<Button
						key={status}
						onClick={() => handleFilter(status)}
						className={`px-4 py-1 rounded-full ${
							statusFilter === status
								? "bg-black text-white"
								: "bg-gray-100 text-black"
						}`}
					>
						{status}
					</Button>
				))}
			</div>

			{/* Table */}
			<Table
				columns={columns}
				dataSource={filteredOrders}
				pagination={false}
				className="rounded-lg"
			/>

			<div className="flex justify-between items-center mt-6">
				<Pagination
					current={currentPage}
					total={totalOrders}
					pageSize={pageSize}
					onChange={(page) => setCurrentPage(page)}
					showSizeChanger={false}
					className="flex-1"
				/>
				<div className="flex items-center gap-2">
					<span>Page</span>
					<Input
						value={currentPage}
						onChange={(e) =>
							setCurrentPage(
								Math.min(
									Math.max(Number(e.target.value), 1),
									Math.ceil(totalOrders / pageSize)
								)
							)
						}
						className="w-12 text-center border rounded-md"
					/>
					<span>of {Math.ceil(totalOrders / pageSize)}</span>
				</div>
			</div>

			{/* Order Details Modal */}
			<Modal
				title="Order Details"
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={[
					<Button key="back" onClick={() => setIsModalVisible(false)}>
						Close
					</Button>,
					<Button
						key="ship"
						type="primary"
						onClick={() => handleShipOrder(selectedOrder)}
						disabled={orderDetails?.data?.state === "shipped"}
					>
						{orderDetails?.data?.state}
					</Button>,
				]}
			>
				{orderDetails && (
					<div>
						<p>
							<strong>Order ID:</strong> {orderDetails?.data?._id}
						</p>
						<p>
							<strong>Customer Name:</strong>{" "}
							{orderDetails?.data?.customer?.name}
						</p>
						<p>
							<strong>Email:</strong> {orderDetails?.data?.customer?.email}
						</p>
						<p>
							<strong>Transaction ID:</strong>{" "}
							{orderDetails?.data?.transaction?.transaction_id}
						</p>
						<p>
							<strong>Payment Method:</strong>{" "}
							{orderDetails?.data?.payment_method}
						</p>
						<p>
							<strong>Amount:</strong> ${orderDetails?.data?.amount}
						</p>
						<Form.Item label="Receipt Number">
							<Input
								value={receiptNumber}
								onChange={(e) => setReceiptNumber(e.target.value)}
								placeholder="Enter receipt number"
							/>
						</Form.Item>
						<Button
							type="primary"
							onClick={handleSendReceipt}
							disabled={!receiptNumber}
						>
							Send Receipt
						</Button>

						<div>
							<div className="flex gap-4 flex-wrap">
								{orderDetails?.data?.productDetails?.map((product) => (
									<div
										key={product.product._id}
										className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg"
									>
										{/* Product Image and Name */}

										{/* Product Details */}
										<div>
											<p className="font-semibold">{product.product.name}</p>

											<p className="text-gray-600">
												Quantity: {product.quantity}
											</p>
											{/* <p className="text-gray-900 font-semibold">
                        $
                        {(
                          (product.product.offer_price ||
                            product.product.price) * product.quantity
                        ).toFixed(2)}
                      </p> */}
											<div className="flex justify-between pb-4 pt-2">
												<p className="text-sm text-gray-500 font-medium">
													Price: ${product.product.price}
												</p>
												<p className="text-sm text-gray-500 font-medium">
													Offer Price: ${product.product.offer_price}
												</p>
											</div>
											<p className="text-sm text-gray-500">
												Model:{" "}
												<span className="text-blue-600">
													{product.product.model}
												</span>
												, Controller: {product.product.controller}, Condition:{" "}
												<span
													className={
														product.product.condition === "new"
															? "text-orange-500"
															: "text-yellow-600"
													}
												>
													{product.product.condition}
												</span>
												, Memory:{" "}
												<span className="text-purple-600">
													{product.product.memory}
												</span>
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Total Amount */}
							<div className="text-lg font-bold mt-4 flex justify-between">
								<span>Total Amount:</span>
								<span className="text-blue-600">
									${orderDetails?.data?.amount}
								</span>
							</div>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default Orders;
