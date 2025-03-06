// import { useState } from "react";
// import { Upload, Input, Select, Button, Form } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useProductQuestionPostMutation } from "../../../redux/features/productQuestionSlice";

// export default function ProductForm() {
//   const [fileList, setFileList] = useState([]);

//   const handleUpload = ({ fileList }) => setFileList(fileList);

//   const [productQuestionPost] =useProductQuestionPostMutation()

//   return (
//     <div className="p-6 bg-white  rounded-lg">
//         <div className="flex justify-between  items-center mb-4 container mx-auto">

//         <div className="flex items-center gap-2">
//           <Link to={'/productQuestion'}>
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
//           <h2 className="text-3xl font-semibold">Estimete your Product Price</h2>
//         </div>

//         {/* <Link to={'/productForm'} className="flex gap-2 items-center cursor-pointer">
//           <button className="bg-[#101010] px-6 py-3 rounded-lg  font-normal text-white">
//           Add New Product
//           </button>
//         </Link> */}
//       </div>

//       <Form layout="vertical">
//         <div className="flex gap-4">
//           {/* Image Upload Section */}
//           <Upload
//             listType="picture-card"
//             fileList={fileList}
//             onChange={handleUpload}
//             className="flex items-center justify-center  rounded-md"
//           >
//             {fileList.length < 1 && (
//               <div className="text-center" >
//                 <UploadOutlined className="text-gray-500 " />
//                 <p className="text-gray-500 text-sm">Upload Image</p>
//               </div>
//             )}
//           </Upload>

//           {/* Form Fields */}
//           <div className="flex-1 space-y-4">
//             <Form.Item label="Product Name" className="w-full">
//               <Input className="py-3" placeholder="Enter a name" />
//             </Form.Item>

//             <div className="grid grid-cols-4 gap-4">
//               <Form.Item label="Question" className="col-span-1">
//                 <Input className="py-3" placeholder="Enter your question.." />
//               </Form.Item>

//               <Form.Item label="Estimate Price" className="col-span-1 ">
//                 <Input className="py-3" placeholder="Enter an estimate price" />
//               </Form.Item>

//               <Form.Item label="Price" className="col-span-1">
//                 <Input className="py-3" placeholder="Enter a price" />
//               </Form.Item>

//               <Form.Item label="Conditions" className="col-span-1">
//                 <Select placeholder="Conditions">
//                   <Select.Option value="new">New</Select.Option>
//                   <Select.Option value="used">Used</Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-2">
//               <Button className="px-10 py-5" danger>Cancel</Button>
//               <Button type="primary"  className="bg-[#101010] px-10 py-5">
//                 Save
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Upload, Input, Select, Button, Form, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useProductQuestionPostMutation } from "../../../redux/features/productQuestionSlice";

// export default function ProductForm() {
//   const [fileList, setFileList] = useState([]);
//   const [form] = Form.useForm();
//   const [productQuestionPost, refetch] = useProductQuestionPostMutation();
//   const navigate = useNavigate();

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
  
//     // Ensure questions are an array of objects with valid prices
//     const questionsArray = [
//       {
//         name: values.questionName,
//         description: values.questionDescription,
//         options: [
//           {
//             option: values.optionA,
//             price: validatePrice(values.priceA),
//             description: values.descriptionA,
//           },
//           {
//             option: values.optionB,
//             price: validatePrice(values.priceB),
//             description: values.descriptionB,
//           },
//         ],
//       },
//     ];
  
//     formData.append("questions", JSON.stringify(questionsArray));
  
//     if (fileList.length > 0) {
//       formData.append("images", fileList[0].originFileObj);
//     }
  
//     try {
//       const response = await productQuestionPost(formData).unwrap();
//       navigate('/productQuestion')
//       console.log(response);
//       refetch()
//       message.success(response.message);
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       message.error("Failed to create product question");
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
//           <h2 className="text-3xl font-semibold">Estimate your Product Price</h2>
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
//               rules={[{ required: true, message: "Please enter a product name" }]}
//             >
//               <Input className="py-3" placeholder="Enter a name" />
//             </Form.Item>

//             <div className="grid grid-cols-4 gap-4">
//               <Form.Item
//                 label="Question Name"
//                 name="questionName"
//                 rules={[{ required: true, message: "Please enter a question name" }]}
//               >
//                 <Input className="py-3" placeholder="Enter question name.." />
//               </Form.Item>

//               <Form.Item
//                 label="Question Description"
//                 name="questionDescription"
//                 rules={[{ required: true, message: "Please enter a question description" }]}
//               >
//                 <Input className="py-3" placeholder="Enter question description" />
//               </Form.Item>

