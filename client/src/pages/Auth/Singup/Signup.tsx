import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { registerUser } from "../../../redux/Actions/authActions";
import { IUser } from "../../../utils/types";
import { toast, Toaster } from "sonner";
import { ClipLoader } from "react-spinners";
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

  const users = useAppSelector((state) => state.user.users);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    stateId: "active",
    creatorId: "jorge_4755@hotmail.com",
    rol: "admin",
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    uppercase: false,
    number: false,
  });

  const validate = (user: IUser): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};

    if (!user.name) {
      errors.name = "El socio debe tener un nombre";
    } else if (user.name.length < 1 || user.name.length > 25) {
      errors.name = "Nombre inválido";
    }

    if (!user.email) {
      errors.email = "El socio debe tener un correo electrónico";
    } else {
      const existingPartner = users.find(
        (e) => e.email.toLowerCase() === user.email.toLowerCase()
      );
      if (existingPartner) {
        errors.email = `El socio con el correo ${user.email} ya existe.`;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
          errors.email = "Formato de correo electrónico inválido";
        }
      }
    }
    if (!user.password) {
      errors.email = "El socio debe tener una contraseña";
    }
    return errors;
  };

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      minLength: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  };

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
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
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

    const errors = validate(user);
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors);
      errorMessages.forEach((errorMessage) => toast.error(errorMessage));
      setLoadingSubmit(false);
      return;
    }

    try {
      dispatch(registerUser(user)).then(() => {
        if (Object.keys(errors).length > 0) {
          toast.error(error);
        } else {
          navigate("/");
          setIsAuthenticated(true);
        }
      });
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="justify-center h-screen flex items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg w-full md:w-96">
        <div className="mb-5">
          <div className="sm:text-sm md:text-2xl lg:text-4xl xl:text-4xl text-center text-slate-900 font-bold transition-all duration-300">
            Registrate
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {errors.name && toast.info(errors.name)}
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
            {errors.email && toast.info(errors.email)}
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
                value={user.password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                onChange={(e) => handleChange(e)}
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
            {errors.password && toast.info(errors.password)}
          </div>

          <ol className="mt-2 text-sm">
            <li className="mb-1 text-gray-600">
              Debe tener al menos{" "}
              <span
                className={` ${
                  passwordCriteria.minLength ? "text-green-600" : "text-red-600"
                }`}
              >
                6 caracteres
              </span>
              .
            </li>
            <li className="mb-1 text-gray-600">
              Debe contener al menos{" "}
              <span
                className={`${
                  passwordCriteria.uppercase ? "text-green-600" : "text-red-600"
                }`}
              >
                una mayúscula
              </span>
              .
            </li>
            <li className="mb-1 text-gray-600">
              Debe incluir al menos{" "}
              <span
                className={`${
                  passwordCriteria.number ? "text-green-600" : "text-red-600"
                }`}
              >
                un número
              </span>
              .
            </li>
          </ol>
          <div>
            {!loadingSubmit ? (
              <button
                className="mt-2 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"
                type="submit"
              >
                Registrarte
              </button>
            ) : (
              <button
                className="mt-5 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"
                type="submit"
              >
                <ClipLoader className="block mx-auto mt-1" size={20} />
              </button>
            )}
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {success && <p>Registration successful!</p>}
        <div className="text-center mt-2">
          ¿ya tenes cuenta?{" "}
          <Link to="/" className="font-bold text-sky-500 hover:underline">
            Ingresa
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
