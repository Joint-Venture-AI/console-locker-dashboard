import { FaAngleLeft } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGetAllNotificationQuery } from "../../../redux/features/notificationSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const { data } = useGetAllNotificationQuery();

  return (
    <div className="rounded-lg min-h-screen bg-[#FDFDFD]">
      <div className="px-[32px] py-6 text-white bg-info rounded-t-lg flex items-center gap-3">
        <FaAngleLeft onClick={() => navigate(-1)} className="text-white" size={34} />
        <h1 className="text-[30px] text-[#052255] font-bold">All Notifications</h1>
      </div>
      <div className="p-[24px]">
        {data?.data?.notifications?.length > 0 ? (
          data.data.notifications.map((notification) => (
            <div
              key={notification._id}
              className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 hover:bg-gray-100 transition-all"
            >
              <IoIosNotificationsOutline
                style={{ cursor: "pointer" }}
                className="border border-white w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-[#B2DAC4] text-info group-hover:bg-[#b3dfc7]"
              />
              <div className="space-y-[2px]">
                <h6 className="text-lg">{notification.subject}</h6>
                <small className="text-[12px] text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications found</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
