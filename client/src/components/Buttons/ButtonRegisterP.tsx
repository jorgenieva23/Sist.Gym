// Nuevo componente ButtonWithModal.tsx
import React, { useState, FC } from "react";
import ReactDOM from "react-dom";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal/Modal";

interface ButtonRegisterProps {
  FormComponent: FC;
  buttonText: string;
  disabled: any;
}

const ButtonRegister: React.FC<ButtonRegisterProps> = ({
  FormComponent,
  buttonText,
  disabled,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <button
        disabled={disabled}
        className={`${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }border border-neutral-300 rounded-lg py-2 px-2 bg-green-500 text-white flex items-center`}
        onClick={() => setOpenModal(true)}
      >
        <FaPlus className="mr-2" />
        {buttonText}
      </button>
      {openModal &&
        ReactDOM.createPortal(
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div className="flex flex-col gap-4 mr-4">
              <FormComponent />
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ButtonRegister;
