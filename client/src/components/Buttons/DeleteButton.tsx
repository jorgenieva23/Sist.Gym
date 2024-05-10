import React, { useState } from "react";
import { PiTrash } from "react-icons/pi";
import Modal from "../Modal/Modal";

interface DeleteButtonProps {
  onDelete: () => void;
  userRole: any;
  requiredPermission: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  userRole,
  requiredPermission,
}) => {
  const [showModal, setShowModal] = useState(false);

  const isDisabled =
    !userRole || !userRole.permissions.includes(requiredPermission);

  const handleDelete = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={() => setShowModal(true)}
        className={`${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-red-500 px-1 rounded font-bold"
            : "bg-red-500 px-1 hover:bg-red-800 text-white font-bold rounded"
        }`}
      >
        <PiTrash size="30" />
      </button>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col gap-4">
          <p>¿Estás seguro de que quieres borrar este socio?</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-500 px-4 py-2 text-white font-semibold rounded"
              onClick={handleDelete}
            >
              Borrar
            </button>
            <button
              className="bg-gray-200 px-4 py-2 text-gray-800 font-semibold rounded"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
