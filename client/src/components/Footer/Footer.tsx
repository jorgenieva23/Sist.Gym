import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between items-center py-3 w-full bg-zinc-700 border-gray-400 text-gray-600">
      <p className="text-gray-200 font-bold px-8">
        Sist. GYM | Desarrollado por{" "}
        <a
          className="bg-gradient-to-r from-yellow-500 from-10% via-orange-500 via-70% to-amber-500 bg-clip-text text-transparent"
          href="https://www.linkedin.com/in/jorge-nieva/"
        >
          Jorge Nieva
        </a>
      </p>

      <p className="px-8 text-gray-200 font-bold lg:block">V.1.0.0</p>
    </footer>
  );
};

export default Footer;
