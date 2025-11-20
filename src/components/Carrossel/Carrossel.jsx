import { useEffect, useMemo, useState } from 'react';
import styles from './Carrossel.module.css';
import { IoChevronForwardSharp } from 'react-icons/io5';

export default function Carrossel({
  lista = [],
  isLoading = false,
  error = null,
  atributo = null,
  children,
}) {
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const items = atributo
    ? lista.filter((item) => item && Boolean(item[atributo]))
    : lista;

  useEffect(() => {
    function update() {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = useMemo(() => {
    const chunked = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
      chunked.push(items.slice(i, i + itemsPerPage));
    }
    return chunked;
  }, [items, itemsPerPage]);

  const totalPages = pages.length;
  useEffect(() => {
    setIndex((prev) =>
      Math.max(0, Math.min(prev, Math.max(0, totalPages - 1))),
    );
  }, [totalPages]);

  const canPrev = index > 0;
  const canNext = index < totalPages - 1;

  function goPrev() {
    if (canPrev) setIndex((i) => i - 1);
  }

  function goNext() {
    if (canNext) setIndex((i) => i + 1);
  }

  if (error && !isLoading) {
    return <div className={styles.message}>Erro ao carregar itens.</div>;
  }

  if (!isLoading && items.length === 0) {
    return <div className={styles.message}>Nenhum item encontrado.</div>;
  }

  const trackWidth = `${totalPages * 100}%`;
  const translateX = `-${index * (100 / totalPages)}%`;
  const pageWidthPercent = `${100 / totalPages}%`;

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.nav} ${styles.left} ${
          !canPrev ? styles.disabled : ''
        }`}
        onClick={goPrev}
        disabled={!canPrev}
        aria-label="Anterior"
      >
        <IoChevronForwardSharp style={{ transform: 'rotate(180deg)' }} />
      </button>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            width: trackWidth,
            transform: `translateX(${translateX})`,
          }}
        >
          {pages.map((pageItems, pageIdx) => (
            <div
              key={pageIdx}
              className={styles.page}
              style={{ flex: `0 0 ${pageWidthPercent}` }}
            >
              {pageItems.map((item) => (
                <div key={item.id} className={styles.slide}>
                  {children(item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.nav} ${styles.right} ${
          !canNext ? styles.disabled : ''
        }`}
        onClick={goNext}
        disabled={!canNext}
        aria-label="Próximo"
      >
        <IoChevronForwardSharp />
      </button>
    </div>
  );
}
