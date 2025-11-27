import styles from './Button.module.css';

const Button = ({
  children,
  type = 'button',
  onClick,
  size = 'medium',
  disabled = false,
  variant = 'primary',
  borderRadius = '6px',
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
      style={{ borderRadius, backgroundColor: props.style?.backgroundColor }}
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
