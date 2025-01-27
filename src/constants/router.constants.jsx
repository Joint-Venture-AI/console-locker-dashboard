import { CiSettings, CiUser } from "react-icons/ci";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";

import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";

import Notifications from "../pages/Main/Notifications/Notifications";
import { FaUser } from "react-icons/fa";
import {
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import HostDetails from "../pages/Main/Host/HostDetails";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
;
import Setting from "../pages/Main/Setting/Setting";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import Trust from "../pages/Settings/Trust";
import EditTrust from "../pages/Settings/EditTrust";
import { TbCash } from "react-icons/tb";
import { PiLaptopThin } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import Products from "../pages/Main/Users/Products";
import BuyProducts from "../pages/Main/Earnings/BuyProducts";
import Blogs from "../pages/Main/Blog/Blogs";
import BlogAdd from "../pages/Main/Blog/BlogAdd";
import Transaction from "../pages/Main/DriverRequest/Transaction";
import Orders from "../pages/Main/Orders/Orders";
import AddProducts from "../pages/Main/AddProducts/AddProducts";
import { CalendarArrowDown, CreditCard, Newspaper, ShoppingBag, TableCellsSplit } from "lucide-react";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    name: "Products",
    path: "products",
    icon: TableCellsSplit ,
    element: <Products />,
  },
  {
    // name: "Products",
    path: "addProducts",
    // icon: FaUser,
    element: <AddProducts />,
  },
  // {
  //   name: "Approve Request",
  //   rootPath: "approveRequest",
  //   icon: GrMoney,
  //   children: [
  //     {
  //       name: "Studio Post",
  //       path: "approveRequest/all-earnings",
  //       icon: LuWallet,
  //       element: <StudioPost />,
  //     },
  //     {
  //       name: "Trainer Post",
  //       path: "approveRequest/withdraw",
  //       icon: PiHandWithdrawBold,
  //       element: <TrainerPost />,
  //     },
  //   ],
  // },
  {
    path: "notifications",
    element: <Notifications />,
  },
  // {
  //   path: '/reviews',
  //   element: <Review></Review>
  // },

  {
    name: "Buy Products",
    path: "buyProducts",
    icon: ShoppingBag ,
    element: <BuyProducts />,
  },
  {
    name: "Blog",
    path: "blog",
    icon: Newspaper,
    element: <Blogs />,
  },
  {
    // name: "addBlog",
    path: "/addBlog",
    // icon: GrUserManager,
    element: <BlogAdd />,
  },
  {
    name: "Transaction History",
    path: "transaction",
    icon: CreditCard ,
    element: <Transaction/>,
  },
  {
    name: "Manage Orders",
    path: "orders",
    icon: CalendarArrowDown,
    element: <Orders />,
  },
  {
    name: "Setting",
    path: "settings",
    icon: IoSettingsOutline,
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
        name: "Personal Information",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "Change Password",
        icon: FaServicestack,
        path: "settings/change-password",
        element: <ChangePassword />,
      },
      {
        path: "settings/change-password/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "settings/change-password/forgot-password/verify-email",
        element: <VerifyEmail />,
      },
      {
        name: "Terms & Condition",
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
        name: "Trust & Safety",
        icon: BiMessageSquareDetail,
        path: "settings/trust-safety",
        element: <Trust />,
      },
      {
        path: "settings/trust-safety/edit",
        element: <EditTrust />,
      },
    ],
  },
];
