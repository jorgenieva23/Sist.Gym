import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import Modal from "../../components/Modal/Modal";
import FormRoles from "../../components/Forms/Roles/FormRol";
import { RolesTable } from "../../components/Tables/RolTable/RolTable";

export const Roles: React.FC = (): JSX.Element => {
  const roles = useAppSelector((state) => state.roles.roles);

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200 ">
        <Sidebar />
        <div className="mt-8 m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700 ml-7">Roless</div>
            <button
              className="border border-neutral-300 rounded-lg py-2 px-5 my-2 mr-6 bg-green-500 hover:bg-green-700 text-white"
              onClick={() => setOpenModal(true)}
            >
              Registers
            </button>
          </div>
          {openModal && (
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <div className="flex flex-col gap-4">
                <FormRoles />
              </div>
            </Modal>
          )}
          <div className="m-5">
            <RolesTable currentRoles={roles} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
