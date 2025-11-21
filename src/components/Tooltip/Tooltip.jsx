import styles from './Tooltip.module.css';

import React from 'react';

function Tooltip({ text, children, position = 'top' }) {
  return (
    <div className={`${styles.tooltip} ${styles[position]}`}>
      <span className={styles.tooltipText}>{text}</span>
      {children}
    </div>
  );
}

export default Tooltip;
