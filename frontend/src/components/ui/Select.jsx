

import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
  disabled = false,
  required = false,
  className = "",
  helperText,
  icon,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`w-full relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* SELECT BOX */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center justify-between rounded-lg border px-4 py-3
          transition-all duration-200
          ${error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          }
          ${disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "hover:border-teal-400"
          }
        `}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span
            className={`${
              selectedOption ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {selectedOption?.label || placeholder}
          </span>
        </div>

        {/* ARROW */}
        <svg
          className={`w-5 h-5 transition-transform ${
            open ? "rotate-180" : ""
          } text-teal-600`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* DROPDOWN */}
      {open && !disabled && (
        <ul
          className="
            absolute z-50 mt-2 w-full rounded-lg border border-teal-200
            bg-white shadow-lg max-h-60 overflow-auto
          "
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                px-4 py-3 cursor-pointer transition
                ${
                  value === opt.value
                    ? "bg-teal-600 text-white"
                    : "text-gray-700 hover:bg-teal-100 hover:text-teal-900"
                }
              `}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;
