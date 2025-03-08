// import { useEffect, useState } from "react";
// import { Button, Card, Input, Select, Divider } from "antd";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useUpdateProductMutation } from "../../../redux/features/productsSlice";
// import { useSellProductSingleQuery } from "../../../redux/features/productQuestionSlice";

// export default function EditProduct() {
//   const { id } = useParams();

// const [updateProduct] = useUpdateProductMutation();

// const { data } = useSellProductSingleQuery(id);
// console.log(data?.data?.name);
// const product = data?.data;

//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     if (data?.data?.questions) {
//       const mappedQuestions = data.data.questions.map((question, index) => ({
//         id: index + 1,
//         title: question.description,
//         variants: question.options.map((option, idx) => ({
//           id: idx + 1,
//           price: `$${option.price}`,
//           condition: option.option,
//         })),
//         showForm: false,
//       }));
//       setQuestions(mappedQuestions);
//     }
//   }, [data]);

//   const [newVariant, setNewVariant] = useState({ condition: "", price: "" });

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen rounded-lg">
//       <div className="flex justify-between  items-center mb-4 container mx-auto">
//         <div className="flex items-center gap-2">
//           <Link to={"/productQuestion"}>
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
//           <h2 className="text-3xl font-semibold">
//             Estimete your Product Price
//           </h2>
//         </div>

//         <Link
//           to={"/productForm"}
//           className="flex gap-2 items-center cursor-pointer"
//         >
//           <button className="bg-[#101010] px-6 py-3 rounded-lg  font-normal text-white">
//             Add New Product
//           </button>
//         </Link>
//       </div>

//       {questions.map((question) => (
//         <Card key={question.id} className="mb-6 shadow-md bg-white rounded-lg">
//           <h3 className="text-xl font-semibold pb-3 border-b border-gray-300">
//             {String(question.id).padStart(2, "0")}. {question.title}
//           </h3>

//           <div className="space-y-3 py-4">
//             {question.variants.map((variant) => (
//               <div
//                 key={variant.id}
//                 className="flex justify-between items-center p-3 border rounded-lg bg-gray-100"
//               >
//                 <p>
//                   <span className="font-medium">Price:</span> {variant.price}
//                 </p>
//                 <p>
//                   <span className="font-medium">Condition:</span>{" "}
//                   {variant.condition}
//                 </p>

//               </div>
//             ))}
//           </div>

//           {question.showForm && (
//             <div className="p-4 bg-gray-100 rounded-md shadow-sm mt-4">
//               <h4 className="text-lg font-semibold pb-2">Add New Variant</h4>
//               <Divider className="my-2" />
//               <div className="grid grid-cols-2 gap-4">
//                 <Select
//                   placeholder="Select Condition"
//                   className="w-full py-2"
//                   onChange={(value) =>
//                     setNewVariant({ ...newVariant, condition: value })
//                   }
//                 >
//                   <Select.Option value="Very Good">Very Good</Select.Option>
//                   <Select.Option value="Good">Good</Select.Option>
//                   <Select.Option value="Bad">Bad</Select.Option>
//                 </Select>

//                 <Input
//                   placeholder="Enter Price"
//                   className="py-2"
//                   onChange={(e) =>
//                     setNewVariant({ ...newVariant, price: e.target.value })
//                   }
//                 />
//               </div>

//             </div>
//           )}
//         </Card>
//       ))}

//       <div className="flex justify-end mt-6">
//         <button className="bg-[#101010] text-white rounded-lg text-xs px-6 py-3">
//           Update Product
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Upload, Input, Button, Form, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import {  useSellProductSingleQuery } from "../../../redux/features/productQuestionSlice";
// import { useUpdateProductMutation } from "../../../redux/features/productsSlice";

// export default function EditProduct() {
//   const { id } = useParams();
//   const [fileList, setFileList] = useState([]);
//   const [form] = Form.useForm();
//   // const [productQuestionPost, refetch] = useProductQuestionPostMutation();

//   const [updateProduct] = useUpdateProductMutation();

