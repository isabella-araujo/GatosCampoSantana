import styles from './Input.module.css';
import '../../styles/variables.css';
import { useId } from 'react';

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  ...props
}) {
  const classname = `${styles.input} ${error ? styles.error : ''}`;
  const id = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={classname}
        placeholder={placeholder}
        {...props}
      />
      <p className={`${styles.errorMessage} text-caption`}>{error}</p>
    </div>
  );
}
