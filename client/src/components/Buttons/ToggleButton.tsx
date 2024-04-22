import { FC } from "react";
import {
  AiOutlineCheckCircle as ReactivateIcon,
  AiOutlineCloseCircle as SuspendIcon,
} from "react-icons/ai";

interface ToggleButtonProps {
  partId: string | undefined;
  isDeleted: boolean | null | undefined;
  toggleDeleted: (id: string) => Promise<void>;
  userRole: any;
  requiredPermission: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  partId,
  isDeleted,
  toggleDeleted,
  userRole,
  requiredPermission,
}) => {
  const isDisabled =
    !requiredPermission ||
    !userRole ||
    !userRole.permissions.includes(requiredPermission);

  return (
    <button
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled && partId) {
          toggleDeleted(partId);
        }
      }}
      className={`px-1 text-white font-bold rounded ${
        isDeleted
          ? isDisabled
            ? "bg-green-500 opacity-50"
            : "bg-green-500 hover:bg-green-800"
          : isDisabled
          ? "bg-yellow-500 opacity-50"
          : "bg-yellow-500 hover:bg-yellow-800"
      }`}
    >
      {isDeleted ? <ReactivateIcon size="30" /> : <SuspendIcon size="30" />}
    </button>
  );
};

export default ToggleButton;
