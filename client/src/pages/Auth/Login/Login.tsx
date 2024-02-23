import React, { useState } from "react";
import { useAuth } from "../../../components/AuthProvider/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthResponseError } from "../../../utils/types";

export const Login: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/user/login`, {
        userName,
        userPassword,
      });
      console.log(response);
      console.log("user created successfully");
      setError("");
      redirect("/");
    } catch (error: any) {
      console.log("something went wrong");
      console.log(error);
      if (error.response && error.response.data) {
        const json = error.response.data as AuthResponseError;
        setError(json.error);
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  if (auth.isAuthenticate) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="justify-center h-screen flex items-center">
      <form
        className="bg-neutral-950 px-8 py-10 w-1/3 rounded-xl border-t-4 border-red-400"
        onSubmit={handleSubmit}
      >
        <h1 className="sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl text-center text-slate-300 font-bold mb-7 transition-all duration-300">
          Login
        </h1>
        {!!error && <div className="errorMessage">{error}</div>}

        <label className="text-slate-300">UserName:</label>
        <input
          type="userName"
          placeholder="UserName"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Signup
        </button>
      </form>
    </div>
  );
};
