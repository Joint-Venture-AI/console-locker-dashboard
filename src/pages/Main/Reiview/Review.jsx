// import { ArrowLeft, EllipsisVertical, Star } from "lucide-react";
// import { Link, useParams } from "react-router-dom";
// import {
//   useDeleteReviewMutation,
//   useSingleReviewGetQuery,
//   useUpdateReviewMutation,
// } from "../../../redux/features/ReviewSlice";
// import { useState } from "react";

// export default function Review() {
//   const { name } = useParams();
//   const { data } = useSingleReviewGetQuery({ name });
//   const [updateReview] = useUpdateReviewMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [updatedData, setUpdatedData] = useState({
//     rating: 0,
//     comment: "",
//   });

//   const [deleteReview]=useDeleteReviewMutation()

//   const reviews = data?.data || [];
//   const IMAGE = import.meta.env.VITE_IMAGE_API;
//   console.log(reviews)

//   console.log(reviews?.product)

//   // Open modal and set selected review
//   const handleEditClick = (review) => {
//     setSelectedReview(review);
//     setUpdatedData({
//       rating: review.rating,
//       comment: review.comment,
//     });
//     setIsModalOpen(true);
//   };

//   // Handle input change for the form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? parseFloat(value) : value, // Convert rating to a float
//     }));
//   };

//   // Handle form submission
//   const handleUpdateReview = async (e) => {
//     e.preventDefault();
//     if (selectedReview) {
//       try {
//         await updateReview({
//           id: selectedReview._id, // Pass the review ID
//           review: updatedData, // Pass the updated review data
//         }).unwrap();
//         setIsModalOpen(false); // Close modal after successful update
//       } catch (error) {
//         console.error("Failed to update review:", error);
//       }
//     }
//   };

//   return (
//     <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <Link to={"/products"} className="flex items-center">
//           <button className="mr-2">
//             <ArrowLeft className="h-5 w-5" />
//           </button>
//           <h1 className="text-xl font-semibold">Reviews</h1>
//         </Link>
//         <Link to={`/addreview/${name}`}>
//           <button className="bg-black text-white px-4 py-2 rounded-md font-medium">
//             Add Review
//           </button>
//         </Link>
//       </div>

//       {/* Reviews Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reviews.map((review) => (
//           <div
//             key={review._id}
//             className="border border-gray-200 rounded-lg p-4 shadow-sm"
//           >
//             <div className="flex justify-between">
//               <p className="text-sm text-gray-700 mb-4 w-5/6">
//                 {review.comment}
//               </p>
//               <EllipsisVertical
//                 className="cursor-pointer "
//                 onClick={() => handleEditClick(review)}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
//                   <img
//                     src={
//                       `${IMAGE}/${review.customer.avatar}` || "/placeholder.svg"
//                     }
//                     alt={review.customer.name}
//                     width={40}
//                     height={40}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-medium text-sm">{review.customer.name}</p>
//                   <p className="text-xs text-gray-500">{review.product}</p>
//                 </div>
//               </div>
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < review.rating ? "text-yellow-400" : "text-gray-300"
//                     }`}
//                     fill={i < review.rating ? "currentColor" : "none"}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Update Review Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Update Review</h2>
//             <form onSubmit={handleUpdateReview}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Rating
//                 </label>
//                 <input
//                   type="number"
//                   name="rating"
//                   value={updatedData.rating}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   min="1"
//                   max="5"
//                   step="0.5" // Allow increments of 0.1
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Comment
//                 </label>
//                 <textarea
//                   name="comment"
//                   value={updatedData.comment}
//                   onChange={handleInputChange}
//                   className="mt-1 h-[150px] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { ArrowLeft, EllipsisVertical, Star } from "lucide-react";
// import { Link, useParams } from "react-router-dom";
// import {
//   useDeleteReviewMutation,
//   useSingleReviewGetQuery,
//   useUpdateReviewMutation,
// } from "../../../redux/features/ReviewSlice";
// import { useState } from "react";
// import Swal from "sweetalert2";

// export default function Review() {
//   const { name } = useParams();
//   const { data, refetch } = useSingleReviewGetQuery({ name });
//   const [updateReview] = useUpdateReviewMutation();
//   const [deleteReview] = useDeleteReviewMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [updatedData, setUpdatedData] = useState({
//     rating: 0,
//     comment: "",
//   });

//   const reviews = data?.data || [];
//   const IMAGE = import.meta.env.VITE_IMAGE_API;
//   console.log(reviews)

//   // Open modal and set selected review
//   const handleEditClick = (review) => {
//     setSelectedReview(review);
//     setUpdatedData({
//       rating: review.rating,
//       comment: review.comment,
//     });
//     setIsModalOpen(true);
//   };

//   // Handle input change for the form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? parseFloat(value) : value,
//     }));
//   };

//   // Handle form submission
//   const handleUpdateReview = async (e) => {
//     e.preventDefault();
//     if (selectedReview) {
//       try {
//         await updateReview({
//           id: selectedReview._id,
//           review: updatedData,
//         }).unwrap();
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error("Failed to update review:", error);
//       }
//     }
//   };

