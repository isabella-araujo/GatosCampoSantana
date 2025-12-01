import styles from './GoogleForm.module.css';
export default function GoogleForm({ url }) {
  return (
    <div className={styles.googleFormContainer}>
      <iframe
        src={url}
        width="500"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Google Form"
      />
    </div>
  );
}
