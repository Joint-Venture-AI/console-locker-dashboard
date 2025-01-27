import { useState } from "react";
import { ArrowLeft, ArrowLeftToLine, Info } from "lucide-react";

export default function ProductPage() {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null); // Tracks the open menu for each product
  const itemsPerPage = 12;

  const products = [
    {
      title: "PlayStation 5",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "PlayStation",
      id: 1,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 2,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 3,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 4,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 5,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 6,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 7,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 8,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 9,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/projects.png",
      brand: "Xbox",
      id: 10,
    },
    // Add more products as needed
  ];

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <div className="flex justify-between px-7 items-center mb-4 container mx-auto">
        <div className="flex items-center gap-4">
          <ArrowLeft />
          <h2 className="text-4xl font-semibold">Products</h2>
        </div>

        <div className="flex gap-2 items-center cursor-pointer">
          <button className="bg-black px-6 py-4 rounded-lg text-xl font-normal text-white">
            Products
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
        <div className="w-full lg:ml-6">
          <div
            className={`grid ${
              view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""
            } gap-6`}
          >
            {paginatedProducts.map((product, index) => (
              <div key={index} className="shadow-xl rounded-lg pb-2 relative">
                <img src={product.image} alt={product.title} />
                <div className="px-3">
                  <h3 className="text-lg font-semibold mb-2 mt-5">
                    {product.title}
                  </h3>
                  <div className="text-gray-600 mb-2 flex items-center justify-between">
                    <div>
                      Condition:{" "}
                      <span className="font-semibold">{product.condition}</span>
                    </div>
                    {/* Info Icon */}
                    <div
                      className="relative"
                      onClick={() =>
                        setOpenMenu((prev) =>
                          prev === product.id ? null : product.id
                        )
                      }
                    >
                      <Info className="cursor-pointer" />
                      {openMenu === product.id && (
                        <div className="absolute right-0 top-6 bg-white shadow-lg rounded-md py-2 w-32 z-10">
                          <button
                            onClick={() => alert("Edit clicked")}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => alert("Delete clicked")}
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
                      <p> Price:</p>
                      <span className="text-green-500 font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <span className="line-through">New: 350</span>
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
            {[1, 2, 3].map((pageNumber) => (
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
                  Math.min(prev + 1, Math.ceil(products.length / itemsPerPage))
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-md ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
