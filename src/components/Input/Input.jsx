import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';
import '../../styles/variables.css';

const Input = forwardRef(
  (
    { label, placeholder, type = 'text', value, onChange, error, ...props },
    ref,
  ) => {
    const classname = `${styles.input} ${error ? styles.error : ''}`;
    const id = useId();

    return (
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={classname}
          placeholder={placeholder}
          {...props}
        />

        {error && (
          <p className={`${styles.errorMessage} text-caption`}>{error}</p>
        )}
      </div>
    );
  },
);

export default Input;
