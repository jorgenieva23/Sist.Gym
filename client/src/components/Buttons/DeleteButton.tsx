import { FC } from "react";
import { PiTrash } from "react-icons/pi";
import { toast } from "sonner";

interface DeleteButtonProps {
  onDelete: () => void;
  confirmationMessage: string;
  userRole: any;
  requiredPermission: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  onDelete,
  confirmationMessage,
  userRole,
  requiredPermission,
}) => {
  const isDisabled =
    !userRole || !userRole.permissions.includes(requiredPermission);

  return (
    <button
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          toast.info(confirmationMessage, {
            action: {
              label: "Borrar",
              onClick: onDelete,
            },
          });
        }
      }}
      className={`${
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-red-500 px-1 rounded font-bold"
          : "bg-red-500 px-1 hover:bg-red-800 text-white font-bold rounded"
      }`}
    >
      <PiTrash size="30" />
    </button>
  );
};

export default DeleteButton;
