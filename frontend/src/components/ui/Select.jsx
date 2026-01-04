


import { useState, useRef, useEffect } from 'react';

const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  error,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue); // Directly pass the value
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef} {...props}>
      {/* Label */}
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Custom Select Trigger */}
      <div className="relative">
        <button
          type="button"
          className={`
            w-full px-4 py-3 text-left bg-white border rounded-lg 
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-teal-500/20
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:border-teal-500'}
            ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300'}
            ${isOpen ? 'ring-2 ring-teal-500/20 border-teal-500' : ''}
            flex items-center justify-between
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
            {selectedOption?.label || placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">
            <ul className="py-1" role="listbox">
              {options.map((option) => (
                <li key={option.value} role="option" aria-selected={value === option.value}>
                  <button
                    type="button"
                    className={`
                      w-full px-4 py-2 text-left hover:bg-gray-50 
                      transition-colors duration-150
                      flex items-center justify-between
                      ${value === option.value 
                        ? 'bg-teal-50 text-teal-700 font-medium' 
                        : 'text-gray-700'
                      }
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                  >
                    <span>{option.label}</span>
                    {value === option.value && (
                      <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;