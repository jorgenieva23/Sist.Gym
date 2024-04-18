import { FC } from "react";
import { VscServerProcess } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

interface EnConstruccionProps {
  showVolver: boolean;
  mt?: string;
  my?: string;
  mb?: string;
}

export const EnConstruccion: FC<EnConstruccionProps> = ({
  showVolver,
  mt,
  my,
  mb,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "flex flex-col items-center justify-center h-full text-black" +
        (!!mt ? " mt-" + mt : "") +
        (!!my ? " my-" + my : "") +
        (!!mb ? " mb-" + mb : "")
      }
    >
      <VscServerProcess size={100} />
      <h1 className="text-3xl md:text-4xl">Sección en construcción</h1>
      <span className="text-xl">Estamos trabajando para usted</span>
      {showVolver && (
        <button
          className="bg-gradient-to-r from-yellow-500 from-10% via-orange-500 via-50% to-amber-500 px-4 py-2 rounded-md mt-4"
          onClick={() => {
            navigate("/home");
          }}
        >
          Volver
        </button>
      )}
    </div>
  );
};
