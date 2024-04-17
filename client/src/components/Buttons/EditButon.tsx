import { FC, useState } from "react";
import { PiNotePencil } from "react-icons/pi";
import Modal from "../Modal/Modal";

interface EditButtonProps {
  item: string | undefined;
  FormComponent: any;
}

const EditButton: FC<EditButtonProps> = ({ item, FormComponent }) => {
  const [editingPart, setEditingPart] = useState<string | null | undefined>(
    null
  );
  return (
    <>
      <button
        onClick={() => setEditingPart(item)}
        className="bg-blue-500 px-1 hover:bg-blue-800 text-white font-bolt rounded"
      >
        <PiNotePencil size="30" />
      </button>
      {editingPart === item && (
        <Modal open={editingPart !== null} onClose={() => setEditingPart(null)}>
          <div className="flex flex-col gap-4">
            <FormComponent
              itemToEdit={item}
              setEditingItem={() => setEditingPart(null)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditButton;
