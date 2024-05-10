import { FC, useState } from "react";
import { PiNotePencil } from "react-icons/pi";
import Modal from "../Modal/Modal";

interface EditButtonProps {
  item: any;
  FormComponent: any;
  userRole: any;
  requiredPermission: string;
}

const EditButton: FC<EditButtonProps> = ({
  item,
  FormComponent,
  userRole,
  requiredPermission,
}) => {
  const [editingPart, setEditingPart] = useState<string | null | undefined>(
    null
  );

  const isDisabled =
    !userRole || !userRole.permissions.includes(requiredPermission);

  return (
    <>
      <button
        disabled={isDisabled}
        className={`${
          isDisabled
            ? "opacity-50 bg-blue-500 px-1 rounded font-bold"
            : "bg-blue-500 px-1 hover:bg-blue-800 text-white font-bold rounded"
        }`}
        onClick={() => !isDisabled && setEditingPart(item)}
      >
        <PiNotePencil size="30" />
      </button>

      {editingPart === item && (
        <Modal open={editingPart !== null} onClose={() => setEditingPart(null)}>
          <div className="flex flex-col gap-4">
            <FormComponent
              partnerToEdit={item}
              setEditingPartner={() => setEditingPart(null)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditButton;

{
  /* <EditButton
                        item={part?._id}
                        FormComponent={FormPartners}
                        userRole={userRole}
                        requiredPermission="EditarSocio"
                      /> */
}

// {editingPart === part._id && (
//   <Modal
//     open={editingPart !== null}
//     onClose={() => setEditingPart(null)}
//   >
//     <div className="flex flex-col z-10 gap-4">
//       <FormPartners
//         partnerToEdit={part}
//         setEditingPartner={() => setEditingPart(null)}
//       />
//     </div>
//   </Modal>
//   )}
