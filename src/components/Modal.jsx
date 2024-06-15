// src/Modal.js
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center  bg-gray-600 bg-opacity-50"
    >
      <div className="w-96 rounded-xl bg-slack-green p-8 shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-black transition-all" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