//               <Form.Item
//                 label="Estimate Price"
//                 name="base_price"
//                 rules={[{ required: true, message: "Please enter an estimate price" }]}
//               >
//                 <Input className="py-3" placeholder="Enter an estimate price" />
//               </Form.Item>

//               <Form.Item label="Conditions" name="conditions">
//                 <Select placeholder="Select Condition">
//                   <Select.Option value="new">New</Select.Option>
//                   <Select.Option value="used">Used</Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>

//             {/* Options Section */}
//             <h3 className="text-lg font-semibold">Options</h3>
//             <div className="grid grid-cols-3 gap-4">
//               <Form.Item label="Option A" name="optionA" rules={[{ required: true }]}>
//                 <Input placeholder="Enter option A" />
//               </Form.Item>
//               <Form.Item label="Price A" name="priceA" rules={[{ required: true }]}>
//                 <Input placeholder="Enter price A" />
//               </Form.Item>
//               <Form.Item label="Description A" name="descriptionA" rules={[{ required: true }]}>
//                 <Input placeholder="Enter description A" />
//               </Form.Item>
              
//               <Form.Item label="Option B" name="optionB" rules={[{ required: true }]}>
//                 <Input placeholder="Enter option B" />
//               </Form.Item>
//               <Form.Item label="Price B" name="priceB" rules={[{ required: true }]}>
//                 <Input placeholder="Enter price B" />
//               </Form.Item>
//               <Form.Item label="Description B" name="descriptionB" rules={[{ required: true }]}>
//                 <Input placeholder="Enter description B" />
//               </Form.Item>
//             </div>

//             <div className="flex justify-end gap-2">
//               <Button className="px-10 py-5" danger onClick={() => form.resetFields()}>
//                 Cancel
//               </Button>
//               <Button type="primary" htmlType="submit" className="bg-[#101010] px-10 py-5">
//                 Save
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Upload, Input, Select, Button, Form, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useProductQuestionPostMutation } from "../../../redux/features/productQuestionSlice";

// export default function ProductForm() {
//   const [fileList, setFileList] = useState([]);
//   const [form] = Form.useForm();
//   const [productQuestionPost, refetch] = useProductQuestionPostMutation();
//   const navigate = useNavigate();
//   const [optionCount, setOptionCount] = useState(2); // Start with 2 options (A and B)

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

//     // Dynamically build the questions array based on the number of options
//     const questionsArray = [
//       {
//         name: values.questionName,
//         description: values.questionDescription,
//         options: Array.from({ length: optionCount }, (_, index) => ({
//           option: values[`option${String.fromCharCode(65 + index)}`],
//           price: validatePrice(values[`price${String.fromCharCode(65 + index)}`]),
//           description: values[`description${String.fromCharCode(65 + index)}`],
//         })),
//       },
//     ];

//     formData.append("questions", JSON.stringify(questionsArray));

//     if (fileList.length > 0) {
//       formData.append("images", fileList[0].originFileObj);
//     }

//     try {
//       const response = await productQuestionPost(formData).unwrap();
//       navigate('/productQuestion');
//       console.log(response);
//       refetch();
//       message.success(response.message);
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       // message.error("Failed to create product question");
//     }
//   };

//   const addOptionSection = () => {
//     setOptionCount(optionCount + 1);
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
//           <h2 className="text-3xl font-semibold">Estimate your Product Price</h2>
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
//               rules={[{ required: true, message: "Please enter a product name" }]}
//             >
//               <Input className="py-3" placeholder="Enter a name" />
//             </Form.Item>

//             <div className="grid grid-cols-4 gap-4">
//               <Form.Item
//                 label="Question Name"
//                 name="questionName"
//                 rules={[{ required: true, message: "Please enter a question name" }]}
//               >
//                 <Input className="py-3" placeholder="Enter question name.." />
//               </Form.Item>

//               <Form.Item
//                 label="Question Description"
//                 name="questionDescription"
//                 rules={[{ required: true, message: "Please enter a question description" }]}
//               >
//                 <Input className="py-3" placeholder="Enter question description" />
//               </Form.Item>

//               <Form.Item
//                 label="Estimate Price"
//                 name="base_price"
//                 rules={[{ required: true, message: "Please enter an estimate price" }]}
//               >
//                 <Input className="py-3" placeholder="Enter an estimate price" />
//               </Form.Item>

//               <Form.Item label="Conditions" name="conditions">
//                 <Select placeholder="Select Condition">
//                   <Select.Option value="new">New</Select.Option>
//                   <Select.Option value="used">Used</Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>

