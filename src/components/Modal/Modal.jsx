import styles from './Modal.module.css';
import Container from '../Container/Container.jsx';

const Modal = ({ open, children, onClose, footer }) => {
  if (!open) return null;
  return (
    <div className={styles.modal} onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        {children}
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </Container>
    </div>
  );
};

export default Modal;
