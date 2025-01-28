import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/images/verify.png";
import PageHeading from "../../Components/PageHeading";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
// import { useVerifyEmailMutation } from "../../redux/features/Auth/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  // const [mutation, { isLoading }] = useVerifyEmailMutation();
  const onFinish = async (values) => {
    if (isNaN(otp) || otp.length < 4) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter 4 digits OTP number!!.",
      });
    }
    navigate(`/auth/reset-password`);
    // try {
    //   const response = await mutation({
    //     email: id,
    //     code: Number(otp),
    //   });
    //   // console.log(response);
    //   if (response?.data?.statusCode == 200) {
    //     localStorage.setItem("verify-token", response?.data?.data);
    //     navigate(`/auth/reset-password`);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "failed!",
    //       text:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     // title: "Login Failed , Try Again...",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };
  return (
    <div>
      <div className="">
        <div className="flex h-screen ">
          {/* Background Image Section */}
          <div
            className="w-full bg-cover bg-center flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100"
            style={{
              backgroundImage: "url('/login.png')", // Replace with your actual image path
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Sign-In Form Section */}
            <div className="w-3/5  ">
              <div
                // style={{
                //   background:
                //     "linear-gradient(180deg, ##409cfe 100%, ##75b5df 43%)",
                // }}
                className=" shadow-lg bg-gradient-to-t to-[#409cfe]  from-[#75b5df] rounded-lg px-8 py-10 w-96"
              >
                {/* Form */}
                <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
                  Forgot Password
                </h1>
                <p className="text-center mb-4">
                  Please enter your email address to reset your password.
                </p>
                <div className="mb-4">
                  <Form
                    name="normal_login"
                    layout="vertical"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <div className="py-3 text-2xl font-semibold flex justify-center">
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                          height: "50px",
                          width: "50px",
                          margin: "5px",
                          // background: "#ECE8F1",
                          border: "1px solid #61D0FF",
                          // marginRight: "auto",
                          outline: "none",
                          borderRadius: "50px",
                          color: "black",
                        }}
                        renderSeparator={<span> </span>}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>

                    <div className="w-full flex justify-center mt-3 ">
                      <Button
                        type="solid"
                        size="large"
                        htmlType="submit"
                        className="px-2 w-full text-white bg-playground"
                      >
                        Verify Email
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
