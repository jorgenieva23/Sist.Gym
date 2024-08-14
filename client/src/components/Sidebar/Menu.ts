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

export const Menu = [
  {
    name: "Panel",
    link: "/home",
    icon: FaHome,
    permission: "index_panel",
  },
  {
    name: "Socios",
    link: "/Partner",
    icon: FaUsers,
    permission: "indeSocio",
  },
  {
    name: "Pagos",
    link: "/payment",
    icon: FaFileInvoiceDollar,
    permission: "indexCuota",
  },
  {
    name: "Promociones",
    link: "/promotions",
    icon: FaRegStar,
    permission: "indexPromocion",
  },
  {
    name: "Ingresos",
    link: "/Income",
    icon: FaDoorOpen,
    permission: "indexIngresos",
  },
  {
    name: "Usuarios",
    link: "/user",
    icon: FaAddressCard,
    margin: true,
    permission: "indexUsuario",
  },
  {
    name: "Balance",
    link: "/balance",
    icon: FaHandHoldingUsd,
    permission: "indexBalande",
  },
  {
    name: "Movimientos",
    link: "/movements",
    icon: FaClipboardList,
    margin: true,
    permission: "indexMovimiento",
  },
  {
    name: "Mensualidad",
    link: "/monthlyPayment",
    icon: FaMoneyBillAlt,
    permission: "indexMensualidad",
  },
  { name: "Roles", link: "/roles", icon: FaUserCog, permission: "indexRol" },
];