//   // Handle delete review
//   const handleDeleteReview = async (customer) => {
//     console.log(customer,'customer')
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await deleteReview(customer).unwrap();
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//         await refetch();
//       } catch (error) {
//         Swal.fire("Error!", "Failed to delete the review.", "error");
//       }
//     }
//   };

//   return (
//     <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <Link to={"/products"} className="flex items-center">
//           <button className="mr-2">
//             <ArrowLeft className="h-5 w-5" />
//           </button>
//           <h1 className="text-xl font-semibold">Reviews</h1>
//         </Link>
//         <Link to={`/addreview/${name}`}>
//           <button className="bg-black text-white px-4 py-2 rounded-md font-medium">
//             Add Review
//           </button>
//         </Link>
//       </div>

//       {/* Reviews Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reviews.map((review) => (
//           <div
//             key={review._id}
//             className="border border-gray-200 rounded-lg p-4 shadow-sm"
//           >
//             <div className="flex justify-between">
//               <p className="text-sm text-gray-700 mb-4 w-5/6">
//                 {review.comment}
//               </p>
//               <div className="relative">
//                 <EllipsisVertical
//                   className="cursor-pointer"
//                   onClick={() => setSelectedReview(review)}
//                 />
//                 {selectedReview?._id === review._id && (
//                   <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                     <div className="py-1">
//                       <button
//                         onClick={() => handleEditClick(review)}
//                         className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteReview(review._id)}
//                         className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
//                   <img
//                     src={
//                       `${IMAGE}/${review.customer.avatar}` || "/placeholder.svg"
//                     }
//                     alt={review.customer.name}
//                     width={40}
//                     height={40}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-medium text-sm">{review.customer.name}</p>
//                   <p className="text-xs text-gray-500">{review.product}</p>
//                 </div>
//               </div>
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < review.rating ? "text-yellow-400" : "text-gray-300"
//                     }`}
//                     fill={i < review.rating ? "currentColor" : "none"}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Update Review Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Update Review</h2>
//             <form onSubmit={handleUpdateReview}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Rating
//                 </label>
//                 <input
//                   type="number"
//                   name="rating"
//                   value={updatedData.rating}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   min="1"
//                   max="5"
//                   step="0.5"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Comment
//                 </label>
//                 <textarea
//                   name="comment"
//                   value={updatedData.comment}
//                   onChange={handleInputChange}
//                   className="mt-1 h-[150px] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { ArrowLeft, EllipsisVertical, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useSingleReviewGetQuery,
  useUpdateReviewMutation,
} from "../../../redux/features/ReviewSlice";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

export default function Review() {
  const { name } = useParams();
  const { data, refetch } = useSingleReviewGetQuery({ name });
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    rating: 0,
    comment: "",
  });
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null); // Ref to track the dropdown container

  const reviews = data?.data?.reviews || [];
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Open modal and set selected review
  const handleEditClick = (review) => {
    setSelectedReview(review);
    setUpdatedData({
      rating: review.rating,
      comment: review.comment,
    });
    setIsModalOpen(true);
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  // Handle form submission
  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (selectedReview) {
      try {
        await updateReview({
          id: selectedReview._id,
          review: updatedData,
        }).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to update review:", error);
      }
    }
  };

  // Handle delete review
  const handleDeleteReview = async (customer) => {
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
      try {
        await deleteReview(customer).unwrap();
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        await refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the review.", "error");
      }
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (reviewId) => {
    setOpenDropdownId((prevId) => (prevId === reviewId ? null : reviewId));
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link to={"/products"} className="flex items-center">
          <button className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">Reviews</h1>
        </Link>
        <Link to={`/addreview/${name}`}>
          <button className="bg-black text-white px-4 py-2 rounded-md font-medium">
            Add Review
          </button>
        </Link>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <p className="text-sm text-gray-700 mb-4 w-full">
                {review.comment}
              </p>
              {/* <div className="relative" ref={dropdownRef}>
                <EllipsisVertical
                  className="cursor-pointer"
                  onClick={() => toggleDropdown(review._id)}
                />
                {openDropdownId === review._id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => handleEditClick(review)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={
                      `${IMAGE}/${review.customer.avatar}` || "/placeholder.svg"
                    }
                    alt={review.customer.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{review.customer.name}</p>
                  <p className="text-xs text-gray-500">{review.product}</p>
                </div>
              </div>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-8 mt-4">
              <button
                onClick={() => handleEditClick(review)}
                className="block w-full px-4 py-2 text-sm text-black bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="block w-full px-4 py-2 text-sm text-red-600  bg-red"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Review</h2>
            <form onSubmit={handleUpdateReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={updatedData.rating}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  min="1"
                  max="5"
                  step="0.5"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={updatedData.comment}
                  onChange={handleInputChange}
                  className="mt-1 h-[150px] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
