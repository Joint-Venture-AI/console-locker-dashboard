import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Setting = () => {
  const cards = [
    { id: 1, text: "Personal Information", icon: <FaAngleRight color="black" />, link: "/profile" },
    { id: 2, text: "Change Password", icon: <FaAngleRight color="black" />, link: "/change-password" },
    { id: 3, text: "Terms & Condition", icon: <FaAngleRight color="black" />, link: "/notifications" },
    { id: 4, text: "Privacy Policy", icon: <FaAngleRight color="black" />, link: "/analytics" },
    { id: 5, text: "Privacy Policy", icon: <FaAngleRight color="black" />, link: "/messages" },
  ];
  return (
    <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 ">
      <h3 className="text-2xl text-black mb-4 pl-5 border-b border-lightGray pb-3">Settings</h3>

      <div className="space-y-4 container mx-auto max-w-7xl pt-4 pb-32">
        {cards.map((card) => (
          <Link
            to={card.link}
            key={card.id}
            className="flex justify-between items-center p-4 border border-lightGray bg-lightGray/10 rounded-lg"
          >
            <span className="text-lg font-medium text-gray-800">{card.text}</span>
            <div className="text-gray-500 text-2xl">{card.icon}</div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Setting
