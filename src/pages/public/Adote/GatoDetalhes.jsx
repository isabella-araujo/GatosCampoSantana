import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import styles from './GatoDetalhes.module.css';
import { useEffect, useState } from 'react';
import { Button, Container, Loading, Modal } from '../../../components';
import {
  IoBandage,
  IoCalendarSharp,
  IoMaleFemaleOutline,
  IoPawSharp,
} from 'react-icons/io5';
import { getGatoBySlug } from '../../../services/gatosServices';
import { formatarGato } from '../../../utils/formatarGato';
import NenhumGatoEncontrado from '../Others/NenhumGatoEncontrado';
import GoogleForm from '../../../components/GoogleForm/GoogleForm';
export default function GatoDetalhes() {
  const { slug } = useParams();
  const [gato, setGato] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchGato() {
      try {
        const gatoData = await getGatoBySlug(slug);
        if (!gatoData) {
          setGato(undefined);
          return;
        }
        const gatoWithFormattedFields = formatarGato(gatoData);
        setGato(gatoWithFormattedFields);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do gato:', error);
        setGato(undefined);
      }
    }

    fetchGato();
  }, [slug]);

  if (gato === null) {
    return <Loading />;
  }

  if (gato === undefined) {
    return (
      <NenhumGatoEncontrado msg="Não foi possível encontrar o gatinho, tente novamente mais tarde." />
    );
  }
  const formURL = `https://docs.google.com/forms/d/e/1FAIpQLSchqxW3drNKuJjsvlzwEfleJ9KlMVnLXkzBCo4gbGe9C1TR8g/viewform?embedded=true&entry.1347770403=${encodeURIComponent(
    gato.nomeFormatado,
  )}`;
  const handleOpenModal = () => {
    console.log('clicou abrir modal');
    setOpenModal(true);
  };

  return (
    <>
      <Helmet>
        <title> Gatos do Campo de Santana | {gato.nomeFormatado}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.gatoDetailsContainer}>
        <div className={styles.titleContainer}>
          <h2 className="text-display">{gato.nomeFormatado}</h2>
        </div>
        <Container style={{ width: '900px' }}>
          <div className={styles.gatoDetailsContent}>
            <div className={styles.imageContainer}>
              <img src={gato.fotoURL} alt={`Foto da ${gato.nomeFormatado}`} />
            </div>
            <div className={styles.gatoInfoContainer}>
              <div className={styles.nomeContainer}>
                <h2 className={`${styles.nome} text-title`}>
                  {gato.nomeFormatado}
                </h2>
              </div>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <IoMaleFemaleOutline
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">{gato.generoFormatado}</span>
                </div>
                <div className={styles.infoItem}>
                  <IoPawSharp
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">{gato.castradoFormatado}</span>
                </div>
                <div className={styles.infoItem}>
                  <IoCalendarSharp
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">{gato.idade}</span>
                </div>
                <div className={styles.infoItem}>
                  <IoBandage
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">{gato.fivFelvFormatado}</span>
                </div>
              </div>
              <div className={styles.descriptionContainer}>
                <p className="text-body1">{gato.descricao}</p>
              </div>
              <div className={styles.buttonsContainer}>
                <p className="text-body1">
                  Interessado em adotar a {gato.nomeFormatado}? Entre em contato
                  conosco!
                </p>
                <div className={styles.actionButtons}>
                  <Link
                    to="https://ig.me/m/gatosdocampodesantana"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      size="medium"
                      className={styles.instagramButton}
                    >
                      Instagram
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="medium"
                    className={styles.whatsappButton}
                    onClick={handleOpenModal}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <GoogleForm url={formURL} />
      </Modal>
    </>
  );
}
