// Nuevo componente ButtonWithModal.tsx
import React, { useState, FC } from "react";
import ReactDOM from "react-dom";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal/Modal";

interface ButtonRegisterProps {
  FormComponent: FC;
  buttonText: string;
}

const ButtonRegister: React.FC<ButtonRegisterProps> = ({
  FormComponent,
  buttonText,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <button
        className="border border-neutral-300 rounded-lg py-2 px-5 mr-6 bg-gradient-to-r from-yellow-500 from-10% via-orange-500 via-50% to-amber-500  text-white flex items-center"
        onClick={() => setOpenModal(true)}
      >
        <FaPlus className="mr-2" />
        {buttonText}
      </button>
      {openModal &&
        ReactDOM.createPortal(
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div className="flex flex-col gap-4">
              <FormComponent />
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ButtonRegister;
