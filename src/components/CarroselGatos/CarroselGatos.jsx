import styles from './CarroselGatos.module.css';
import Carrossel from '../Carrossel/Carrossel';
import { useEffect, useState } from 'react';
import { getAllGatos } from '../../services/gatosServices';
import { CardGato } from '../CardGato/CardGato';
import { formatarGato } from '../../utils/formatarGato';

export default function CarroselGatos() {
  const [gatos, setGatos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGatos();
  }, []);

  async function fetchGatos() {
    setIsLoading(true);
    try {
      const gatos = await getAllGatos();
      const gatosFormatados = gatos.map((g) => formatarGato(g));
      setGatos(gatosFormatados);
    } catch (error) {
      setError('Erro ao carregar gatos.');
      console.error('Erro ao buscar gatos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.carroselContainer}>
      <Carrossel
        lista={gatos.filter((g) => !(g.isAdotado && g.disponivelAdocao))}
        atributo="disponivelLarTemporario"
        isLoading={isLoading}
        error={error}
        itemName="gatos"
      >
        {(gato) => <CardGato key={gato.id} gato={gato} />}
      </Carrossel>
    </div>
  );
}
