import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  // "#",
  "Socio",
  "Fecha de ingreso",
  "Estado",
  "Opciones",
];

function PaymentTable() {
  return (
    <div className="relative overflow-x-autosm:rounded-lg">
      <table className="w-full text-sm shadow-md text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border border-slate-300 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default PaymentTable;
