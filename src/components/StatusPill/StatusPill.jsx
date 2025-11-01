import styles from './StatusPill.module.css';
const StatusPill = ({ bgColor, children, textColor, className }) => {
  return (
    <div
      className={`${styles.statusPill} ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </div>
  );
};

export default StatusPill;
