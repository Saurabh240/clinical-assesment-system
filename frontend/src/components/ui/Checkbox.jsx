import React from "react";

const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  className = "",
  ...props
}) => {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="hidden"
        {...props}
      />

      {/* Custom checkbox */}
      <div
        className={`w-5 h-5 rounded-md border flex items-center justify-center transition
          ${
            checked
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-gray-300"
          }
        `}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {label && (
        <span className="text-gray-800 text-sm font-medium capitalize">
          {label.replace(/_/g, " ")}
        </span>
      )}

      {error && (
        <span className="text-xs text-red-500 ml-2">
          {error}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
