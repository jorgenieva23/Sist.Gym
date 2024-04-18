import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { userLogin } from "../../../redux/Actions/authActions";
import { PiEyeSlash, PiEye, PiPasswordBold, PiEnvelope } from "react-icons/pi";
// import backgroundImage from "../../../assets/trueno2.png";

export const Login: React.FC = (): JSX.Element => {
  const { userInfo, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated && userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/home");
    }
  }, [isAuthenticated, userInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(userLogin({ email, password }));
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="justify-center h-screen flex items-center bg-gray-200">
      <div
        className="bg-white p-8 rounded-lg md:w-96"
        // style={{
        //   backgroundImage: `url(${backgroundImage})`,
        // }}
      >
        <div className="mb-5">
          <h1 className="sm:text-sm md:text-2xl lg:text-4xl xl:text-4xl text-center text-slate-900 font-bold mb-7 transition-all duration-300">
            Iniciar sesion
          </h1>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!!error && (
            <div className="text-slate-100 errorMessage">{error}</div>
          )}

          <div className="flex flex-col mt-2">
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiEnvelope className="w-7 h-7 text-black" />
              </span>
              <input
                type="email"
                placeholder="Email"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="relative mt-2">
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiPasswordBold className="w-7 h-7 text-black" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <PiEye
                  onClick={handleShowPassword}
                  className="absolute right-2 text-xl top-5 -translate-y-1/2 text-gray-800 cursor-pointer"
                />
              ) : (
                <PiEyeSlash
                  onClick={handleShowPassword}
                  className="absolute right-2 text-xl top-5 -translate-y-1/2 text-gray-800 cursor-pointer"
                />
              )}
            </div>
            <div className="text-right">
              <Link
                to="/signup"
                className="font-bold text-sky-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?{" "}
              </Link>
            </div>
          </div>

          <div>
            <button className="mt-2 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          ¿No tenes una cuenta?{" "}
          <Link to="signup" className="text-sky-600 font-bold hover:underline">
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
};
