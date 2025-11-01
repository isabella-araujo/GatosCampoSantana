import PropTypes from 'prop-types';
import styles from './IconButton.module.css';

const IconButton = ({
  icon: Icon,
  label,
  onClick,
  className = '',
  type = 'button',
  color = 'var(--color-neutral-white)',
  size = 24,
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    className={`${styles.iconButton} ${className}`}
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
    {...props}
  >
    {Icon && <Icon color={color} size={size} />}
  </button>
);

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default IconButton;
