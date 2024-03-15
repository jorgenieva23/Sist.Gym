import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { registerUser } from "../../../redux/Actions/authActions";
import { IUser } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

export const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state: RootState) => state.auth
  );
  const redirect = useNavigate();

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(user)).then(() => {
      redirect("/");
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold"></h2>
      <form onSubmit={handleSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Nombre
          </label>
          <div className="flex">
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="text"
              name="name"
              value={user.name}
              placeholder="Nombre"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Correo Electrónico
          </label>
          <div className="flex">
            {/* <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiEnvelope className="w-7 h-7 text-black" />
            </span> */}
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="email"
              name="email"
              value={user.email}
              placeholder="Correo Electrónico"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Contraseña
          </label>
          <div className="flex">
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="password"
              id="psw"
              name="psw"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          (
          <button
            className="px-4 py-2 rounded-none rounded-e-lg text-sm font-semibold text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-400"
            type="submit"
          >
            {" Añadir socio"}
          </button>
          )
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Registration successful!</p>}
    </div>
  );
};
