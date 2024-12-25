import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const EditTermsConditions = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  console.log(content);

  // Custom toolbar options
  const modules = {
    toolbar: {
      container: [
        [{ font: [] }], // Font size selector
        [{ color: [] }], // Text color selector
        [{ align: [] }], // Text alignment options
        ["bold", "italic", "underline"], // Additional formatting options
      ],
      handlers: {
        // Custom handlers can be added here if needed
      },
    },
  };

  // Custom formats supported by Quill editor
  const formats = [
    "font",
    "color",
    "align",
    "bold",
    "italic",
    "underline",
  ];
  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1>Terms & Condition </h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Terms & Condition Edit
          </h3>
          <div className="w-full px-16">
            <div className="h-full border border-gray-400 rounded-md">
              <div className="ql-toolbar-container h-56">
                <ReactQuill
                  placeholder="Enter your update terms & conditions..."
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  modules={modules}
                  formats={formats}
                  className=""
                />
              </div>
            </div>

          </div>
          <div className="flex justify-end pt-8 pr-16">
            <Button
              onClick={(e) => navigate(`edit`)}
              size="large"
              type="primary"
              className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>

  );
};

export default EditTermsConditions;
