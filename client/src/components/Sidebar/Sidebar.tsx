import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import controlImage from "../../assets/control.png";
import logoImage from "../../assets/logo.png";
import { logout } from "../../redux/Actions/authActions";
import {
  FaUsers,
  FaHome,
  FaRegStar,
  FaFileInvoiceDollar,
  FaDoorOpen,
  FaHandHoldingUsd,
  FaAddressCard,
  FaClipboardList,
  FaMoneyBillAlt,
  FaUserCog,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const user = useAppSelector((state) => state.auth.userInfo);
  let creator = user?.name;
  console.log(creator);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleLogout = () => {
    if (user && user?._id) {
      dispatch(logout(user?._id));
      setTimeout;
      setTimeout(() => {
        navigate("/");
      }, 1000); // Redirigir después de 2 segundos (2000 milisegundos)
    }
  };

  const Menu = [
    {
      name: "Panel",
      link: "/home",
      icon: FaHome,
      rol: ["user", "develop", "partner", "admin"],
    },
    {
      name: "Partners",
      link: "/Partner",
      icon: FaUsers,
      rol: ["user", "develop", "admin", "partner"],
    },
    {
      name: "Payment",
      link: "/payment",
      icon: FaFileInvoiceDollar,
      rol: ["user", "develop", "admin", "partner"],
    },
    {
      name: "Promotion",
      link: "/promotions",
      icon: FaRegStar,
      rol: ["user", "develop", "admin", "partner"],
    },
    {
      name: "Income",
      link: "/Income",
      icon: FaDoorOpen,
      rol: ["user", "develop", "admin", "partner"],
    },
    {
      name: "User",
      link: "/user",
      icon: FaAddressCard,
      margin: true,
      rol: ["develop", "admin"],
    },
    {
      name: "Baleance",
      link: "/balance",
      icon: FaHandHoldingUsd,
      rol: ["develop", "admin"],
    },
    {
      name: "Movements",
      link: "/movements",
      icon: FaClipboardList,
      margin: true,
      rol: "admin",
    },
    {
      name: "MonthlyPayment",
      link: "/monthlyPayment",
      icon: FaMoneyBillAlt,
      rol: "admin",
    },
    { name: "Roles", link: "/roles", icon: FaUserCog, rol: "admin" },
  ];

  return (
    <div className="flex border-r-2 border-gray-600">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } duration-300 p-5 pt-5 bg-gray-800 relative`}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer -right-3 top-7 w-7 border-2 border-silver rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src={logoImage} className={`duration-500`} />

          <h1
            className={`text-white font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {creator}
          </h1>
          <button
            className={`text-white font-medium text-sm duration-200 ${
              !open && "scale-0"
            }`}
            onClick={handleLogout}
          >
            <FiLogOut className="" size="20" />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {Menu?.map((menu, i) =>
            user?.rol && menu.rol.includes(user.rol) ? (
              <Link
                to={menu?.link}
                key={i}
                className={`${menu?.margin && "mt-5"} ${
                  pathname === menu?.link ? "bg-gray-600" : ""
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md text-white`}
              >
                <div>{React.createElement(menu?.icon, { size: "22.5" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } z-10 absolute left-48 bg-gray-800 font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
