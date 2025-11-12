import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './HomeCard.module.css';

const HomeCard = ({ icon, title, text, buttonText, linkTo = '/' }) => {
  const resolvedLink = linkTo
    ? linkTo.startsWith('/')
      ? linkTo
      : `/${linkTo}`
    : '/';

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={`${styles.cardDescription} text-body`}>{text}</p>
      <Link to={resolvedLink} className={`${styles.cardButton} text-button`}>
        {buttonText}
      </Link>
    </div>
  );
};

export default HomeCard;
