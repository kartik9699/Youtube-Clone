import { useEffect } from 'react';
import { FiX, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

/**
 * A lightweight toast notification component.
 *
 * Props:
 *  - message: the text to display
 *  - type   : "error" | "success" (defaults to "error")
 *  - onClose: called when the toast should be dismissed
 */
function Toast({ message, type = 'error', onClose }) {
  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type !== 'success';

  return (
    <div className="fixed top-20 right-4 z-[100] animate-toast-in">
      <div
        className={`flex items-start gap-3 max-w-sm w-full px-4 py-3 rounded-lg shadow-lg border text-sm ${
          isError
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-green-50 border-green-200 text-green-800'
        }`}
        role="alert"
      >
        <span className="mt-0.5 shrink-0">
          {isError ? <FiAlertCircle size={18} /> : <FiCheckCircle size={18} />}
        </span>
        <p className="flex-1 leading-snug break-words">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Dismiss"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
