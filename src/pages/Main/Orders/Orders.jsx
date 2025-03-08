// import { useState } from "react";
// import { Table, Button, Pagination, Input } from "antd";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import {
//   useAllManageOrdersQuery,
//   useShipOrderMutation,
// } from "../../../redux/features/manageOrderSlice";

// const Orders = () => {
//   const [statusFilter, setStatusFilter] = useState("All"); // Tracks selected status filter
//   const [currentPage, setCurrentPage] = useState(1); // Tracks current page
//   const pageSize = 10; // Number of items per page

//   const { data } = useAllManageOrdersQuery();
//   console.log(data?.data);

//   const [shipOrder] = useShipOrderMutation();

//   const products = Array.from({ length: 42 }, (_, index) => ({
//     key: index,
//     productName: "Boy's Non-Shiny ...",
//     date: "8 Sep, 2020 | 07:40 am",
//     customer: "Darrell Steward",
//     transactionId: `TXN-93A7CD5B`,
//     payment: "COD",
//     price: "$202.87",
//     stock: "40/200",
//     state:
//       index % 4 === 0
//         ? "Success"
//         : index % 4 === 1
//         ? "Pending"
//         : index % 4 === 2
//         ? "Cancel"
//         : "Shipped",
//   }));

//   const handleFilter = (status) => {
//     setStatusFilter(status);
//     setCurrentPage(1); // Reset to the first page
//   };

//   const filteredProducts =
//     statusFilter === "All"
//       ? products
//       : products.filter((product) => product.state === statusFilter);

//   const currentData = filteredProducts.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const columns = [
//     {
//       title: "Product",
//       dataIndex: "productName",
//       key: "productName",
//       render: (text, record) => (
//         <div className="flex items-center gap-4">
//           <img
//             src="/product.png"
//             alt="Product"
//             className="w-12 h-12 rounded-lg"
//           />
//           <div>
//             <p className="font-medium">{text}</p>
//             <p className="text-gray-500 text-sm">{record.date}</p>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Customer",
//       dataIndex: "customer",
//       key: "customer",
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "transactionId",
//       key: "transactionId",
//     },
//     {
//       title: "Payment",
//       dataIndex: "payment",
//       key: "payment",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Stock",
//       dataIndex: "stock",
//       key: "stock",
//     },
//     {
//       title: "State",
//       dataIndex: "state",
//       key: "state",
//       render: (state) => (
//         <span
//           className={`px-3 py-1 rounded-full text-sm ${
//             state === "Success"
//               ? "bg-green-100 text-green-600"
//               : state === "Pending"
//               ? "bg-blue-100 text-blue-600"
//               : state === "Cancel"
//               ? "bg-pink-100 text-pink-600"
//               : "bg-yellow-100 text-yellow-600"
//           }`}
//         >
//           {state}
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto px-6 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <Link to={"/"}>
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
//         <span className="text-lg font-medium">
//           Total: <span className="text-black">42</span>
//         </span>
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex gap-4 mb-6">
//         {["All", "Pending", "Shipped", "Success", "Cancel"].map((status) => (
//           <Button
//             key={status}
//             onClick={() => handleFilter(status)}
//             className={`px-4 py-1 rounded-full ${
//               statusFilter === status
//                 ? "bg-black text-white"
//                 : "bg-gray-100 text-black"
//             }`}
//           >
//             {status}
//           </Button>
//         ))}
//       </div>

//       {/* Table */}
//       <Table
//         columns={columns}
//         dataSource={currentData}
//         pagination={false}
//         className="rounded-lg"
//       />

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-6">
//         <Pagination
//           current={currentPage}
//           total={filteredProducts.length}
//           pageSize={pageSize}
//           onChange={(page) => setCurrentPage(page)}
//           showSizeChanger={false}
//           className="flex-1"
//         />
//         <div className="flex items-center gap-2">
//           <span>Page</span>
//           <Input
//             value={currentPage}
//             onChange={(e) =>
//               setCurrentPage(
//                 Math.min(
//                   Math.max(Number(e.target.value), 1),
//                   Math.ceil(filteredProducts.length / pageSize)
//                 )
//               )
//             }
//             className="w-12 text-center border rounded-md"
//           />
//           <span>of {Math.ceil(filteredProducts.length / pageSize)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import { useState } from "react";
import { Table, Button, Pagination, Input, message } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useAllManageOrdersQuery,
  useShipOrderMutation,
} from "../../../redux/features/manageOrderSlice";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All"); // Tracks selected status filter
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page
  const pageSize = 10; // Number of items per page

  const { data } = useAllManageOrdersQuery();
  const [shipOrder] = useShipOrderMutation();

  const handleFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to the first page
  };

  const handleShipOrder = async (orderId) => {
    try {
      await shipOrder(orderId).unwrap();
      message.success("Order has been shipped successfully!");
    } catch (err) {
      message.error("Failed to ship the order.");
    }
  };

  const filteredOrders =
    statusFilter === "All"
      ? data?.data?.orders || []
      : data?.data?.orders.filter((order) => order.state === statusFilter);

  const currentData = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt) => new Date(createdAt).toLocaleString(),
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   render: (updatedAt) => new Date(updatedAt).toLocaleString(),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleShipOrder(record._id)}
          disabled={record.state === "shipped"}  
        >
          {record.state === "shipped" ? "Shipped" : "Mark as Shipped"}
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
        dataSource={currentData}
        pagination={false}
        className="rounded-lg"
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Pagination
          current={currentPage}
          total={filteredOrders.length}
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
                  Math.ceil(filteredOrders.length / pageSize)
                )
              )
            }
            className="w-12 text-center border rounded-md"
          />
          <span>of {Math.ceil(filteredOrders.length / pageSize)}</span>
        </div>
      </div>
    </div>
  );
};

export default Orders;