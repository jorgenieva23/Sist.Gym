import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { registerUser } from "../../../redux/Actions/authActions";
import { IUser } from "../../../utils/types";
import Modal2 from "../../../components/Modal/Modal2";
import { useNavigate, Link } from "react-router-dom";
import {
  PiEyeSlash,
  PiEye,
  PiPassword,
  PiEnvelopeLight,
  PiUserCirclePlusLight,
} from "react-icons/pi";

export const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated && userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/");
    }
  }, [isAuthenticated, userInfo, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo || isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(registerUser(user)).then(() => {
        navigate("/");
        setIsAuthenticated(true);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="justify-center h-screen flex items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg w-full md:w-96">
        <div className="mb-2">
          <div className="sm:text-sm md:text-2xl lg:text-4xl xl:text-4xl text-center text-slate-900 font-bold transition-all duration-300">
            Registrate
            <div className="text-sm text-blue-500" onClick={handleOpenModal}>
              recomendacion
            </div>
            <Modal2 open={isModalOpen} onClose={handleCloseModal}>
              <p className="text-lg">
                Como sugerencia, si estás utilizando la aplicación por primera
                vez, te recomendamos seguir estos pasos:
              </p>

              <ol className="text-lg">
                <li>1) Accede a la cuenta que has creado.</li>
                <li>2) Navega hasta la sección de usuarios.</li>
                <li>3) Crea un perfil con el rol de 'usuario'.</li>
                <li>
                  4) Abre la aplicación en modo incógnito y accede a la cuenta
                  que acabas de crear.
                </li>
              </ol>

              <p className="text-lg">
                Esto te permitirá apreciar las diferencias entre los perfiles de
                'administrador' y 'usuario'. ¡Esperamos que disfrutes explorando
                la aplicación!
              </p>
            </Modal2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!!error && (
            <div className="text-slate-100 errorMessage">{error}</div>
          )}

          <div className="flex flex-col mt-4">
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiUserCirclePlusLight className="w-7 h-7 text-black" />
              </span>
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

          <div className="relative mt-2">
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiEnvelopeLight className="w-7 h-7 text-black" />
              </span>
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

          <div className="relative mt-2">
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiPassword className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(e) => handleChange(e)}
                required
              />
              {showPassword ? (
                <PiEye
                  onClick={handleShowPassword}
                  className="absolute right-2 text-xl top-1/2 -translate-y-1/2 text-gray-800 cursor-pointer"
                />
              ) : (
                <PiEyeSlash
                  onClick={handleShowPassword}
                  className="absolute right-2 text-xl top-1/2 -translate-y-1/2 text-gray-800 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div>
            <button
              className="mt-5 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"
              type="submit"
            >
              Registrarte
            </button>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {success && <p>Registration successful!</p>}
        <div className="text-center mt-2">
          ¿ya tenes cuenta?{" "}
          <Link to="/" className="font-bold text-sky-500 hover:underline">
            Ingresa
          </Link>
        </div>
      </div>
    </div>
  );
};
