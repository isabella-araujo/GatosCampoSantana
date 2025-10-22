import './style.css';
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
  const classname = `input ${error ? 'error' : ''}`;
  const id = useId();
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
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
      {error && <p className="error-message text-caption">{error}</p>}
    </div>
  );
}
