import styles from './CardGato.module.css';
import {
  IoMaleFemaleOutline,
  IoPawSharp,
  IoCalendarSharp,
  IoBandage,
  IoHeart,
} from 'react-icons/io5';
import Button from '../Button/Button.jsx';
import { Link } from 'react-router-dom';

export function CardGato({ gato }) {
  return (
    <div className={`${styles.card} `}>
      <div className={styles.imagemContainer}>
        <img
          src={gato.fotoURL}
          alt={gato.nomeFormatado}
          className={styles.imagem}
          loading="lazy"
        />
      </div>
      <div className={styles.nomeContainer}>
        <h2 className={`${styles.nome} text-subtitle`}>{gato.nomeFormatado}</h2>
      </div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <IoMaleFemaleOutline
            className={styles.icon}
            size={16}
            color="var(--color-primary-yellow)"
          />
          <span className="text-caption">{gato.generoFormatado}</span>
        </div>
        <div className={styles.infoItem}>
          <IoPawSharp
            className={styles.icon}
            size={16}
            color="var(--color-primary-yellow)"
          />
          <span className="text-caption">{gato.castradoFormatado}</span>
        </div>
        <div className={styles.infoItem}>
          <IoCalendarSharp
            className={styles.icon}
            size={16}
            color="var(--color-primary-yellow)"
          />
          <span className="text-caption">{gato.idade}</span>
        </div>
        <div className={styles.infoItem}>
          <IoBandage
            className={styles.icon}
            size={16}
            color="var(--color-primary-yellow)"
          />
          <span className="text-caption">{gato.fivFelvFormatado}</span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Link to={`/adote/gatoDetalhes/${gato.slug}`}>
          <Button variant="secondary" size="small" icon={IoHeart}>
            {gato.atributo}
          </Button>
        </Link>
      </div>
    </div>
  );
}
