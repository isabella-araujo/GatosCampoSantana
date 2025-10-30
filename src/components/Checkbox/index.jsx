import './style.css';
import { useRef } from 'react';

import { FaCheck } from 'react-icons/fa6';

export default function Checkbox({ label, checked, onChecked, ...props }) {
  const classname = `checkbox ${checked ? 'checked' : ''}`;
  const inputRef = useRef(null);

  function handleChange() {
    onChecked(!checked);
  }

  function handleClick() {
    inputRef.current.click();
  }

  return (
    <div className="container-checkbox">
      <input
        className="input-checkbox"
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        ref={inputRef}
        {...props}
      />
      <div className={classname} onClick={handleClick}>
        {checked && <FaCheck />}
      </div>
      <p className="text-body1">{label}</p>
    </div>
  );
}
