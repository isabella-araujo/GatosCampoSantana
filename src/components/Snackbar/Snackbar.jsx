import styles from './Snackbar.module.css';
import IconButton from '../IconButton/IconButton.jsx';
import { IoClose } from 'react-icons/io5';

const Snackbar = ({ open, message, onClose, duration = 6000 }) => {
  if (!open) return null;
  setTimeout(onClose, duration);

  return (
    <div className={styles.container}>
      <p className={`${styles.message} text-caption`}>{message}</p>
      <IconButton
        icon={IoClose}
        size={16}
        color="var(--color-neutral-white)"
        onClick={onClose}
        label={'fecharSnackbar'}
      />
    </div>
  );
};

export default Snackbar;
