import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useUserAction } from "../../redux/Actions/userAction";
import { Footer, Navbar, Sidebar } from "../../components";
import Modal from "../../components/Modal/Modal";
import ReactDOM from "react-dom";
import FormUsers from "../../components/Forms/Users/FormUsers";

export const User: React.FC = (): JSX.Element => {
  const { getAllUser } = useUserAction();
  const users = useAppSelector((state) => state.user.users);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="mt-10 flex-grow">
          <div className="flex border-2 border-t-purple-900 justify-between">
            <div className="text-3xl mt-2 text-blue-600 border-t-purple-900 ml-7">
              Usuarios
            </div>
            <button
              className="border border-neutral-300 rounded-lg py-2 px-5 my-2 mr-6 bg-green-500 hover:bg-green-700 text-white"
              onClick={() => setOpenModal(true)}
            >
              Registro
            </button>
          </div>
          {openModal &&
            ReactDOM.createPortal(
              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="flex flex-col gap-4">
                  <FormUsers />
                </div>
              </Modal>,
              document.body
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
