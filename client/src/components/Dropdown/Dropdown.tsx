import React from "react";

interface Props {
  // open: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<Props> = ({ children }) => {
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div
        className=""
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