//   const { data } = useSellProductSingleQuery(id);
//   console.log(data?.data);
//   const product = data?.data;
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([
//     {
//       name: "",
//       description: "",
//       options: [
//         { option: "", price: "", description: "" },
//         { option: "", price: "", description: "" },
//       ],
//     },
//   ]); // Initialize with one question and two options

//   const handleUpload = ({ fileList }) => setFileList(fileList);

//   const onFinish = async (values) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("base_price", values.base_price);

//     // Ensure price values are below 1
//     const validatePrice = (price) => {
//       const parsedPrice = parseFloat(price);
//       return isNaN(parsedPrice) || parsedPrice >= 1 ? 0.99 : parsedPrice; // Ensure price is below 1
//     };

//     // Build the questions array dynamically
//     const questionsArray = questions.map((question, qIndex) => ({
//       name: values[`questionName${qIndex}`],
//       description: values[`questionDescription${qIndex}`],
//       options: question.options.map((option, oIndex) => ({
//         option: values[`option${qIndex}_${oIndex}`],
//         price: validatePrice(values[`price${qIndex}_${oIndex}`]),
//         description: values[`description${qIndex}_${oIndex}`],
//       })),
//     }));

//     formData.append("questions", JSON.stringify(questionsArray));

//     if (fileList.length > 0) {
//       formData.append("images", fileList[0].originFileObj);
//     }

//     try {
//       const response = await updateProduct(formData).unwrap();
//       navigate("/productQuestion");
//       console.log(response);
//       // refetch();
//       message.success(response.message);
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       // message.error("Failed to create product question");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg">
//       <div className="flex justify-between items-center mb-4 container mx-auto">
//         <div className="flex items-center gap-2">
//           <Link to={"/productQuestion"}>
//             <Button
//               type="link"
//               icon={<ArrowLeft />}
//               className="text-black text-lg"
//             />
//           </Link>
//           <h2 className="text-3xl font-semibold">
//             Estimate your Product Price
//           </h2>
//         </div>
//       </div>

//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <div className="flex gap-4">
//           <Upload
//             listType="picture-card"
//             fileList={fileList}
//             onChange={handleUpload}
//             beforeUpload={() => false} // Prevent automatic upload
//             className="flex items-center justify-center rounded-md"
//           >
//             {fileList.length < 1 && (
//               <div className="text-center">
//                 <UploadOutlined className="text-gray-500" />
//                 <p className="text-gray-500 text-sm">Upload Image</p>
//               </div>
//             )}
//           </Upload>

//           <div className="flex-1 space-y-4">
//             <Form.Item
//               label="Product Name"
//               name="name"
//               rules={[
//                 { required: true, message: "Please enter a product name" },
//               ]}
//             >
//               <Input className="py-3" placeholder="Enter a name" />
//             </Form.Item>

//             <Form.Item
//               label="Estimate Price"
//               name="base_price"
//               rules={[
//                 { required: true, message: "Please enter an estimate price" },
//               ]}
//             >
//               <Input className="py-3" placeholder="Enter an estimate price" />
//             </Form.Item>

//             {/* Questions Section */}
//             {questions.map((question, qIndex) => (
//               <div key={qIndex} className="space-y-4">
//                 <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Form.Item
//                     label="Question Name"
//                     name={`questionName${qIndex}`}
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter a question name",
//                       },
//                     ]}
//                   >
//                     <Input placeholder="Enter question name" />
//                   </Form.Item>
//                   <Form.Item
//                     label="Question Description"
//                     name={`questionDescription${qIndex}`}
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter a question description",
//                       },
//                     ]}
//                   >
//                     <Input placeholder="Enter question description" />
//                   </Form.Item>
//                 </div>

//                 {/* Options Section */}
//                 <h4 className="text-md font-semibold">Options</h4>
//                 {question.options.map((option, oIndex) => (
//                   <div key={oIndex} className="grid grid-cols-3 gap-4">
//                     <Form.Item
//                       label={`Option ${oIndex + 1}`}
//                       name={`option${qIndex}_${oIndex}`}
//                       rules={[
//                         { required: true, message: "Please enter an option" },
//                       ]}
//                     >
//                       <Input placeholder="Enter option" />
//                     </Form.Item>
//                     <Form.Item
//                       label={`Price ${oIndex + 1}`}
//                       name={`price${qIndex}_${oIndex}`}
//                       rules={[
//                         { required: true, message: "Please enter a price" },
//                       ]}
//                     >
//                       <Input placeholder="Enter price" />
//                     </Form.Item>
//                     <Form.Item
//                       label={`Description ${oIndex + 1}`}
//                       name={`description${qIndex}_${oIndex}`}
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter a description",
//                         },
//                       ]}
//                     >
//                       <Input placeholder="Enter description" />
//                     </Form.Item>
//                   </div>
//                 ))}
//               </div>
//             ))}

//             <div className="flex justify-end gap-2">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="bg-[#101010] px-10 py-5"
//               >
//                 Update Product
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Upload, Input, Button, Form, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import {
//   useProductQuestionEditMutation,
//   useSellProductSingleQuery,
// } from "../../../redux/features/productQuestionSlice";

// export default function EditProduct() {
//   const { id } = useParams();
//   const [fileList, setFileList] = useState([]);
//   const [form] = Form.useForm();
//   const [productQuestionEdit] = useProductQuestionEditMutation();
//   const { data } = useSellProductSingleQuery(id);
//   const product = data?.data;
//   console.log(data)
//   console.log(product)
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     if (product) {
//       // Set initial form values
//       form.setFieldsValue({
//         name: product.name || "",
//         base_price: product.base_price || 0,
//       });

//       // Initialize questions if available
//       setQuestions(product.questions || []);

//       // Handle existing image
//       if (product.image) {
//         setFileList([{ url: product.image }]);
//       }
//     }
//   }, [product, form]);

//   const handleUpload = ({ fileList }) => setFileList(fileList);

//   const onFinish = async (values) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("base_price", values.base_price);

//     // Structure questions properly
//     const formattedQuestions = questions.map((question, qIndex) => ({
//       name: values[`questionName${qIndex}`] || "",
//       description: values[`questionDescription${qIndex}`] || "",
//       options: question.options.map((option, oIndex) => ({
//         option: values[`option${qIndex}_${oIndex}`] || "",
//         price: parseFloat(values[`price${qIndex}_${oIndex}`]) || 0,
//         description: values[`description${qIndex}_${oIndex}`] || "",
//       })),
//     }));

//     formData.append("questions", JSON.stringify(formattedQuestions));

//     if (fileList.length > 0 && fileList[0].originFileObj) {
//       formData.append("images", fileList[0].originFileObj);
//     }

//     try {
//       const response = await productQuestionEdit({ id, data: formData }).unwrap();
//       message.success(response.message);
//       navigate("/productQuestion");
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       message.error("Failed to update product");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg">
//       <div className="flex justify-between items-center mb-4 container mx-auto">
//         <div className="flex items-center gap-2">
//           <Link to={"/productQuestion"}>
//             <Button type="link" icon={<ArrowLeft />} className="text-black text-lg" />
//           </Link>
//           <h2 className="text-3xl font-semibold">Edit Product Question</h2>
//         </div>
//       </div>

//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <div className="flex gap-4">
//           <Upload
//             listType="picture-card"
//             fileList={fileList}
//             onChange={handleUpload}
//             beforeUpload={() => false}
//             className="flex items-center justify-center rounded-md"
//           >
//             {fileList.length === 0 && (
//               <div className="text-center">
//                 <UploadOutlined className="text-gray-500" />
//                 <p className="text-gray-500 text-sm">Upload Image</p>
//               </div>
//             )}
//           </Upload>

//           <div className="flex-1 space-y-4">
//             <Form.Item
//               label="Product Name"
//               name="name"
//               rules={[{ required: true, message: "Please enter a product name" }]}
//             >
//               <Input className="py-3" placeholder="Enter a name" />
//             </Form.Item>

//             <Form.Item
//               label="Estimate Price"
//               name="base_price"
//               rules={[{ required: true, message: "Please enter an estimate price" }]}
//             >
//               <Input className="py-3" placeholder="Enter an estimate price" />
//             </Form.Item>

//             {questions.map((question, qIndex) => (
//               <div key={qIndex} className="space-y-4">
//                 <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Form.Item
//                     label="Question Name"
//                     name={`questionName${qIndex}`}
//                     rules={[{ required: true, message: "Please enter a question name" }]}
//                   >
//                     <Input placeholder="Enter question name" defaultValue={question.name}/>
//                   </Form.Item>
//                   <Form.Item
//                     label="Question Description"
//                     name={`questionDescription${qIndex}`}
//                     rules={[{ required: true, message: "Please enter a question description" }]}
//                   >
//                     <Input placeholder="Enter question description"  defaultValue={question?.description}/>
//                   </Form.Item>
//                 </div>

//                 <h4 className="text-md font-semibold">Options</h4>
//                 {question.options.map((option, oIndex) => (
//                   <div key={oIndex} className="grid grid-cols-3 gap-4">
//                     <Form.Item
//                       label={`Option ${oIndex + 1}`}
//                       name={`option${qIndex}_${oIndex}`}
//                       rules={[{ required: true, message: "Please enter an option" }]}
//                     >
//                       <Input placeholder="Enter option" defaultValue={option?.option} />
//                     </Form.Item>
//                     <Form.Item
//                       label={`Price ${oIndex + 1}`}
//                       name={`price${qIndex}_${oIndex}`}
//                       rules={[{ required: true, message: "Please enter a price" }]}
//                     >
//                       <Input placeholder="Enter price" defaultValue={option?.price} />
//                     </Form.Item>
//                     <Form.Item
//                       label={`Description ${oIndex + 1}`}
//                       name={`description${qIndex}_${oIndex}`}
//                       rules={[{ required: true, message: "Please enter a description" }]}
//                     >
//                       <Input placeholder="Enter description" defaultValue={option?.description}/>
//                     </Form.Item>
//                   </div>
//                 ))}
//               </div>
//             ))}

//             <div className="flex justify-end gap-2">
//               <Button type="primary" htmlType="submit" className="bg-[#101010] px-10 py-5">
//                 Update Product
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Upload, Input, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  useProductQuestionEditMutation,
  useSellProductSingleQuery,
} from "../../../redux/features/productQuestionSlice";

export default function EditProduct() {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [productQuestionEdit] = useProductQuestionEditMutation();
  const { data } = useSellProductSingleQuery(id);
  const product = data?.data;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name || "",
        base_price: product.base_price || 0,
      });

      setQuestions(product.questions || []);

      if (product.image) {
        setFileList([{ url: product.image }]);
      }
    }
  }, [product, form]);

  const handleUpload = ({ fileList }) => setFileList(fileList);
  
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("base_price", values.base_price);

    // Ensure price values are below 1
    const validatePrice = (price) => {
      const parsedPrice = parseFloat(price);
      return isNaN(parsedPrice) || parsedPrice >= 1 ? 0.99 : parsedPrice; // Ensure price is below 1
    };

    // Build the questions array dynamically
    const questionsArray = questions.map((question, qIndex) => ({
      name: values[`questionName${qIndex}`],
      description: values[`questionDescription${qIndex}`],
      options: question.options.map((option, oIndex) => ({
        option: values[`option${qIndex}_${oIndex}`],
        price: validatePrice(values[`price${qIndex}_${oIndex}`]),
        description: values[`description${qIndex}_${oIndex}`],
      })),
    }));

    formData.append("questions", JSON.stringify(questionsArray));

    if (fileList.length > 0) {
      formData.append("images", fileList[0].originFileObj);
    }

    try {
      const response = await productQuestionEdit({id, formData}).unwrap();
      navigate("/productQuestion");
      console.log(response);
      // refetch();
      // message.success(response.message);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      // message.error("Failed to create product question");
    }
  };

 

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4 container mx-auto">
        <div className="flex items-center gap-2">
          <Link to={"/productQuestion"}>
            <Button type="link" icon={<ArrowLeft />} className="text-black text-lg" />
          </Link>
          <h2 className="text-3xl font-semibold">Edit Product Question</h2>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}  initialValues={product}>
        <div className="flex gap-4">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
            className="flex items-center justify-center rounded-md"
          >
            {fileList.length === 0 && (
              <div className="text-center">
                <UploadOutlined className="text-gray-500" />
                <p className="text-gray-500 text-sm">Upload Image</p>
              </div>
            )}
          </Upload>

          <div className="flex-1 space-y-4">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: "Please enter a product name" }]}
            >
              <Input className="py-3" placeholder="Enter a name" />
            </Form.Item>

            <Form.Item
              label="Estimate Price"
              name="base_price"
              rules={[{ required: true, message: "Please enter an estimate price" }]}
            >
              <Input className="py-3" placeholder="Enter an estimate price" />
            </Form.Item>

            {questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="Question Name"
                    name={`questionName${qIndex}`}
                    initialValue={question.name}
                    rules={[{ required: true, message: "Please enter a question name" }]}
                  >
                    <Input placeholder="Enter question name" />
                  </Form.Item>
                  <Form.Item
                    label="Question Description"
                    name={`questionDescription${qIndex}`}
                    initialValue={question.description}
                    rules={[{ required: true, message: "Please enter a question description" }]}
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
                      rules={[{ required: true, message: "Please enter an option" }]}
                    >
                      <Input placeholder="Enter option" />
                    </Form.Item>
                    <Form.Item
                      label={`Price ${oIndex + 1}`}
                      name={`price${qIndex}_${oIndex}`}
                      initialValue={option.price}
                      rules={[{ required: true, message: "Please enter a price" }]}
                    >
                      <Input placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item
                      label={`Description ${oIndex + 1}`}
                      name={`description${qIndex}_${oIndex}`}
                      initialValue={option.description}
                      rules={[{ required: true, message: "Please enter a description" }]}
                    >
                      <Input placeholder="Enter description" />
                    </Form.Item>
                  </div>
                ))}
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <Button type="primary" htmlType="submit" className="bg-[#101010] px-10 py-5">
                Update Product
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
