import React, { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthResponseError } from "../../../utils/types";

//  ACOMODAR A FUTURO Y DEJARLO COMO LOS DEMAS FORMULARIOS

export const Signup: React.FC = (): JSX.Element => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();

  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/user/signup`, {
        name,
        username,
        password,
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

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="justify-center h-screen flex items-center">
      <form
        className="bg-neutral-950 px-8 py-10 w-1/3 rounded-xl border-t-4 border-red-400"
        onSubmit={handleSubmit}
      >
        <h1 className="sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl text-center text-slate-300 font-bold mb-7 transition-all duration-300">
          Signup
        </h1>
        {!error && <div className="errorMessage">{error}</div>}
        <label className="text-slate-300">Name:</label>
        <input
          type="name"
          placeholder="Name"
          className="bg-zinc-300 px-4 py-2 block mb-2 w-full"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-slate-300">userName:</label>
        <input
          type="userName"
          placeholder="userName"
          className="bg-zinc-300 px-4 py-2 block mb-2 w-full"
          name="setUsername"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-300 px-4 py-2 block mb-2 w-full"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Signup
        </button>
      </form>
    </div>
  );
};
