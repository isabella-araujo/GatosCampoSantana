import { Helmet } from 'react-helmet-async';
import ErrorImagem from '../../../assets/Illustrations/ErrorCat.svg';
import styles from './Styles.module.css';

function NenhumGatoEncontrado({ msg }) {
  return (
    <>
      <Helmet>
        <title>Gatinho não encontrado | Gatos do Campo de Santana</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.container}>
        <div>
          <img src={ErrorImagem} alt="Nenhum Gato" />
        </div>
        <h1 className={`${styles.title2} text-title`}>
          Nenhum gatinho por aqui...
        </h1>
        <div>
          <p className={`${styles.message} text-subtitle`}>{msg}</p>
        </div>
      </div>
    </>
  );
}

export default NenhumGatoEncontrado;
