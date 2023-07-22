import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import controlImage from "../../assets/control.png";
import logoImage from "../../assets/logo.png";
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

const Sidebar: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpen(windowWidth >= 768);
  }, [windowWidth]);

  const Menu = [
    { name: "Panel", link: "/", icon: FaHome },
    // {name: "Partners", link: "/Partner", icon: FaAddressCard},
    { name: "Partners", link: "/Partner", icon: FaUsers },
    { name: "Payment", link: "/payment", icon: FaFileInvoiceDollar },
    { name: "Promotion", link: "/promotions", icon: FaRegStar },
    { name: "Income", link: "/Income", icon: FaDoorOpen },
    { name: "User", link: "/user", icon: FaAddressCard, margin: true },
    { name: "Baleance", link: "/balance", icon: FaHandHoldingUsd },
    { name: "Movements",link: "/movements",icon: FaClipboardList,margin: true, },
    { name: "MonthlyPayment", link: "/monthlyPayment", icon: FaMoneyBillAlt },
    { name: "Roles", link: "/roles", icon: FaUserCog },
  ];
  return (
    <div className="flex h-screen">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } duration-300 p-5 pt-8 bg-dark-purple flex-1 relative`}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src={logoImage} className={`cursor-pointer duration-500`} />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {Menu?.map((Menu, i) => (
            <Link
              to={Menu?.link}
              key={i}
              className={`${
                Menu?.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-white`}
            >
              <div>{React.createElement(Menu?.icon, { size: "20" })}</div>
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
                } absolute left-48 bg-dark-purple font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit  `}
              >
                {Menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
