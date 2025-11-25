import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import styles from './GatoDetalhes.module.css';
import { useState } from 'react';
import { Button, Container } from '../../../components';
import GatoImg from '../../../assets/drica.jpg';
import {
  IoBandage,
  IoCalendarSharp,
  IoMaleFemaleOutline,
  IoPawSharp,
} from 'react-icons/io5';

export default function GatoDetalhes() {
  const { id } = useParams();
  const [gato, setGato] = useState(null);

  return (
    <>
      <Helmet>
        {/*<title> Gatos do Campo de Santana | {gato.nomeFormatado}</title>*/}
      </Helmet>
      <div className={styles.gatoDetailsContainer}>
        <div className={styles.titleContainer}>
          <h2 className="text-display">Drica</h2>
        </div>
        <Container style={{ width: '900px' }}>
          <div className={styles.gatoDetailsContent}>
            <div className={styles.imageContainer}>
              <img src={GatoImg} alt="Foto da Drica" />
            </div>
            <div className={styles.gatoInfoContainer}>
              <div className={styles.nomeContainer}>
                <h2 className={`${styles.nome} text-title`}>Drica</h2>
              </div>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <IoMaleFemaleOutline
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">Fêmea</span>
                </div>
                <div className={styles.infoItem}>
                  <IoPawSharp
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">Castrado</span>
                </div>
                <div className={styles.infoItem}>
                  <IoCalendarSharp
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">2 anos</span>
                </div>
                <div className={styles.infoItem}>
                  <IoBandage
                    className={styles.icon}
                    size={22}
                    color="var(--color-neutral-black)"
                  />
                  <span className="text-body2">Negativo Fiv/FeLV</span>
                </div>
              </div>
              <div className={styles.descriptionContainer}>
                <p className="text-body1">
                  A Drica é uma gata adorável de 2 anos, castrada e
                  saudável,pronta para encontrar um lar amoroso. Ela é
                  carinhosa,brincalhona e adora companhia humana. Com seu
                  temperamento dócil, a Drica se adapta facilmente a novos
                  ambientes e é ótima com crianças e outros animais. Se você
                  está procurando uma companheira felina leal e amorosa, a Drica
                  é perfeita!
                </p>
              </div>
              <div className={styles.buttonsContainer}>
                <p className="text-body1">
                  Interessado em adotar a Drica? Entre em contato conosco!
                </p>
                <div className={styles.actionButtons}>
                  <Button variant="primary" size="medium">
                    Instagram
                  </Button>
                  <Button variant="secondary" size="medium">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
