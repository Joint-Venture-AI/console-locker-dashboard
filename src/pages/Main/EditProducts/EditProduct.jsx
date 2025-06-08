import { useState, useEffect } from "react";
import { Upload, Input, Button, Form, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
	useProductQuestionEditMutation,
	useSellProductSingleQuery,
} from "../../../redux/features/productQuestionSlice";
import toast from "react-hot-toast";

export default function EditProduct() {
	const { id } = useParams();
	const [fileList, setFileList] = useState([]);
	const [form] = Form.useForm();
	const [productQuestionEdit] = useProductQuestionEditMutation();
	const { data } = useSellProductSingleQuery(id);
	const product = data?.data;
	const navigate = useNavigate();
	const [questions, setQuestions] = useState([]);

	const IMAGE = import.meta.env.VITE_IMAGE_API;

	useEffect(() => {
		if (product) {
			// Set initial form values
			form.setFieldsValue({
				name: product.name || "",
				base_price: product.base_price || 0,
				product_type: product.product_type || "",
			});

			// Initialize questions if available
			setQuestions(product.questions || []);

			// Handle existing image
			if (product.image) {
				setFileList([
					{
						url: `${IMAGE}${product.image}`,
						uid: "-1",
						name: "existing-image",
					},
				]);
			}
		}
	}, [product, form, IMAGE]);

	const handleUpload = ({ fileList }) => {
		// Ensure only one image is uploaded
		setFileList(fileList.slice(-1)); // Keep only the last uploaded file
	};

	const onFinish = async (values) => {
		const toastId = toast.loading("Updating product...");
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("base_price", values.base_price);
		formData.append("product_type", values.product_type);

		// Build the questions array dynamically
		const questionsArray = questions.map((question, qIndex) => ({
			name: values[`questionName${qIndex}`],
			description: values[`questionDescription${qIndex}`],
			options: question.options.map((_, oIndex) => ({
				option: values[`option${qIndex}_${oIndex}`],
				price: parseFloat(values[`price${qIndex}_${oIndex}`]),
				description: values[`description${qIndex}_${oIndex}`],
			})),
		}));

		formData.append("questions", JSON.stringify(questionsArray));

		// Append the new image if uploaded
		if (fileList.length > 0 && fileList[0].originFileObj) {
			formData.append("images", fileList[0].originFileObj);
		}

		try {
			const response = await productQuestionEdit({ id, formData }).unwrap();
			navigate("/productQuestion");
			console.log(response);
			form.resetFields();
			setFileList([]);
			toast.success("Product updated successfully", { id: toastId });
		} catch (error) {
			toast.error("Failed to update product", { id: toastId });
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg">
			<div className="flex justify-between items-center mb-4 container mx-auto">
				<div className="flex items-center gap-2">
					<Link to={"/productQuestion"}>
						<Button
							type="link"
							icon={<ArrowLeft />}
							className="text-black text-lg"
						/>
					</Link>
					<h2 className="text-3xl font-semibold">Edit Product Question</h2>
				</div>
			</div>

			<Form
				form={form}
				layout="vertical"
				onFinish={onFinish}
				initialValues={product}
			>
				<div className="flex gap-4">
					<Upload
						listType="picture-card"
						fileList={fileList}
						onChange={handleUpload}
						beforeUpload={() => false} // Prevent automatic upload
						maxCount={1} // Allow only one image
					>
						{fileList.length === 0 && (
							<div className="text-center">
								<UploadOutlined className="text-2xl mb-2" />
								<Typography.Text>Upload Image</Typography.Text>
							</div>
						)}
					</Upload>

					<div className="flex-1 space-y-4">
						<Form.Item
							label="Product Name"
							name="name"
							rules={[
								{ required: true, message: "Please enter a product name" },
							]}
						>
							<Input className="py-3" placeholder="Enter a name" />
						</Form.Item>

						<Form.Item
							label="Estimate Price"
							name="base_price"
							rules={[
								{ required: true, message: "Please enter an estimate price" },
							]}
						>
							<Input className="py-3" placeholder="Enter an estimate price" />
						</Form.Item>
						<Form.Item
							label="Product Types"
							name="product_type"
							rules={[
								{ required: true, message: "Please enter an product types" },
							]}
						>
							<Input className="py-3" placeholder="Enter your product types" />
						</Form.Item>

						{questions.map((question, qIndex) => (
							<div key={qIndex} className="space-y-4">
								<h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
								<div className="grid grid-cols-2 gap-4">
									<Form.Item
										label="Question Name"
										name={`questionName${qIndex}`}
										initialValue={question.name}
										rules={[
											{
												required: true,
												message: "Please enter a question name",
											},
										]}
									>
										<Input placeholder="Enter question name" />
									</Form.Item>
									<Form.Item
										label="Question Description"
										name={`questionDescription${qIndex}`}
										initialValue={question.description}
										rules={[
											{
												required: true,
												message: "Please enter a question description",
											},
										]}
									>
										<Input placeholder="Enter question description" />
									</Form.Item>
								</div>

								<h4 className="text-md font-semibold">Options</h4>
								{question.options.map((option, oIndex) => (
									<div key={oIndex} className="grid grid-cols-3 gap-4">
										<Form.Item
											label={`Option ${oIndex + 1}`}
											name={`option${qIndex}_${oIndex}`}
											initialValue={option.option}
											rules={[
												{ required: true, message: "Please enter an option" },
											]}
										>
											<Input placeholder="Enter option" />
										</Form.Item>
										<Form.Item
											label={`Price ${oIndex + 1}`}
											name={`price${qIndex}_${oIndex}`}
											initialValue={option.price}
											rules={[
												{ required: true, message: "Please enter a price" },
											]}
										>
											<Input type="number" placeholder="Enter price" />
										</Form.Item>
										<Form.Item
											label={`Description ${oIndex + 1}`}
											name={`description${qIndex}_${oIndex}`}
											initialValue={option.description}
											rules={[
												{
													required: true,
													message: "Please enter a description",
												},
											]}
										>
											<Input placeholder="Enter description" />
										</Form.Item>
									</div>
								))}
							</div>
						))}

						<div className="flex justify-end gap-2">
							<Button
								type="primary"
								htmlType="submit"
								className="bg-[#101010] px-10 py-5"
							>
								Update Product
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
