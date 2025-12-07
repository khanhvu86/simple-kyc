import { X } from 'lucide-react';
import Button from '../button';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isPending = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 10000 }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      ></div>

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md z-50 pt-6 pb-6">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="pl-5 mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Submission Action
          </h2>
        </div>

        <div className="text-gray-500 mb-5 text-md border-t border-b border-gray-200 p-5 ">
          {message}
        </div>

        <div className="flex justify-end gap-3 pr-5">
          <Button
            handleClick={onConfirm}
            isLoading={isPending}
            disabled={isPending}
          >
            Yes, I'm sure
          </Button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition cursor-pointer font-medium"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
