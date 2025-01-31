/* eslint-disable no-unused-vars */
// import { ArrowLeft } from "lucide-react";
// import { useState } from "react";
// import DashboardModal from "../../../Components/DashboardModal";

// const BuyProducts = () => {
//   const [view, setView] = useState("grid");
//   const [page, setPage] = useState(1);
//   const [filter, setFilter] = useState("All"); // Tracks the current filter
//   const itemsPerPage = 12;

//   const products = [
//     {
//       title: "PlayStation 5",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "PlayStation",
//       status: "Pending",
//       id: 1,
//     },
//     {
//       title: "PlayStation 5",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "PlayStation",
//       status: "Pending",
//       id: 2,
//     },
//     {
//       title: "PlayStation 5",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "PlayStation",
//       status: "Pending",
//       id: 3,
//     },
//     {
//       title: "PlayStation 5",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "PlayStation",
//       status: "Pending",
//       id: 4,
//     },
//     {
//       title: "Zeust Xbox One S",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Delivered",
//       id: 5,
//     },
//     {
//       title: "Zeust Xbox One S",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Delivered",
//       id: 6,
//     },
//     {
//       title: "Zeust Xbox One S",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Delivered",
//       id: 7,
//     },
//     {
//       title: "Zeust Xbox One S",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Delivered",
//       id: 8,
//     },
//     {
//       title: "Zeust Xbox One S",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Delivered",
//       id: 9,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Cancel",
//       id: 10,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Cancel",
//       id: 11,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Cancel",
//       id: 12,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Cancel",
//       id: 13,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Cancel",
//       id: 14,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Cancel",
//       id: 15,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Pending",
//       id: 16,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Pending",
//       id: 17,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Pending",
//       id: 18,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Pending",
//       id: 19,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       status: "Pending",
//       id: 20,
//     },
//   ];

//   // Filter products based on the selected filter
//   const filteredProducts =
//     filter === "All"
//       ? products
//       : products.filter((product) => product.status === filter);

//   // Paginate the filtered products
//   const paginatedProducts = filteredProducts.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//    const [isModalOpen, setIsModalOpen] = useState(false);
//       const [modalData, setModalData] = useState({});

//       const showModal = (data) => {
//         setIsModalOpen(true);
//         setModalData(data);
//       };

//   return (
//     <div>
//       <div className="px-8">
//         <div className="flex gap-2 px-7 items-center mb-4 w-full mx-auto">
//           <ArrowLeft />
//           <h2 className="text-4xl font-semibold">Buy Product</h2>
//         </div>

//         <div className="flex gap-2 px-4 pt-8 items-center mb-4 w-full mx-auto">
//           <button
//             className={`${
//               filter === "All" ? "bg-[#101010] text-white" : "bg-gray-50"
//             } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
//             onClick={() => setFilter("All")}
//           >
//             All
//           </button>
//           <button
//             className={`${
//               filter === "Pending" ? "bg-[#101010] text-white" : "bg-gray-50"
//             } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
//             onClick={() => setFilter("Pending")}
//           >
//             Pending
//           </button>
//           <button
//             className={`${
//               filter === "Delivered" ? "bg-[#101010] text-white" : "bg-gray-50"
//             } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
//             onClick={() => setFilter("Delivered")}
//           >
//             Delivered
//           </button>
//           <button
//             className={`${
//               filter === "Cancel" ? "bg-[#101010] text-white" : "bg-gray-50"
//             } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
//             onClick={() => setFilter("Cancel")}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col lg:flex-row w-full mx-auto px-4 py-8">
//         <div className="w-full lg:ml-6">
//           <div
//             className={`grid ${
//               view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""
//             } gap-6`}
//           >
//             {paginatedProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="shadow-xl rounded-lg pb-2 relative"
//               >
//                 <img src={product.image} alt={product.title} />
//                 <div className="px-3">
//                   <div className="flex justify-between items-center mt-4 mb-2">
//                     <h3 className="text-lg font-semibold">{product.title}</h3>
//                     <span className="text-green-500 font-semibold">
//                       {product.price}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <img src="/user.png" alt="" />
//                       <div>
//                         <h1>Seller Name</h1>
//                         <p className="text-sm">9 Jun 2024</p>
//                       </div>
//                     </div>
//                     <button className="text-indigo-700 px-5 py-3 bg-blue-100 rounded-lg">
//                       {product.status}
//                     </button>
//                   </div>

//                   <button className="bg-[#101010] w-full py-4 rounded-lg text-white font-normal mt-6">
//                     Product Details
//                   </button>
//                   <DashboardModal
//                     isModalOpen={isModalOpen}
//                     setIsModalOpen={setIsModalOpen}
//                     maxWidth="500px"
//                   >
//                     <div>
//                       <h2 className="text-lg text-center mb-4">User Details</h2>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>#SL</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>User Name</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>Email</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>Mobile Phone</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>Service</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>Date</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>Time</p>
//                         <p>hi</p>
//                       </div>
//                       <div className="flex justify-between mb-2 text-gray-600">
//                         <p>Amount</p>
//                         <p>hi</p>
//                       </div>
//                     </div>
//                   </DashboardModal>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-3 mt-6">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               className="px-4 py-2 bg-gray-200 rounded-md mr-2"
//             >
//               Previous
//             </button>
//             {Array.from(
//               { length: Math.ceil(filteredProducts.length / itemsPerPage) },
//               (_, index) => index + 1
//             ).map((pageNumber) => (
//               <button
//                 key={pageNumber}
//                 onClick={() => setPage(pageNumber)}
//                 className={`px-4 py-2 rounded-md ${
//                   page === pageNumber ? "bg-black text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {pageNumber}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setPage((prev) =>
//                   Math.min(
//                     prev + 1,
//                     Math.ceil(filteredProducts.length / itemsPerPage)
//                   )
//                 )
//               }
//               className="px-4 py-2 bg-gray-200 rounded-md ml-2"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyProducts;

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import DashboardModal from "../../../Components/DashboardModal";
import { Link } from "react-router-dom";
import { Button } from "antd";

