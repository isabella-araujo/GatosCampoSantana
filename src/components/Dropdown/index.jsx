import './style.css';
import { useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

export default function Dropdown({
  label,
  options,
  onSelect,
  idDropdown,
  value,
}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const ArrowIcon = open ? IoIosArrowUp : IoIosArrowDown;

  useEffect(() => {
    if (value) {
      const foundOption = options.find((opt) => opt.value === value);
      setSelectedOption(foundOption || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  function toggleDropdown() {
    setOpen((prev) => !prev);
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
    setOpen(false);
    onSelect(option);
  }

  return (
    <div className="dropdown">
      <div className="dropdown-label-cointainer" onClick={toggleDropdown}>
        <label className="dropdown-label">
          {selectedOption ? selectedOption.title : label}
        </label>
        <ArrowIcon size={24} />
      </div>

      {open && (
        <ul className="dropdown-menu" id={idDropdown}>
          {options.map((option) => (
            <Option
              key={option.value}
              option={option}
              onClick={handleOptionSelect}
              isSelected={selectedOption?.value === option.value}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function Option({ option, onClick, isSelected }) {
  return (
    <li
      className={`dropdown-option ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(option)}
    >
      {option.title}
    </li>
  );
}
