import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { userLogin } from "../../../redux/Actions/authActions";
import { PiEyeSlash, PiEye, PiPasswordBold, PiEnvelope } from "react-icons/pi";

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
    <div className="justify-center h-screen flex items-center">
      <form
        className="flex flex-col gap-4 bg-gray-900 px-8 py-10 w-1/4 rounded-xl border-t-4 border-red-400"
        onSubmit={handleSubmit}
      >
        <h1 className="sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl text-center text-slate-300 font-bold mb-7 transition-all duration-300">
          Login
        </h1>
        {!!error && <div className="text-slate-100 errorMessage">{error}</div>}

        <div className="relative ">
          <PiEnvelope className="absolute text-xl left-2 top-1/2 -translate-y-1/2 tex-gray-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mt-4">
          <PiPasswordBold className="absolute text-xl left-2 top-1/2 -translate-y-1/2 tex-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border  border-gray-200 outline-none py-2 px-8 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button className="bg-blue-500 text-white justify-center w-1/2 mt-6 py-2 px-6 rounded-lg items-center mx-auto">
          Login
        </button>
      </form>
    </div>
  );
};