const BuyProducts = () => {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All"); // Tracks the current filter
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // Holds the data for the selected product

  const itemsPerPage = 12;

  const products = [
    {
      title: "PlayStation 5",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "PlayStation",
      status: "Pending",
      id: 1,
    },
    {
      title: "PlayStation 5",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "PlayStation",
      status: "Pending",
      id: 2,
    },
    {
      title: "PlayStation 5",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "PlayStation",
      status: "Pending",
      id: 3,
    },
    {
      title: "PlayStation 5",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "PlayStation",
      status: "Pending",
      id: 4,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Delivered",
      id: 5,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Delivered",
      id: 6,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Delivered",
      id: 7,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Delivered",
      id: 8,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Delivered",
      id: 9,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Cancel",
      id: 10,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Cancel",
      id: 11,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Cancel",
      id: 12,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Cancel",
      id: 13,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Cancel",
      id: 14,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Cancel",
      id: 15,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Pending",
      id: 16,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Pending",
      id: 17,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Pending",
      id: 18,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Pending",
      id: 19,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      status: "Pending",
      id: 20,
    },
  ];

  // Filter products based on the selected filter
  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.status === filter);

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Function to open the modal and set product details
  const showModal = (product) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const handleDelivered = () => {
    alert("Product Delivereded!");
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="px-8">
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
          <h2 className="text-3xl font-semibold">Buy Product</h2>
        </div>

        <div className="flex gap-2 px-4 pt-8 items-center mb-4 w-full mx-auto">
          <button
            className={`${
              filter === "All" ? "bg-[#101010] text-white" : "bg-gray-50"
            } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`${
              filter === "Pending" ? "bg-[#101010] text-white" : "bg-gray-50"
            } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={`${
              filter === "Delivered" ? "bg-[#101010] text-white" : "bg-gray-50"
            } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
            onClick={() => setFilter("Delivered")}
          >
            Delivered
          </button>
          <button
            className={`${
              filter === "Cancel" ? "bg-[#101010] text-white" : "bg-gray-50"
            } hover:bg-black hover:text-white px-4 py-2 rounded-full`}
            onClick={() => setFilter("Cancel")}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full mx-auto px-4 py-8">
        <div className="w-full lg:ml-6">
          <div
            className={`grid ${
              view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""
            } gap-6`}
          >
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="shadow-md rounded-lg pb-2 relative"
              >
                <img src={product.image} alt={product.title} />
                <div className="px-3">
                  <div className="flex justify-between items-center mt-4 mb-2">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <span className="text-green-500 font-semibold">
                      {product.price}
                    </span>
                  </div>

                  <hr className="mb-3 pt-2" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src="/user.png" alt="" />
                      <div>
                        <h1>Seller Name</h1>
                        <p className="text-sm">9 Jun 2024</p>
                      </div>
                    </div>
                    <button className="text-[#222C9B] px-5 py-2 bg-blue-100 text-sm rounded-3xl">
                      {product.status}
                    </button>
                  </div>

                  <button
                    onClick={() => showModal(product)}
                    className="bg-[#101010] w-full py-4 rounded-lg text-white font-normal mt-6"
                  >
                    Product Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded-md mr-2"
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-2 rounded-md ${
                  page === pageNumber ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredProducts.length / itemsPerPage)
                  )
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-md ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <DashboardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          maxWidth="500px"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Product Details
            </h2>

            {/* Product Header */}
            <div className="flex justify-between items-center bg-blue-50 rounded-md p-4 mb-8 shadow-sm">
              <div>
                <h3 className="text-xl font-medium">{modalData.title}</h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <img
                    src="/user.png"
                    alt="Seller"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-medium">Seller Name</span>
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-800">
                  {modalData.price}
                </h3>
                <p className="text-sm text-gray-500 mt-1">9 Jun 2024</p>
              </div>
            </div>

            {/* Product Information */}
            <h3 className="text-lg font-semibold mb-4">Product Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-gray-700 mb-8">
              <p className="font-medium">Model</p>
              <p>{modalData.model || "N/A"}</p>
              <p className="font-medium">Storage</p>
              <p>{modalData.storage || "N/A"}</p>
              <p className="font-medium">Condition</p>
              <p>{modalData.condition || "N/A"}</p>
              <p className="font-medium">Controller</p>
              <p>{modalData.controller || "0"}</p>
            </div>

            {/* Seller Information */}
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-gray-700 mb-8">
              <p className="font-medium">Account Number</p>
              <p className="text-sm">0000 0000 0000 0000</p>
              <p className="font-medium">Phone</p>
              <p className="text-sm">000 0000 0000 0000</p>
              <p className="font-medium">Email</p>
              <p className="text-sm">debra.holt@example.com</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full border-red text-red py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelivered}
                className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all"
              >
                Delivered
              </button>
            </div>
          </div>
        </DashboardModal>
      )}
    </div>
  );
};

export default BuyProducts;
