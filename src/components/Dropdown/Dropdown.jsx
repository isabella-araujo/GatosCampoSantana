import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './Dropdown.module.css';

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
    <div className={styles.dropdown}>
      <div className={styles.dropdownLabelContainer} onClick={toggleDropdown}>
        <label className={styles.dropdownLabel}>
          {selectedOption ? selectedOption.title : label}
        </label>
        <ArrowIcon size={24} />
      </div>

      {open && (
        <ul className={styles.dropdownMenu} id={idDropdown}>
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
      className={`${styles.dropdownOption} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={() => onClick(option)}
    >
      {option.title}
    </li>
  );
}
