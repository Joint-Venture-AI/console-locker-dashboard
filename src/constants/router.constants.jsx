import { CiSettings, CiUser } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Guests from "../pages/Main/Users/Users";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import AboutUs from "../pages/Settings/AboutUs";
import Notifications from "../pages/Main/Notifications/Notifications";
import { FaUser } from "react-icons/fa";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import HostDetails from "../pages/Main/Host/HostDetails";
import {  LuWallet } from "react-icons/lu";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import { PiHandWithdrawBold } from "react-icons/pi";
import StudioPost from "../pages/Main/ApproveRequest/StudioPost";
import TrainerPost from "../pages/Main/ApproveRequest/TrainerPost";
import Review from "../pages/Main/Users/Review";
import StudioList from "../pages/Main/StudioList/StudioList";
import TrainerList from "../pages/Main/TrainerList/TrainerList";
import Earnings from "../pages/Main/Earnings/Earnings";
import Driver from "../pages/Main/Driver/Driver";
import DriverRequest from "../pages/Main/DriverRequest/DriverRequest";
import Setting from "../pages/Main/Setting/Setting";
import Support from "../pages/Main/Support/Support";
import earningImg from "../assets/images/earnings.png";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    name: "User",
    path: "users",
    icon: FaUser,
    element: <Guests />,
  },
  {
    name: "Approve Request",
    rootPath: "approveRequest",
    icon: GrMoney,
    children: [
      {
        name: "Studio Post",
        path: "approveRequest/all-earnings",
        icon: LuWallet,
        element: <StudioPost />,
      },
      {
        name: "Trainer Post",
        path: "approveRequest/withdraw",
        icon: PiHandWithdrawBold,
        element: <TrainerPost />,
      },
    ],
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    path: '/reviews',
    element: <Review></Review>
  },
  
  {
    name: "Earning",
    path: "earnings",
    icon: () => <img src={earningImg} alt="Earnings" style={{ width: "20px", height: "20px" }} className="bg-white" />,
    element: <Earnings />,
  },
  {
    name: "Driver",
    path: "driver",
    icon: MdOutlineAdminPanelSettings,
    element: <Driver />,
  },
  {
    name: "Driver Request",
    path: "driver-request",
    icon: MdOutlineAdminPanelSettings,
    element: <DriverRequest />,
  },
  {
    name: "Support",
    path: "support",
    icon: MdOutlineAdminPanelSettings,
    element: <Support />,
  },
  {
    name: "Setting",
    path: "setting",
    icon: MdOutlineAdminPanelSettings,
    element: <Setting />,
  },
  {
    path: "/hosts/:id",
    element: <HostDetails />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Profile",
        path: "settings/prifile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/prifile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "Terms & Services",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
      {
        name: "About Us",
        icon: BiMessageSquareDetail,
        path: "settings/about-us",
        element: <AboutUs />,
      },
      {
        path: "settings/about-us/edit",
        element: <EditAboutUs />,
      },
    ],
  },
];
