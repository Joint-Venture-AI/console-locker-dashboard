import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Button } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import profileImage from "../../assets/images/dash-profile.png";

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  return (
   
    <div className="w-full h-[88px] flex justify-between items-center rounded-2xl py-[16px] px-[32px]  bg-playground shadow-sm">
      <div className="text-start space-y-0.5">
        <p className="text-[24px] font-semibold text-white">
          {"Welcome,RJ"}
        </p>
        <p className="text-primary">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "#ff181f" }} count={1}>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className={`text-[#ffadff] border-2 border-primary hover:text-[#1f8d2e] bg-[#ffffff] w-[48px] h-[48px] rounded-full p-2 shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <img src={profileImage} alt="" className="rounded-full h-[48px] w-[48px]" />
          </div>
          <div className="space-y-0.5 text-right">
            {/* <h5 className="text-[16px] text-primary font-medium">{"RJ"}</h5> */}
            <p className="text-[16px] text-primary">{"Admin"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
