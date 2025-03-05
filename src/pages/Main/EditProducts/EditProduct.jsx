// import { useEffect, useState } from "react";
// import { Button, Card, Input, Select, Divider } from "antd";
// import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useUpdateProductMutation } from "../../../redux/features/productsSlice";
// import { useSellProductSingleQuery } from "../../../redux/features/productQuestionSlice";

// export default function EditProduct() {
//    const { id } = useParams();

//   const [updateProduct]= useUpdateProductMutation()

//   const {data} = useSellProductSingleQuery(id)
//   console.log(data?.data?.name)
//   const product = data?.data

//   const [questions, setQuestions] = useState([])

//     useEffect(() => {
//       if (data?.data?.questions) {
//         const mappedQuestions = data.data.questions.map((question, index) => ({
//           id: index + 1,
//           title: question.description,
//           variants: question.options.map((option, idx) => ({
//             id: idx + 1,
//             price: `$${option.price}`,
//             condition: option.option,
//           })),
//           showForm: false,
//         }));
//         setQuestions(mappedQuestions);
//       }
//     }, [data]);

//   const [newVariant, setNewVariant] = useState({ condition: "", price: "" });

//   const addVariant = (questionId) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId
//           ? {
//               ...q,
//               variants: [...q.variants, { id: Date.now(), ...newVariant }],
//               showForm: false,
//             }
//           : q
//       )
//     );
//     setNewVariant({ condition: "", price: "" });
//   };

//   const toggleForm = (questionId) => {
//     setQuestions((prev) =>
//       prev.map((q) => (q.id === questionId ? { ...q, showForm: !q.showForm } : q))
//     );
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen rounded-lg">
//        <div className="flex justify-between  items-center mb-4 container mx-auto">

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

//         <Link to={'/productForm'} className="flex gap-2 items-center cursor-pointer">
//           <button className="bg-[#101010] px-6 py-3 rounded-lg  font-normal text-white">
//           Add New Product
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
//               <div key={variant.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-100">
//                 <p>
//                   <span className="font-medium">Price:</span> {variant.price}
//                 </p>
//                 <p>
//                   <span className="font-medium">Condition:</span> {variant.condition}
//                 </p>
//                 <div className="flex gap-2">
//                   <Button type="text" danger icon={<DeleteOutlined />} />
//                   <Button type="text" icon={<EditOutlined />} />
//                 </div>
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
//                   onChange={(value) => setNewVariant({ ...newVariant, condition: value })}
//                 >
//                   <Select.Option value="Very Good">Very Good</Select.Option>
//                   <Select.Option value="Good">Good</Select.Option>
//                   <Select.Option value="Bad">Bad</Select.Option>
//                 </Select>

//                 <Input
//                   placeholder="Enter Price"
//                   className="py-2"
//                   onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
//                 />
//               </div>

//               <div className="flex justify-end gap-3 mt-4">
//                 <Button className="py-5 px-6" danger onClick={() => toggleForm(question.id)}>
//                   Cancel
//                 </Button>
//                 <button className="bg-black py-2 rounded-lg text-white px-7" onClick={() => addVariant(question.id)}>
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}

//           {!question.showForm && (
//             <Button
//               type="link"
//               icon={<PlusOutlined />}
//               className="text-blue-500 mt-2"
//               onClick={() => toggleForm(question.id)}
//             >
//               Add Variant
//             </Button>
//           )}
//         </Card>
//       ))}

// <button className="px-3 py-2 rounded-lg bg-blue-500 text-sm text-white">Add question and Variant</button>

//       <div className="flex justify-end mt-6">
//         <button
//          className="bg-[#101010] text-white rounded-lg text-xs px-6 py-3">
//           Update Product
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Button, Card, Input, Select, Divider } from "antd";
// import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useProductQuestionEditMutation, useSellProductSingleQuery } from "../../../redux/features/productQuestionSlice";

// export default function EditProduct() {
//   const { id } = useParams();

// const [productQuestionEdit] =useProductQuestionEditMutation()
//   const { data } = useSellProductSingleQuery(id);
//   console.log(data?.data?.name);
//   const product = data?.data;

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
//         editMode: false, // Add editMode for each question
//       }));
//       setQuestions(mappedQuestions);
//     }
//   }, [data]);

//   const [newVariant, setNewVariant] = useState({ condition: "", price: "" });

