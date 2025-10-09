import './style.css';
import PropTypes from 'prop-types';

const IconButton = ({
  icon: Icon,
  label,
  onClick,
  className,
  type = 'button',
  color = 'var(--color-neutral-white)',
  size = 24,
  disabled = false,
}) => (
  <button
    type={type}
    className={`icon-button ${className || ''}`}
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
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
