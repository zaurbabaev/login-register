import { useEffect } from "react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: {
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-400",
      iconBg: "bg-emerald-400",
      progressBar: "bg-emerald-400",
      textColor: "text-emerald-800",
      icon: "✓",
    },
    error: {
      bgColor: "bg-rose-50",
      borderColor: "border-rose-400",
      iconBg: "bg-rose-400",
      progressBar: "bg-rose-400",
      textColor: "text-rose-800",
      icon: "✕",
    },
  };

  const style = config[type];

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div
        className={`${style.bgColor} ${style.textColor} rounded-xl shadow-2xl overflow-hidden min-w-[340px] border-l-4 ${style.borderColor}`}>
        <div className="flex items-center gap-4 p-4">
          <div
            className={`${style.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
            {style.icon}
          </div>
          <p className="font-semibold flex-1">{message}</p>
          <button
            onClick={onClose}
            className={`${style.textColor} hover:bg-black/5 rounded-lg p-1.5 transition`}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Progress bar - 3 saniyədə 100%-dən 0%-ə gedir */}
        <div className={`${style.progressBar} h-1.5 animate-progress`}></div>
      </div>
    </div>
  );
}
