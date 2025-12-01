import { Helmet } from 'react-helmet-async';
import styles from './Adote.module.css';
import { FiltrosGatos, GridGatos } from '../../../components';
import { IoNewspaperOutline, IoHeartCircle } from 'react-icons/io5';
import Formulario from '../../../assets/Adote/Formulario.svg';
import Entrevista from '../../../assets/Adote/Entrevistas.svg';
import Documentos from '../../../assets/Adote/Documentos.svg';
import { useEffect, useState } from 'react';
import { getAllGatos } from '../../../services/gatosServices';
import { formatarGato } from '../../../utils/formatarGato';
import NenhumGatoEncontrado from '../Others/NenhumGatoEncontrado';

export default function Adote() {
  const [filtros, setFiltros] = useState({
    genero: '',
    idade: '',
    castrado: '',
    fivFelv: '',
  });
  const [gatos, setGatos] = useState([]);

  useEffect(() => {
    fetchGatos();
  }, []);

  async function fetchGatos() {
    try {
      const gatos = await getAllGatos();
      const gatosFormatados = gatos.map((g) => formatarGato(g));
      setGatos(gatosFormatados);
    } catch (error) {
      console.error('Erro ao buscar gatos:', error);
    }
  }

  function aplicarFiltros(gatos) {
    return gatos
      .filter((g) => !g.isAdotado)
      .filter((g) => (filtros.genero ? g.genero === filtros.genero : true))
      .filter((g) =>
        filtros.castrado
          ? filtros.castrado === 'castrado'
            ? g.castrado === true
            : g.castrado === false
          : true,
      )
      .filter((g) =>
        filtros.fivFelv ? g.possuiFievFelv === filtros.fivFelv : true,
      )
      .filter((g) => {
        if (!filtros.idade) return true;
        if (filtros.idade === 'filhote') return g.idadeMeses < 6;
        if (filtros.idade === 'jovem')
          return g.idadeMeses >= 6 && g.idadeMeses < 24;
        if (filtros.idade === 'adulto')
          return g.idadeMeses >= 24 && g.idadeMeses < 84;
        if (filtros.idade === 'idoso') return g.idadeMeses >= 84;
        return true;
      });
  }

  const gatosFiltrados = aplicarFiltros(gatos, filtros);

  return (
    <>
      <Helmet>
        <title>Adote | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Adote um gatinho e faça a diferença na vida dele."
        />
        <meta property="og:title" content="Adote | Gatos do Campo de Santana" />
        <meta
          property="og:description"
          content="Adote um gatinho e faça a diferença na vida dele."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://gatosdocampodesantana.com/og-images/adote.jpg`}
        />
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com/adote"
        />
        <link rel="canonical" href="https://gatosdocampodesantana.com/adote" />
      </Helmet>
      <div className={styles.adoteContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <h1 className="text-display">Adote amor em forma de gato</h1>
            </div>
            <p className="text-subtitle">
              Cada um desses gatinhos tem uma história e está em busca de um lar
              cheio de carinho. Adotar transforma a sua vida e a de um gatinho.
            </p>
            <div className={styles.headerLink}>
              <a href="#gatosParaAdocaoSection" className="text-button">
                Conheça nossos gatinhos!
              </a>
            </div>
          </div>
        </div>
        <div className={`${styles.comoAdotarSection} sectionMargin`}>
          <div className={styles.comoAdotarContainer}>
            <div className={styles.comoAdotarTitle}>
              <IoNewspaperOutline
                size={40}
                color="var(--color-primary-yellow)"
              />
              <h2 className="text-title">
                Como funciona o processo de adoção?
              </h2>
            </div>
            <div className={styles.comoAdotarSteps}>
              <div className={styles.step}>
                <img
                  src={Documentos}
                  alt="Documentos"
                  className={styles.stepImage}
                />
                <h3 className={styles.stepTitle}>Envio dos documentos</h3>
                <p className={styles.stepDescription}>
                  Para adoção responsável deve primeiro nos enviar foto da
                  identidade (ambos os lados) e do comprovante de residência..
                </p>
              </div>
              <div className={styles.step}>
                <img
                  src={Entrevista}
                  alt="Entrevista"
                  className={styles.stepImage}
                />
                <h3 className={styles.stepTitle}>Entrevista</h3>
                <p className={styles.stepDescription}>
                  Para prosseguirmos, precisamos confirmar se você mora em um
                  apartamento telado ou em uma casa com acesso à rua. Se for
                  casa, envie fotos ou vídeos das janelas e da área externa.
                </p>
              </div>
              <div className={styles.step}>
                <img
                  src={Formulario}
                  alt="Formulário"
                  className={styles.stepImage}
                />
                <h3 className={styles.stepTitle}>Formulário</h3>
                <p className={styles.stepDescription}>
                  Por último, se houver a liberação da entrevista, pedimos
                  apenas para preencher o termo de adoção no formulário da nossa
                  BIO, e aí é só buscá-lo(a)!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.gatosParaAdocaoSection} sectionMargin`}
          id="gatosParaAdocaoSection"
        >
          <div className={styles.gatosParaAdocaoContainer}>
            <div className={styles.gatosParaAdocaoTitle}>
              <IoHeartCircle size={40} color="var(--color-primary-blue)" />
              <h2 className="text-title">Conheça nossos gatinhos</h2>
            </div>
            <div className={styles.gatosParaAdocaoContent}>
              <FiltrosGatos filtros={filtros} setFiltros={setFiltros} />
              {gatosFiltrados.length === 0 && (
                <NenhumGatoEncontrado msg="No momento, nenhum gatinho foi encontrado. Tente novamente mais tarde, ou teste com outros filtros." />
              )}
              <GridGatos gatos={gatosFiltrados} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
