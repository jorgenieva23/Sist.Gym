import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const user = useAppSelector((state) => state.auth.userInfo);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user && user[0]?._id) {
      dispatch(logout(user[0]?._id));
      setTimeout;
      setTimeout(() => {
        navigate("/");
      }, 1000); // Redirigir después de 2 segundos (2000 milisegundos)
    }
  };

  const Menu = [
    { name: "Panel", link: "/home", icon: FaHome },
    { name: "Partners", link: "/Partner", icon: FaUsers },
    { name: "Payment", link: "/payment", icon: FaFileInvoiceDollar },
    { name: "Promotion", link: "/promotions", icon: FaRegStar },
    { name: "Income", link: "/Income", icon: FaDoorOpen },
    { name: "User", link: "/user", icon: FaAddressCard, margin: true },
    { name: "Baleance", link: "/balance", icon: FaHandHoldingUsd },
    {
      name: "Movements",
      link: "/movements",
      icon: FaClipboardList,
      margin: true,
    },
    { name: "MonthlyPayment", link: "/monthlyPayment", icon: FaMoneyBillAlt },
    { name: "Roles", link: "/roles", icon: FaUserCog },
  ];

  // async function handleSignOut(e: MouseEvent) {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`/user/logout/:id`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${auth.getRefreshToken()}`,
  //       },
  //     });
  //     if (response.ok) {
  //       auth.signout();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } z-10 duration-300 p-5 pt-5 py-10 bg-gray-800 relative`}
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
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {user[0]?.name}
          </h1>
        </div>
        <button
          className="text-white text-sm mt-2 hover:underline cursor-pointer"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <div className="mt-10 flex flex-col gap-4 relative">
          {Menu?.map(
            (Menu, i) => (
              // (Menu.rol === "User" && (isUser || isDevelop || isAdmin)) ||
              // (Menu.rol === "Develop" && (isDevelop || isAdmin)) ||
              // (Menu.rol === "Admin" && isAdmin) ?
              <Link
                to={Menu?.link}
                key={i}
                className={`${
                  Menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md text-white`}
              >
                <div>{React.createElement(Menu?.icon, { size: "22.5" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {Menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-gray-800 font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {Menu?.name}
                </h2>
              </Link>
            )
            // : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
