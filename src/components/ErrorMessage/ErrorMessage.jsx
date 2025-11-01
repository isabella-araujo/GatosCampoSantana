import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ children }) {
  return <p className={`${styles.errorMessage} text-caption`}>{children}</p>;
}
