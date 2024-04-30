import React, { useState, useEffect } from "react";
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
import { useRolesAction } from "../../redux/Actions/rolesAction";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Sidebar = () => {
  const { getAllRoles } = useRolesAction();
  const { pathname } = useLocation();

  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);
  const userRole = roles.find((role) => role.name === user.rol);
  let creator = user?.name;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    if (user && user?._id) {
      dispatch(logout(user?._id));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const Menu = [
    {
      name: "Panel",
      link: "/home",
      icon: FaHome,
      permission: "index_panel",
    },
    {
      name: "Partners",
      link: "/Partner",
      icon: FaUsers,
      permission: "indeSocio",
    },
    {
      name: "Payment",
      link: "/payment",
      icon: FaFileInvoiceDollar,
      permission: "indexCuota",
    },
    {
      name: "Promotion",
      link: "/promotions",
      icon: FaRegStar,
      permission: "indexPromocion",
    },
    {
      name: "Income",
      link: "/Income",
      icon: FaDoorOpen,
      permission: "indexIngresos",
    },
    {
      name: "User",
      link: "/user",
      icon: FaAddressCard,
      margin: true,
      permission: "indexUsuario",
    },
    {
      name: "Baleance",
      link: "/balance",
      icon: FaHandHoldingUsd,
      permission: "indexBalande",
    },
    {
      name: "Movements",
      link: "/movements",
      icon: FaClipboardList,
      margin: true,
      permission: "indexMovimiento",
    },
    {
      name: "Movimiento",
      link: "/monthlyPayment",
      icon: FaMoneyBillAlt,
      permission: "indexMensualidad",
    },
    { name: "Roles", link: "/roles", icon: FaUserCog, permission: "indexRol" },
  ];

  return (
    <div className="flex border-r-2 border-gray-600">
      <div
        className={`${
          open ? " w-64" : "w-20"
        } duration-300 p-5 pt-5 bg-gray-800 relative`}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer -right-3 top-7 w-7 rounded-full ${
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
          {Menu?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={`${menu?.margin && "mt-5"} ${
                pathname === menu?.link ? "bg-gray-600" : ""
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md text-white ${
                userRole &&
                userRole.permissions &&
                userRole.permissions.includes(menu.permission)
                  ? ""
                  : "opacity-50 cursor-not-allowed pointer-events-none"
              }`}
              onClick={() => {
                if (
                  !(
                    userRole &&
                    userRole.permissions &&
                    userRole.permissions.includes(menu.permission)
                  )
                ) {
                  return false;
                }
              }}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
