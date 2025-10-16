import './style.css'
import { useState } from "react"

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function Dropdown({ label, options, onSelect }) {
    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)

    const ArrowIcon = open ? IoIosArrowUp : IoIosArrowDown;

    function toggleDropdown() {
        setOpen(!open)
    }

    function handleOptionSelect(option) {
        setSelectedOption(option)
        setOpen(false)
        onSelect(option)
    }
    
    return (
        <div className='dropdown'>
            <div 
                className='dropdown-label'
                onClick={toggleDropdown}
            >
                <label 
                    className='label'
                >
                    {selectedOption ? selectedOption.title : label}
                </label>
                <ArrowIcon size={24} />
            </div>

            {open &&
                <ul className="dropdown-menu" id={idDropdown}>
                    {options.map((option) => (
                        <Option
                            key={option.value}
                            option={option}
                            onClick={handleOptionSelect}
                            selectedOption={selectedOption}
                            isSelected={selectedOption?.value === option.value}
                        />
                    ))}
                </ul>
            }
        </div>
    )
}

function Option({ option, onClick }) {
    return (
        <li
            className='dropdown-option'
            onClick={() => onClick(option)}
        >
            {option.title}
        </li>
    )
}