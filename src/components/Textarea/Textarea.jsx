import styles from './Textarea.module.css';
import '../../styles/variables.css';

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  ...props
}) {
  const classname = `${styles.textarea} ${error ? styles.error : ''}`;

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <textarea
        value={value}
        onChange={onChange}
        className={classname}
        placeholder={placeholder}
        {...props}
      ></textarea>

      {error && (
        <p className={`${styles.errorMessage} text-caption`}>{error}</p>
      )}
    </div>
  );
}
