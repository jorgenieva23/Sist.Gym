import React from "react";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="flex justify-between items-center py-3 w-full bg-silver border-gray-400 text-gray-600">
      <p className="text-gray-400 font-bold px-8">
        Sist. GYM | Desarrollado por{" "}
        <a
          className="text-blue-900 hover:text-blue-700"
          href="https://www.linkedin.com/in/jorge-nieva/"
        >
          Jorge Nieva
        </a>
      </p>

      <p className="px-8 text-gray-400 font-bold hidden lg:block">V.1.0.0</p>
    </footer>
  );
};

export default Footer;
