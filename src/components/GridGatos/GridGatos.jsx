import { useEffect, useState } from 'react';
import styles from './GridGatos.module.css';
import { CardGato } from '../CardGato/CardGato';

export default function GridGatos({ gatos }) {
  const CARDS_PER_PAGE = 8;
  const [qtdCardsPerPage, setQtdCardsPerPage] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    setQtdCardsPerPage(CARDS_PER_PAGE);
  }, [gatos]);

  const visiveis = gatos.slice(0, qtdCardsPerPage);

  function carregarMais() {
    setQtdCardsPerPage((prev) => prev + CARDS_PER_PAGE);
  }

  return (
    <div>
      <div className={styles.gridContainer}>
        {visiveis.map((gato) => (
          <div key={gato.id} className={styles.cardWrapper}>
            <CardGato gato={gato} />
          </div>
        ))}
      </div>

      {qtdCardsPerPage < gatos.length && (
        <p
          onClick={carregarMais}
          className={`${styles.loadMoreButton} text-button`}
        >
          Exibir mais
        </p>
      )}
    </div>
  );
}