//   const addVariant = (questionId) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId
//           ? {
//               ...q,
//               variants: [...q.variants, { id: Date.now(), ...newVariant }],
//               showForm: false,
//             }
//           : q
//       )
//     );
//     setNewVariant({ condition: "", price: "" });
//   };

//   const toggleForm = (questionId) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId ? { ...q, showForm: !q.showForm } : q
//       )
//     );
//   };

//   const addNewQuestion = () => {
//     const newQuestion = {
//       id: questions.length + 1,
//       title: `New Question ${questions.length + 1}`,
//       variants: [],
//       showForm: false,
//       editMode: false, // Initialize editMode as false
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const toggleEditMode = (questionId) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId ? { ...q, editMode: !q.editMode } : q
//       )
//     );
//   };

//   const updateQuestionTitle = (questionId, newTitle) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId ? { ...q, title: newTitle, editMode: false } : q
//       )
//     );
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen rounded-lg">
//       <div className="flex justify-between items-center mb-4 container mx-auto">
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
//             Estimate your Product Price
//           </h2>
//         </div>

//         <Link
//           to={"/productForm"}
//           className="flex gap-2 items-center cursor-pointer"
//         >
//           <button className="bg-[#101010] px-6 py-3 rounded-lg font-normal text-white">
//             Add New Product
//           </button>
//         </Link>
//       </div>

//       {questions.map((question) => (
//         <Card key={question.id} className="mb-6 shadow-md bg-white rounded-lg">
//           <div className="flex justify-between items-center pb-3 border-b border-gray-300">
//             {question.editMode ? (
//               <Input
//                 defaultValue={question.title}
//                 onBlur={(e) => updateQuestionTitle(question.id, e.target.value)}
//                 onPressEnter={(e) =>
//                   updateQuestionTitle(question.id, e.target.value)
//                 }
//                 autoFocus
//               />
//             ) : (
//               <h3 className="text-xl font-semibold">
//                 {String(question.id).padStart(2, "0")}. {question.title}
//               </h3>
//             )}
//             <Button
//               type="text"
//               icon={<EditOutlined />}
//               onClick={() => toggleEditMode(question.id)}
//             />
//           </div>

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
//                 <div className="flex gap-2">
//                   <Button type="text" danger icon={<DeleteOutlined />} />
//                   <Button type="text" icon={<EditOutlined />} />
//                 </div>
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

//               <div className="flex justify-end gap-3 mt-4">
//                 <Button
//                   className="py-5 px-6"
//                   danger
//                   onClick={() => toggleForm(question.id)}
//                 >
//                   Cancel
//                 </Button>
//                 <button
//                   className="bg-black py-2 rounded-lg text-white px-7"
//                   onClick={() => addVariant(question.id)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}

//           {!question.showForm && (
//             <Button
//               type="link"
//               icon={<PlusOutlined />}
//               className="text-blue-500 mt-2"
//               onClick={() => toggleForm(question.id)}
//             >
//               Add Variant
//             </Button>
//           )}
//         </Card>
//       ))}

