import './styles.css';
const StatusPill = ({ bgColor, children, textColor, className }) => {
  return (
    <div
      className={`status-pill ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </div>
  );
};

export default StatusPill;
