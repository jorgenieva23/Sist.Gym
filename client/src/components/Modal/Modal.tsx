import React, { useEffect, useState } from "react";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<propTypes> = ({ open, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setIsVisible(true);
      }, 70);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }
  }, [open]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/50" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-7 transition-all max-w ${
          isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-0.5 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-slate-50 hover:text-gray-600"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