//       <div className="flex justify-start mt-6">
//         <button
//           className="bg-[#101010] text-white rounded-lg text-xs px-6 py-3"
//           onClick={addNewQuestion}
//         >
//             Add question and Variant
//         </button>
//       </div>
//       <div className="flex justify-end ">
//         <button className="px-6 py-4 rounded-lg bg-black text-sm text-white">
//         update product
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Button, Card, Input, Select, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProductQuestionEditMutation, useSellProductSingleQuery } from "../../../redux/features/productQuestionSlice";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productQuestionEdit] = useProductQuestionEditMutation();
  const { data } = useSellProductSingleQuery(id);
  const product = data?.data;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data?.data?.questions) {
      const mappedQuestions = data.data.questions.map((question, index) => ({
        id: index + 1,
        name: question.name,
        title: question.description,
        variants: question.options.map((option, idx) => ({
          id: idx + 1,
          price: option.price,
          condition: option.option,
          _id: option._id,
        })),
        showForm: false,
        editMode: false,
      }));
      setQuestions(mappedQuestions);
    }
  }, [data]);

  const [newVariant, setNewVariant] = useState({ condition: "", price: "" });

  const addVariant = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              variants: [...q.variants, { id: Date.now(), ...newVariant }],
              showForm: false,
            }
          : q
      )
    );
    setNewVariant({ condition: "", price: "" });
  };

  const toggleForm = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, showForm: !q.showForm } : q
      )
    );
  };

  const addNewQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      name: `question_${questions.length + 1}`,
      title: `New Question ${questions.length + 1}`,
      variants: [],
      showForm: false,
      editMode: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const toggleEditMode = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, editMode: !q.editMode } : q
      )
    );
  };

  const updateQuestionTitle = (questionId, newTitle) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, title: newTitle, editMode: false } : q
      )
    );
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("base_price", product.base_price);

    questions.forEach((question, index) => {
      formData.append(`questions[${index}][name]`, question.name);
      formData.append(`questions[${index}][description]`, question.title);

      question.variants.forEach((variant, idx) => {
        formData.append(`questions[${index}][options][${idx}][option]`, variant.condition);
        formData.append(`questions[${index}][options][${idx}][price]`, variant.price);
        if (variant._id) {
          formData.append(`questions[${index}][options][${idx}][_id]`, variant._id);
        }
      });
    });

    try {
      const response = await productQuestionEdit({ id, data: formData }).unwrap();
      message.success(response.message);
      navigate("/productQuestion");
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen rounded-lg">
      <div className="flex justify-between items-center mb-4 container mx-auto">
        <div className="flex items-center gap-2">
          <Link to={"/productQuestion"}>
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
          <h2 className="text-3xl font-semibold">
            Estimate your Product Price
          </h2>
        </div>

        <Link
          to={"/productForm"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <button className="bg-[#101010] px-6 py-3 rounded-lg font-normal text-white">
            Add New Product
          </button>
        </Link>
      </div>

      {questions.map((question) => (
        <Card key={question.id} className="mb-6 shadow-md bg-white rounded-lg">
          <div className="flex justify-between items-center pb-3 border-b border-gray-300">
            {question.editMode ? (
              <Input
                defaultValue={question.title}
                onBlur={(e) => updateQuestionTitle(question.id, e.target.value)}
                onPressEnter={(e) =>
                  updateQuestionTitle(question.id, e.target.value)
                }
                autoFocus
              />
            ) : (
              <h3 className="text-xl font-semibold">
                {String(question.id).padStart(2, "0")}. {question.title}
              </h3>
            )}
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => toggleEditMode(question.id)}
            />
          </div>

          <div className="space-y-3 py-4">
            {question.variants.map((variant) => (
              <div
                key={variant.id}
                className="flex justify-between items-center p-3 border rounded-lg bg-gray-100"
              >
                <p>
                  <span className="font-medium">Price:</span> ${variant.price}
                </p>
                <p>
                  <span className="font-medium">Condition:</span>{" "}
                  {variant.condition}
                </p>
                <div className="flex gap-2">
                  <Button type="text" danger icon={<DeleteOutlined />} />
                  <Button type="text" icon={<EditOutlined />} />
                </div>
              </div>
            ))}
          </div>

          {question.showForm && (
            <div className="p-4 bg-gray-100 rounded-md shadow-sm mt-4">
              <h4 className="text-lg font-semibold pb-2">Add New Variant</h4>
              <Divider className="my-2" />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  placeholder="Select Condition"
                  className="w-full py-2"
                  onChange={(value) =>
                    setNewVariant({ ...newVariant, condition: value })
                  }
                >
                  <Select.Option value="Very Good">Very Good</Select.Option>
                  <Select.Option value="Good">Good</Select.Option>
                  <Select.Option value="Bad">Bad</Select.Option>
                </Select>

                <Input
                  placeholder="Enter Price"
                  className="py-2"
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, price: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  className="py-5 px-6"
                  danger
                  onClick={() => toggleForm(question.id)}
                >
                  Cancel
                </Button>
                <button
                  className="bg-black py-2 rounded-lg text-white px-7"
                  onClick={() => addVariant(question.id)}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {!question.showForm && (
            <Button
              type="link"
              icon={<PlusOutlined />}
              className="text-blue-500 mt-2"
              onClick={() => toggleForm(question.id)}
            >
              Add Variant
            </Button>
          )}
        </Card>
      ))}

      <div className="flex justify-start mt-6">
        <button
          className="bg-[#101010] text-white rounded-lg text-xs px-6 py-3"
          onClick={addNewQuestion}
        >
          Add question and Variant
        </button>
      </div>
      <div className="flex justify-end ">
        <button
          className="px-6 py-4 rounded-lg bg-black text-sm text-white"
          onClick={handleUpdateProduct}
        >
          Update product
        </button>
      </div>
    </div>
  );
}