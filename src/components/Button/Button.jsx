import styles from './Button.module.css';

const Button = ({
  children,
  type = 'button',
  onClick,
  size = 'medium',
  disabled = false,
  variant = 'primary',
  borderRadius = '4px',
  icon: Icon,
  iconColor = 'var(--color-neutral-white)',
  iconSize = 18,
  className = '',
  ...props
}) => {
  const classes = `
    ${styles.button}
    ${styles[size]}
    ${styles[variant]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      style={{ borderRadius }}
      {...props}
    >
      {children}
      {Icon && (
        <Icon color={iconColor} size={iconSize} className={styles.icon} />
      )}
    </button>
  );
};

export default Button;
