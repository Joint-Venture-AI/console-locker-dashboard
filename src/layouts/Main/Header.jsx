import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Button } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
   
    <div className="w-full h-[88px] flex justify-between items-center rounded-sm py-[16px] px-[32px] shadow-lg bg-white">
      <div className="text-start space-y-0.5">
        <p className="text-[24px] font-light">
          {"Welcome,RJ"}
        </p>
        <p className="">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "#000000", width: '20px', height: '20px', objectFit:'contain' }} count={1}>
            <TbBellRinging 
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <img src={profileImage} alt="" className="rounded-full h-[42px] w-[42px]" />
          </div>
          <div className="space-y-0.5 text-right">
            {/* <h5 className="text-[16px] text-primary font-medium">{"RJ"}</h5> */}
            <p className="text-[14px]">{"Jane Cooper"}</p>
          </div>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
