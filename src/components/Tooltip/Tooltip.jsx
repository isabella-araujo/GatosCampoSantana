import styles from './Tooltip.module.css';

import React from 'react';

function Tooltip({ text, children }) {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipText}>{text}</span>
      {children}
    </div>
  );
}

export default Tooltip;