//             {/* Options Section */}
//             <h3 className="text-lg font-semibold">Options</h3>
//             {Array.from({ length: optionCount }, (_, index) => (
//               <div key={index} className="grid grid-cols-3 gap-4">
//                 <Form.Item
//                   label={`Option ${String.fromCharCode(65 + index)}`}
//                   name={`option${String.fromCharCode(65 + index)}`}
//                   rules={[{ required: true }]}
//                 >
//                   <Input placeholder={`Enter option ${String.fromCharCode(65 + index)}`} />
//                 </Form.Item>
//                 <Form.Item
//                   label={`Price ${String.fromCharCode(65 + index)}`}
//                   name={`price${String.fromCharCode(65 + index)}`}
//                   rules={[{ required: true }]}
//                 >
//                   <Input placeholder={`Enter price ${String.fromCharCode(65 + index)}`} />
//                 </Form.Item>
//                 <Form.Item
//                   label={`Description ${String.fromCharCode(65 + index)}`}
//                   name={`description${String.fromCharCode(65 + index)}`}
//                   rules={[{ required: true }]}
//                 >
//                   <Input placeholder={`Enter description ${String.fromCharCode(65 + index)}`} />
//                 </Form.Item>
//               </div>
//             ))}

//             <Button type="dashed" onClick={addOptionSection} className="w-full">
//               Add Another Option
//             </Button>

//             <div className="flex justify-end gap-2">
//               <Button className="px-10 py-5" danger onClick={() => form.resetFields()}>
//                 Cancel
//               </Button>
//               <Button type="primary" htmlType="submit" className="bg-[#101010] px-10 py-5">
//                 Save
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }

import { useState } from "react";
import { Upload, Input, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProductQuestionPostMutation } from "../../../redux/features/productQuestionSlice";

export default function ProductForm() {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [productQuestionPost, refetch] = useProductQuestionPostMutation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      name: "",
      description: "",
      options: [
        { option: "", price: "", description: "" },
        { option: "", price: "", description: "" },
      ],
    },
  ]); // Initialize with one question and two options

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
      const response = await productQuestionPost(formData).unwrap();
      navigate("/productQuestion");
      console.log(response);
      refetch();
      message.success(response.message);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      // message.error("Failed to create product question");
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        name: "",
        description: "",
        options: [
          { option: "", price: "", description: "" },
          { option: "", price: "", description: "" },
        ],
      },
    ]);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({
      option: "",
      price: "",
      description: "",
    });
    setQuestions(updatedQuestions);
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
          <h2 className="text-3xl font-semibold">Estimate your Product Price</h2>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex gap-4">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false} // Prevent automatic upload
            className="flex items-center justify-center rounded-md"
          >
            {fileList.length < 1 && (
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

            {/* Questions Section */}
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="Question Name"
                    name={`questionName${qIndex}`}
                    rules={[{ required: true, message: "Please enter a question name" }]}
                  >
                    <Input placeholder="Enter question name" />
                  </Form.Item>
                  <Form.Item
                    label="Question Description"
                    name={`questionDescription${qIndex}`}
                    rules={[{ required: true, message: "Please enter a question description" }]}
                  >
                    <Input placeholder="Enter question description" />
                  </Form.Item>
                </div>

                {/* Options Section */}
                <h4 className="text-md font-semibold">Options</h4>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="grid grid-cols-3 gap-4">
                    <Form.Item
                      label={`Option ${oIndex + 1}`}
                      name={`option${qIndex}_${oIndex}`}
                      rules={[{ required: true, message: "Please enter an option" }]}
                    >
                      <Input placeholder="Enter option" />
                    </Form.Item>
                    <Form.Item
                      label={`Price ${oIndex + 1}`}
                      name={`price${qIndex}_${oIndex}`}
                      rules={[{ required: true, message: "Please enter a price" }]}
                    >
                      <Input placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item
                      label={`Description ${oIndex + 1}`}
                      name={`description${qIndex}_${oIndex}`}
                      rules={[{ required: true, message: "Please enter a description" }]}
                    >
                      <Input placeholder="Enter description" />
                    </Form.Item>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => addOption(qIndex)}
                  className="w-full"
                >
                  Add Another Option
                </Button>
              </div>
            ))}

            <Button type="dashed" onClick={addQuestion} className="w-full">
              Add Another Question
            </Button>

            <div className="flex justify-end gap-2">
              <Button className="px-10 py-5" danger onClick={() => form.resetFields()}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-[#101010] px-10 py-5">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}