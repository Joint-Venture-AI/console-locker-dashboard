import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	useDeleteReviewMutation,
	useSingleReviewGetQuery,
	useUpdateReviewMutation,
} from "../../../redux/features/ReviewSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
import toast from "react-hot-toast";
import { Button } from "antd";

export default function Review() {
	const { name } = useParams();
	const navigate = useNavigate();
	const { data, refetch } = useSingleReviewGetQuery({ name });
	const [updateReview] = useUpdateReviewMutation();
	const [deleteReview] = useDeleteReviewMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedReview, setSelectedReview] = useState(null);
	const [updatedData, setUpdatedData] = useState({
		rating: 0,
		comment: "",
	});

	const reviews = data?.data?.reviews || [];
	const IMAGE = import.meta.env.VITE_IMAGE_API;

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
		const toastId = toast.loading("Updating review...");
		if (selectedReview) {
			try {
				await updateReview({
					id: selectedReview._id,
					review: updatedData,
				}).unwrap();
				setIsModalOpen(false);
			} catch (error) {
				toast.error("Failed to update review.", {
					id: toastId,
				});
			} finally {
				toast.success("Review updated successfully", {
					id: toastId,
				});
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

	return (
		<div className="w-full mx-auto pb-8">
			{/* Header */}
			<div className="sticky top-0 z-10 p-4 bg-white mb-4">
				<div className="flex items-center gap-2">
					<Button
						type="link"
						icon={<ArrowLeft />}
						onClick={() => navigate(-1)}
						className="text-black text-lg"
					/>
					<div className="flex flex-col">
						<h3 className="text-lg font-bold">{name}</h3>
						<p>Reviews</p>
					</div>
				</div>
				{!reviews?.length || (
					<Link
						to={`/addreview/${name}`}
						className="absolute top-1/2 -translate-y-1/2 right-4"
					>
						<button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium click">
							Add Review
						</button>
					</Link>
				)}
			</div>

			{!reviews?.length && (
				<div className="flex items-center justify-center h-[50vh]">
					<div className="flex flex-col items-center gap-6">
						<h1 className="text-center text-4xl font-semibold relative">
							No reviews yet.{" "}
							<img
								src="/397056891_11541951.png"
								alt="arrow"
								className="w-[90px] absolute top-5 -right-12 rotate-45 select-none"
							/>
						</h1>
						<Link to={`/addreview/${name}`} className="relative">
							<button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium click">
								Add Review
							</button>
							<div className="absolute -top-1 -right-1">
								<span className="relative flex size-3">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-700 opacity-75"></span>
									<span className="relative inline-flex size-3 rounded-full bg-sky-600"></span>
								</span>
							</div>
						</Link>
					</div>
				</div>
			)}

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

							<Rating value={review.rating} readOnly className="w-24" />
						</div>
						<div className="flex gap-2 mt-4">
							<button
								onClick={() => handleEditClick(review)}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium click"
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteReview(review._id)}
								className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md font-medium click"
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
								<Rating
									value={updatedData.rating}
									onChange={(value) =>
										setUpdatedData({ ...updatedData, rating: value })
									}
									className="w-32"
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
									className="mr-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md click"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md click"
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
