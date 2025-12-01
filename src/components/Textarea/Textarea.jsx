import React, { forwardRef } from 'react';
import styles from './Textarea.module.css';
import '../../styles/variables.css';

const Textarea = forwardRef(
  ({ label, placeholder, value, onChange, error, ...props }, ref) => {
    const classname = `${styles.textarea} ${error ? styles.error : ''}`;

    return (
      <div className={styles.container}>
        <p className={styles.label}>{label}</p>

        <textarea
          ref={ref}
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

export default Textarea;
