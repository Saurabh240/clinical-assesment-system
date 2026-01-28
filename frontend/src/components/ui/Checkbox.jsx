import React from "react";

const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label
        className={`flex items-start gap-3 cursor-pointer select-none group ${
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
          className={`w-5 h-5 min-w-[20px] rounded-md border-2 flex items-center justify-center transition-all duration-200 mt-0.5
            ${
              checked
                ? "bg-teal-600 border-teal-600 shadow-sm"
                : error
                ? "bg-white border-red-500"
                : "bg-white border-gray-300 group-hover:border-teal-400"
            }
          `}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div className="flex-1">
          {label && (
            <span className={`text-sm block ${
              error ? "text-red-700" : "text-gray-800"
            }`}>
              {label.replace(/_/g, " ")}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          )}
        </div>
      </label>

      {error && (
        <p className="text-xs text-red-600 ml-8 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;