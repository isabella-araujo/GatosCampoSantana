import IconButton from '../IconButton';
import { IoClose } from 'react-icons/io5';
import './styles.css';

const Snackbar = ({ open, message, onClose, duration = 6000 }) => {
  if (!open) return null;
  setTimeout(onClose, duration);

  return (
    <div className="snackbar-container">
      <p className="snackbar-message text-caption">{message}</p>
      <IconButton
        icon={IoClose}
        size={16}
        color="var(--color-neutral-white)"
        onClick={onClose}
      />
    </div>
  );
};

export default Snackbar;
