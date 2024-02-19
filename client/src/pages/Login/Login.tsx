import React from "react";

export const Login: React.FC = (): JSX.Element => {
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form className="bg-neutral-950 px-8 py-10 w-3/12">
        <h1 className="text-4xl font-bold mb-7">Signin</h1>

        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="email"
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Signup
        </button>
      </form>
    </div>
  );
};
