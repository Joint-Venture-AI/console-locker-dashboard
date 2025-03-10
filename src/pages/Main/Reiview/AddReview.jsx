import { Upload } from "antd";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useCreateReviewMutation } from "../../../redux/features/ReviewSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddReview() {
  const { name } = useParams();
  const [createReview] = useCreateReviewMutation();
  console.log(name, "add review page");
  const [formData, setFormData] = useState({
    name: "",
    customerName: "",
    rating: "",
    review: "",
  });

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data for submission
    const reviewData = {
      customerName: formData.customerName,
      rating: formData.rating.toString(), // Ensure rating is a string
      comment: formData.review,
      product: name, // Assuming this is a fixed value or fetched from somewhere
    };

    // Create FormData object for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("customerName", reviewData.customerName);
    formDataToSend.append("rating", reviewData.rating);
    formDataToSend.append("comment", reviewData.comment);
    formDataToSend.append("product", reviewData.product);

    // Append the image file if it exists
    if (fileInputRef.current?.files?.[0]) {
      formDataToSend.append("images", fileInputRef.current.files[0]);
    }

    try {
      // Use the mutation hook to post the data
      const response = await createReview(formDataToSend).unwrap();

      navigate('/products');
      // Handle the response
      console.log("Review created successfully:", response);

      // Reset the form
      setFormData({
        name: "",
        customerName: "",
        rating: "",
        review: "",
      });
      setImagePreview(null);
      fileInputRef.current.value = ""; // Clear the file input
    } catch (error) {
      // Handle any errors
      console.error("Failed to create review:", error)
      toast.error("Failed to create review. Please try again later. ratting should be a number between 1 and 5.");
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Header */}
      <Link to={'/products'} className="flex items-center mb-8">
        <button className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-medium">Reviews</h1>
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="flex items-start mb-8">
          {/* Image Upload */}
          <div className="mr-6 border-2 border-black rounded-full">
            <div
              onClick={triggerFileInput}
              className="w-24 h-24 rounded-full bg-gray-100 flex flex-col items-center justify-center cursor-pointer"
            >
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <>
                  <Upload className="h-6 w-6 text-gray-500 mb-1" />
                  <span className="text-xs text-gray-500">Upload Image</span>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <div className="flex-1">
            <label className="block text-gray-500 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="enter a name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="enter a ratting"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reviews</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="enter a description"
              rows={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Save Blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
