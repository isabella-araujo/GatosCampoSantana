import { useEffect, useState } from 'react';
import { getObjetivos } from '../../services/objetivosServices';
import styles from './NossosObjetivosList.module.css';
import { IoPawSharp } from 'react-icons/io5';

function NossosObjetivosList() {
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    fetchObjetivos();
  }, []);

  async function fetchObjetivos() {
    try {
      const { objetivos, error } = await getObjetivos();
      if (error) {
        console.error('Erro ao buscar objetivos:', error);
        return;
      }
      setObjetivos(objetivos);
    } catch (error) {
      console.error('Erro ao buscar objetivos:', error);
    }
  }

  return (
    <div className={`${styles.objetivosContainer}`}>
      {objetivos.map((objetivo) => (
        <div key={objetivo.id}>
          <div className={styles.objetivoIcon}>
            <IoPawSharp color="var(--color-primary-yellow)" size={45} />
            <span className={styles.iconNumber + ' text-body2'}>
              {objetivos.indexOf(objetivo) + 1}
            </span>
          </div>
          <div className={styles.objetivoContent}>
            <h3 className="text-subtitle">{objetivo.titulo}</h3>
            <p className="text-body2">{objetivo.descricao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NossosObjetivosList;
