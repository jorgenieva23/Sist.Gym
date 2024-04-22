import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";
import FormRoles from "../../components/Forms/Roles/FormRol";
import { RolesTable } from "../../components/Tables/RolTable/RolTable";

export const Roles: React.FC = (): JSX.Element => {
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Roless</div>
            <div className="py-2 my-2 mr-5">
              <ButtonRegister
                FormComponent={FormRoles}
                buttonText="Registrar"
                disabled={
                  !userRole || !userRole.permissions.includes("crearSocio")
                }
              />
            </div>
          </div>

          <div className="m-5">
            <RolesTable currentRoles={roles} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
