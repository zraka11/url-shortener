import React, { useState } from "react";

function CustomDropdown({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative w-[240px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 border border-[#8a8a8a] px-3 text-base text-left bg-white flex items-center justify-between"
      >
        <span className={value ? "text-[#6f6f6f]" : "text-[#9b9b9b]"}>
          {selectedLabel}
        </span>
        <span className="text-sm text-[#6f6f6f]">▼</span>
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full border border-[#8a8a8a] bg-white mt-1 z-10 rounded-sm overflow-hidden text-[#6f6f6f]">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center border-t border-[#8a8a8a] first:border-t-0"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
