// import { useState } from "react";
// import { User, Calendar, ArrowLeft } from "lucide-react"; // Import icons from lucide-react
// import { Link } from "react-router-dom";
// import { Button } from "antd";
// import { useGetAllBlogsQuery } from "../../../redux/features/blogSlice";

// export default function Blogs() {
//   const blogs = [
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//     {
//       title: "Why It’s Smarter To Buy A Refurbished iPhone Rather ...",
//       description:
//         "Lorem ipsum text goes here. This is a short description for the blog.",
//       date: "19.Jun.2024",
//       author: "Admin",
//       image: "/tech.png", // Replace with your actual image path
//     },
//   ];

//   const {data}= useGetAllBlogsQuery()
//   console.log(data?.data?.blogs)

//   const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
//   const blogsPerPage = 12; // Number of blogs per page

//   // Calculate the paginated blogs
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   const totalPages = Math.ceil(blogs.length / blogsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between  items-center mb-5">
//       <div className="flex items-center gap-2">
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
//           <h2 className="text-3xl font-semibold">Buy Product </h2>
//         </div>
//         <Link to={'/addBlog'}>
//           <button className="bg-[#101010] px-6 py-3 rounded-lg text-white font-normal">
//             Add Blog
//           </button>
//         </Link>
//       </div>
//       <div className="grid gap-8 lg:grid-cols-4">
//         {currentBlogs.map((blog, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-lg shadow-md flex flex-col"
//           >
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="rounded-lg mb-4 object-cover"
//             />
//             <div className="flex items-center text-sm text-gray-600 gap-6 mb-4">
//               <span className="flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 {blog.author}
//               </span>
//               <span className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 {blog.date}
//               </span>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               {blog.title}
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
//             <a
//               href="#"
//               className="text-blue-600 font-semibold text-sm hover:underline"
//             >
//               Read More
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-3 mt-8">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//           (page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded-md ${
//                 currentPage === page
//                   ? "bg-black text-white"
//                   : "bg-gray-200 hover:bg-gray-300"
//               }`}
//             >
//               {page}
//             </button>
//           )
//         )}
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { User, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useGetAllBlogsQuery } from "../../../redux/features/blogSlice";

export default function Blogs() {
  const { data, isLoading, isError } = useGetAllBlogsQuery();
  const blogs = data?.data?.blogs || []; // Use API data if available

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load blogs</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button
              type="link"
              icon={<ArrowLeft />}
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Blog Posts</h2>
        </div>
        <Link to="/addBlog">
          <button className="bg-[#101010] px-6 py-3 rounded-lg text-white font-normal">
            Add Blog
          </button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            {/* <img
              src={
                blog.image.startsWith("/")
                  ? `https://your-api-url.com${blog.image}`
                  : blog.image
              }
              alt={blog.title}
              className="rounded-lg mb-4 object-cover"
            /> */}
            <img
              src={`${IMAGE}${blog?.image}`}
              // alt={product.product.name}
              alt={blog.title}
              className="rounded-lg mb-4 object-cover h-[200px]"
            />

            <div className="flex items-center justify-between text-sm text-gray-600 gap-6 mb-4">
              <span className="flex items-center  gap-2">
                <User className="w-4 h-4" />
                {"Admin"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
            <Link
              to={`/blogsDetails/${blog.slug}`}
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
