import React, { useState } from "react";
// import { useAuth } from "../../../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
// import axios from "axios";
// import { AuthResponseError } from "../../../utils/types";

export const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const auth = useAuth();

  // console.log(auth);

  const redirect = useNavigate();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`/user/login`, {
  //       email,
  //       password,
  //     });
  //     if (response) {
  //       console.log("User logged in successfully");
  //       const json = response.data;
  //       auth.saveUser(json);
  //       console.log(json.user, "holaaaaaaaaaaa");
  //       console.log(json.accessToken);
  //       if (json.accessToken && json.refreshToken) {
  //         redirect("/home");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Something went wrong:", error);
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         console.log("Server response:", error.response.data);
  //         const { data } = error.response;
  //         if (data && data.error) {
  //           setError(data.error);
  //         } else {
  //           setError("An unexpected error occurred.");
  //         }
  //       } else {
  //         setError("Network error occurred.");
  //       }
  //     } else {
  //       setError("An unexpected error occurred.");
  //     }
  //   }
  // };

  // if (auth.isAuthenticated) {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div className="justify-center h-screen flex items-center">
      <form
        className="bg-neutral-950 px-8 py-10 w-1/3 rounded-xl border-t-4 border-red-400"
        // onSubmit={handleSubmit}
      >
        <h1 className="sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl text-center text-slate-300 font-bold mb-7 transition-all duration-300">
          Login
        </h1>
        {!!error && <div className="text-slate-100 errorMessage">{error}</div>}

        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="bg-zinc-100 px-4 py-2 block mb-2 w-full"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-100 px-4 py-2 block mb-2 w-full"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Login
        </button>
      </form>
    </div>
  );
};
