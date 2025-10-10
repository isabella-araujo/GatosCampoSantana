import Container from '../Container';
import './styles.css';

const Modal = ({ children, onClose, footer }) => {
  return (
    <div className="modal" onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        {children}
        {footer && <div className="modal-footer">{footer}</div>}
      </Container>
    </div>
  );
};

export default Modal;
