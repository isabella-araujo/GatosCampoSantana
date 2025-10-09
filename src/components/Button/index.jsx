import './style.css';

const Button = ({
  children,
  type = 'button',
  onClick,
  size = 'medium',
  disabled = false,
  variant = 'primary',
  className = 'btn text-button',
  borderRadius = '4px',
  icon: Icon,
  iconColor = 'var(--color-neutral-white)',
  iconSize = 18,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} btn-${size} btn-${variant}`}
      disabled={disabled}
      style={{ borderRadius }}
      {...props}
    >
      {children}
      {Icon && <Icon color={iconColor} size={iconSize} className="btn-icon" />}
    </button>
  );
};

export default Button;
