import { useState } from "react";
import { Button, Card, Input, Select, Divider } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EditProduct() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "What is the condition of the console?",
      variants: [
        { id: 1, price: "$55", condition: "Very Good" },
        { id: 2, price: "$45", condition: "Good" },
        { id: 3, price: "$25", condition: "Bad" },
      ],
      showForm: false,
    },
    {
      id: 2,
      title: "What is the condition of the console?",
      variants: [{ id: 1, price: "$55", condition: "Very Good" }],
      showForm: true,
    },
  ]);

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
      prev.map((q) => (q.id === questionId ? { ...q, showForm: !q.showForm } : q))
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen rounded-lg">
       <div className="flex justify-between  items-center mb-4 container mx-auto">
        
        <div className="flex items-center gap-2">
          <Link to={'/productQuestion'}>
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
          <h2 className="text-3xl font-semibold">Estimete your Product Price</h2>
        </div>

        <Link to={'/productForm'} className="flex gap-2 items-center cursor-pointer">
          <button className="bg-[#101010] px-6 py-3 rounded-lg  font-normal text-white">
          Add New Product
          </button>
        </Link>
      </div>

      {questions.map((question) => (
        <Card key={question.id} className="mb-6 shadow-md bg-white rounded-lg">
          <h3 className="text-xl font-semibold pb-3 border-b border-gray-300">
            {String(question.id).padStart(2, "0")}. {question.title}
          </h3>

          <div className="space-y-3 py-4">
            {question.variants.map((variant) => (
              <div key={variant.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-100">
                <p>
                  <span className="font-medium">Price:</span> {variant.price}
                </p>
                <p>
                  <span className="font-medium">Condition:</span> {variant.condition}
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
                  onChange={(value) => setNewVariant({ ...newVariant, condition: value })}
                >
                  <Select.Option value="Very Good">Very Good</Select.Option>
                  <Select.Option value="Good">Good</Select.Option>
                  <Select.Option value="Bad">Bad</Select.Option>
                </Select>

                
                <Input
                  placeholder="Enter Price"
                  className="py-2"
                  onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button danger onClick={() => toggleForm(question.id)}>
                  Cancel
                </Button>
                <Button type="primary" className="bg-black" onClick={() => addVariant(question.id)}>
                  Save
                </Button>
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

      <div className="flex justify-end mt-6">
        <Button type="primary" className="bg-black px-6 py-2">
          Add New Question
        </Button>
      </div>
    </div>
  );
}
