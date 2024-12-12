import { Button } from "antd";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const placeholder = "Enter your update privacy policy...";
  console.log(content);
  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading title={"Edit Privacy Policy"} backPath={-1} />

        <div className="h-full">
          <ReactQuill
            placeholder={placeholder}
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            className="h-[50vh]"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="px-8 w-[250px]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
