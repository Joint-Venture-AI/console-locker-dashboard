// import { useState } from "react";
// import { ArrowLeft, Info } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "antd";
// import Swal from "sweetalert2";
// import { useAllProductGetQuery } from "../../../redux/features/productsSlice";

// export default function ProductPage() {
//   const {data} = useAllProductGetQuery()
//   console.log(data?.data?.products)
//   const [view] = useState("grid");
//   const [page, setPage] = useState(1);
//   const [openMenu, setOpenMenu] = useState(null); // Tracks the open menu for each product
//   const itemsPerPage = 12;

//   const products = [
//     {
//       title: "PlayStation 5",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "PlayStation",
//       id: 1,
//     },
//     {
//       title: "Zeust Xbox One S",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 2,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 3,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 4,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 5,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 6,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 7,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 8,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 9,
//     },
//     {
//       title: "Xbox",
//       condition: "Good",
//       price: "$299",
//       image: "/projects.png",
//       brand: "Xbox",
//       id: 10,
//     },
//     // Add more products as needed
//   ];

//   const paginatedProducts = products.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <div>
//       <div className="flex justify-between px-7 items-center mb-4 container mx-auto">

//         <div className="flex items-center gap-2">
//           <Link to={'/'}>
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
//           <h2 className="text-3xl font-semibold">Products</h2>
//         </div>

//         <Link to={'/addProducts'} className="flex gap-2 items-center cursor-pointer">
//           <button className="bg-black px-6 py-3 rounded-lg  font-normal text-white">
//           Add  Products
//           </button>
//         </Link>
//       </div>
//       <div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
//         <div className="w-full lg:ml-6">
//           <div
//             className={`grid ${
//               view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""
//             } gap-6`}
//           >
//             {paginatedProducts.map((product, index) => (
//               <div key={index} className="shadow-xl rounded-lg pb-2 relative">
//                 <img src={product.image} alt={product.title} />
//                 <div className="px-3">
//                   <h3 className="text-lg font-semibold mb-2 mt-5">
//                     {product.title}
//                   </h3>
//                   <div className="text-gray-600 mb-2 flex items-center justify-between">
//                     <div>
//                       Condition:{" "}
//                       <span className="font-semibold">{product.condition}</span>
//                     </div>
//                     {/* Info Icon */}
//                     <div
//                       className="relative"
//                       onClick={() =>
//                         setOpenMenu((prev) =>
//                           prev === product.id ? null : product.id
//                         )
//                       }
//                     >
//                       <Info className="cursor-pointer" />
//                       {openMenu === product.id && (
//                         <div className="absolute right-0 top-6 bg-white shadow-lg rounded-md py-2 w-32 z-10">
//                           <Link to={'/addProducts'}>
//                           <button
//                             onClick={() => alert("Edit clicked")}
//                             className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//                           >
//                             Edit
//                           </button>
//                           </Link>

//                           <button
//                             onClick={() => Swal.fire({
//                               title: "Are you sure?",
//                               text: "You won't be able to revert this!",
//                               icon: "warning",
//                               showCancelButton: true,
//                               confirmButtonColor: "#3085d6",
//                               cancelButtonColor: "#d33",
//                               confirmButtonText: "Yes, delete it!"
//                             }).then((result) => {
//                               if (result.isConfirmed) {
//                                 Swal.fire({
//                                   title: "Deleted!",
//                                   text: "Your file has been deleted.",
//                                   icon: "success"
//                                 });
//                               }
//                             })}
//                             className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
//                           >
//                             Delete
//                           </button>

//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
//                     <div className="flex items-center gap-2">
//                       <p> Price:</p>
//                       <span className="text-green-500 font-semibold">
//                         {product.price}
//                       </span>
//                     </div>
//                     <span className="line-through">New: 350</span>
//                   </div>
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
//             {[1, 2, 3].map((pageNumber) => (
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
//                   Math.min(prev + 1, Math.ceil(products.length / itemsPerPage))
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
// }

import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Swal from "sweetalert2";
import {
  useAllProductGetQuery,
  useDeleteProductMutation,
} from "../../../redux/features/productsSlice";

export default function ProductPage() {
  const { data, isLoading, isError, refetch } = useAllProductGetQuery({
    limit: 1000,
  });
  console.log(data?.data.products);
  const [deleteProduct] = useDeleteProductMutation();
  const [view] = useState("grid");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const itemsPerPage = 12;

  // Extract products from API response safely
  const products = data?.data?.products || [];
  console.log(products);

  const IMAGE = import.meta.env.VITE_IMAGE_API;
  console.log(IMAGE, "image api");

  // Pagination Logic
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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

  return (
    <div>
      <div className="flex justify-between px-7 items-center mb-4 container mx-auto">
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
          <h2 className="text-3xl font-semibold">Products</h2>
        </div>

        <Link
          to={"/addProducts"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <button className="bg-black px-6 py-3 rounded-lg font-normal text-white">
            Add Products
          </button>
        </Link>
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
              {paginatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="shadow rounded-lg pb-2 relative"
                >
                  <img
                    src={
                      product.images.length > 0
                        ? `${IMAGE}${product.images[0]}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
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
                          <div className="absolute right-0 top-6 bg-white shadow-lg rounded-md py-2 w-32 z-10">
                            <Link to={`/addEditProducts/${product?.slug}`}>
                              <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Edit
                              </button>
                            </Link>
                            <Link to={`/review/${product?.name}`}>
                              <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Review
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
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
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-200 rounded-md mr-2"
              >
                Previous
              </button>
              {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
                (pageNumber) => (
                  <button
                    key={pageNumber + 1}
                    onClick={() => setPage(pageNumber + 1)}
                    className={`px-4 py-2 rounded-md ${
                      page === pageNumber + 1
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pageNumber + 1}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(products.length / itemsPerPage)
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
      )}
    </div>
  );
}
