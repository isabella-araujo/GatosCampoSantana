import React, { useRef, forwardRef } from 'react';
import styles from './Checkbox.module.css';
import { IoCheckmarkSharp } from 'react-icons/io5';

const Checkbox = forwardRef(({ label, checked, onChecked, ...props }, ref) => {
  const internalRef = useRef(null);

  function handleChange() {
    onChecked(!checked);
  }

  function handleClick() {
    const element = ref?.current || internalRef.current;
    element?.click();
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        ref={ref || internalRef}
        {...props}
      />

      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
        onClick={handleClick}
      >
        {checked && <IoCheckmarkSharp />}
      </div>

      <p className="text-body1">{label}</p>
    </div>
  );
});

export default Checkbox;
