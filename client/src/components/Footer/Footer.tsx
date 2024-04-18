import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between items-center py-3 w-full bg-gray-600 border-gray-400 text-gray-600">
      <p className="text-gray-200 font-bold px-8">
        Sist. GYM | Desarrollado por{" "}
        <a
          className="text-orange-500"
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
