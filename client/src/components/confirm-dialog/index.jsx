import { X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-50 animate-fadeInScale">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Confirm Submission Action
        </h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 transition cursor-pointer"
          >
            Yes, I'm sure
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
