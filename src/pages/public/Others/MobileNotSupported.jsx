import styles from './Styles.module.css';
import NotSupported from '../../../assets/Illustrations/NotSupported.svg';
import { Helmet } from 'react-helmet-async';

function MobileNotSupported() {
  return (
    <>
      <Helmet>
        <title>Dispositivo não suportado | Gatos do Campo de Santana</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={styles.container}>
        <h1 className={`${styles.title} text-display`}>
          Dispositivo não suportado
        </h1>
        <div>
          <img src={NotSupported} alt="Not Supported" loading="lazy" />
        </div>
        <p className={`${styles.subtitle} text-subtitle`}>
          Tente acessar de um computador para aproveitar todos os recursos.
        </p>
      </div>
    </>
  );
}

export default MobileNotSupported;
