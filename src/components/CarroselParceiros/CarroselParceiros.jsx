import { useEffect, useState } from 'react';
import styles from './CarroselParceiros.module.css';
import { getParceiros } from '../../services/parceirosServices';
import Carrossel from '../Carrossel/Carrossel';
import Tooltip from '../Tooltip/Tooltip';

export default function CarroselParceiros() {
  const [parceiros, setParceiros] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchParceiros();
  }, []);

  async function fetchParceiros() {
    try {
      const parceiros = await getParceiros();
      setParceiros(parceiros);
    } catch (error) {
      setError('Erro ao carregar parceiros.');
      console.error('Erro ao buscar parceiros:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Carrossel
      lista={parceiros}
      atributo="ativo"
      isLoading={isLoading}
      error={error}
    >
      {(parceiro) => (
        <div className={styles.parceiroCard} key={parceiro.id}>
          <Tooltip text={parceiro.nome} key={parceiro.id} position="right">
            <img
              src={parceiro.logoURL}
              alt={parceiro.nome}
              className={styles.parceiroLogo}
            />
          </Tooltip>
        </div>
      )}
    </Carrossel>
  );
}
