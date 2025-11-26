import styles from './Styles.module.css';
import Error404 from '../../../assets/Illustrations/Error404.svg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Página Não Encontrada | Gatos do Campo de Santana</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.container}>
        <h1 className={`${styles.title} text-display`}>
          Página não encontrada
        </h1>
        <div className={styles.imageContainer}>
          <img src={Error404} alt="Error 404" />
        </div>
        <p className={`${styles.subtitle} text-subtitle`}>
          Verifique o endereço digitado ou volte para a
          <Link to="/" className={styles.homeLink}>
            {' '}
            página inicial.
          </Link>
        </p>
      </div>
    </>
  );
}

export default PageNotFound;
