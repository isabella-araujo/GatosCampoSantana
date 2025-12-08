import { Helmet } from 'react-helmet-async';
import styles from './SobreNos.module.css';
import commonStyles from '../styles/PublicCommon.module.css';
import { Button, NossosObjetivosList } from '../../../components';
import { Link } from 'react-router-dom';
import { IoHeart, IoArrowRedoSharp } from 'react-icons/io5';
import NossaHistoriaImg from '../../../assets/SobreNos/nossa-historia.jpg';
import EllipseBlue from '../../../assets/SobreNos/Ellipse_1.svg';
import EllipseYellow from '../../../assets/SobreNos/Ellipse_2.svg';
import ComoAtuamosImg from '../../../assets/SobreNos/como-atuamos.jpg';
import FeirasAdocaoImg from '../../../assets/SobreNos/feiras-adocao.webp';

export default function SobreNos() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Saiba mais sobre o projeto Gatos do Campo de Santana!"
        />
        <meta
          property="og:title"
          content="Sobre Nós | Gatos do Campo de Santana"
        />
        <meta
          property="og:description"
          content="Saiba mais sobre o projeto Gatos do Campo de Santana!"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://gatosdocampodesantana.com/og-images/sobre-nos.jpg`}
        />
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com/sobre-nos"
        />
        <link
          rel="canonical"
          href="https://gatosdocampodesantana.com/sobre-nos"
        />
      </Helmet>
      <div
        className={` ${commonStyles.publicContainer} ${commonStyles.animatedFadeIn}`}
      >
        <div
          className={`${styles.nossaHistoriaContainer} ${commonStyles.paddingInlineClamp}`}
        >
          <div className={styles.nossaHistoriaHeader}>
            <h2 className="text-title">Nossa História</h2>
            <span className={styles.underline}></span>
          </div>
          <div className={styles.nossaHistoriaContent}>
            <div className={styles.nossaHistoriaText}>
              <p className="text-body1">
                O Projeto Gatos do Campo de Santana surgiu em 2018 com a missão
                de oferecer proteção, cuidados e a chance de uma vida melhor aos
                gatos que vivem na colônia do Campo de Santana, no coração do
                Rio de Janeiro.
              </p>
              <p className="text-body1">
                Desde o início, atuamos de forma voluntária, resgatando,
                alimentando e cuidando dos felinos, além de incentivar a adoção
                responsável. Nosso trabalho busca minimizar o sofrimento desses
                animais, que muitas vezes enfrentam abandono, doenças e
                maus-tratos.
              </p>
              <p className="text-body1">
                Tudo o que realizamos é sustentado pela dedicação de pessoas
                apaixonadas pela causa e pelo apoio de quem acredita em um
                futuro mais digno e amoroso para esses gatinhos. Cada doação,
                cada gesto de solidariedade e cada adoção responsável nos ajuda
                a transformar vidas.
              </p>
            </div>
            <div className={styles.nossaHistoriaImgContainer}>
              <img
                src={EllipseBlue}
                alt="Ellipse Azul"
                className={styles.ellipseBlue}
              />
              <img
                src={NossaHistoriaImg}
                alt="Imagem dos voluntarios do projeto Gatos do Campo de Santana"
                className={styles.nossaHistoriaImage}
              />
              <img
                src={EllipseYellow}
                alt="Ellipse Amarelo"
                className={styles.ellipseYellow}
              />
            </div>
          </div>
          <div className={styles.nossaHistoriaButton}>
            <Link to="/como-ajudar">
              <Button variant="secondary" className="buttonBoxShadow">
                Como Ajudar
              </Button>
            </Link>
          </div>
        </div>

        <div
          className={`${styles.comoAtuamosSection} ${commonStyles.sectionMargin}`}
        >
          <div
            className={`${styles.comoAtuamosContainer} ${commonStyles.paddingInlineClamp}`}
          >
            <div className={styles.comoAtuamosContent}>
              <div className={styles.comoAtuamosHeader}>
                <h2 className="text-title">Como Atuamos</h2>
              </div>
              <div className={styles.comoAtuamosText}>
                <p className="text-body1">
                  Levamos regularmente os animais da colônia para consultas,
                  exames e diversos procedimentos veterinários, incluindo testes
                  de FIV e FeLV, garantindo que cada gatinho receba os cuidados
                  necessários para uma vida saudável.
                </p>
                <p className="text-body1">
                  Em 2024, realizamos 29 internações ao longo do ano, todas
                  viabilizadas graças à parceria com a Clínica Veterinária de
                  Botafogo, que nos apoia com dedicação e profissionalismo. Além
                  disso, contamos com os serviços oferecidos pela Prefeitura do
                  Rio de Janeiro, como o Posto de Atendimento do Flamengo e o
                  Hospital Veterinário da Mangueira, ampliando ainda mais nossa
                  capacidade de cuidado e atendimento.
                </p>
              </div>
              <Link to="/adote">
                <Button
                  size="small"
                  icon={IoHeart}
                  className={`${styles.bannerButton} buttonBoxShadow`}
                >
                  Adote
                </Button>
              </Link>
            </div>
            <div className={styles.comoAtuamosImgContainer}>
              <img
                src={ComoAtuamosImg}
                className={styles.comoAtuamosImage}
                alt="Gato do projeto Gatos do Campo de Santana sendo cuidado"
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.feirasAdocaoSection} ${commonStyles.sectionMargin}  ${commonStyles.paddingInlineClamp}`}
        >
          <div className={styles.feirasAdocaoContainer}>
            <div className={styles.feirasAdocaoContent}>
              <div className={styles.feirasAdocaoTitle}>
                <h2 className="text-title">Feiras de Adoção</h2>
              </div>
              <div className={styles.feirasAdocaoText}>
                <p className="text-body1">
                  Mantemos parcerias com diversos locais que nos oferecem espaço
                  e estruturas, como gaiolas, para a realização de feiras de
                  adoção.
                </p>
                <p className="text-body1">
                  Além de incentivar novas famílias a acolherem nossos felinos,
                  as feiras também funcionam como um importante canal de
                  recolhimento de doações, divulgação do projeto e
                  conscientização da comunidade sobre a importância de cuidar e
                  proteger os animais. Cada feira é um momento de encontro,
                  aprendizado e carinho, aproximando voluntários, apoiadores e
                  animais que buscam um lar cheio de amor.
                </p>
              </div>
            </div>
            <div className={styles.feirasAdocaoImageContainer}>
              <img
                src={FeirasAdocaoImg}
                className={styles.feirasAdocaoImage}
                alt="Imagem de um gato as feiras de adoção do projeto Gatos do Campo de Santana"
              />
            </div>
          </div>
          <div className={styles.feirasAdocaoCaption}>
            <p className="text-caption">
              Para ficar por dentro das próximas feiras de adoção e conhecer os
              gatinhos disponíveis, {''}
              <Link
                to="https://www.instagram.com/gatosdocampodesantana"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.instagramLink}`}
              >
                siga nosso Instagram
              </Link>{' '}
              <IoArrowRedoSharp size={16} color="var(--color-primary-yellow)" />
            </p>
          </div>
        </div>
        <div
          className={`${styles.nossosObjSection} ${commonStyles.sectionMargin}  ${commonStyles.paddingInlineClamp} ${commonStyles.lastSectionMargin}`}
        >
          <div className={styles.nossosObjHeader}>
            <div className={styles.nossosObjTitle}>
              <h2 className="text-title">Nossos Objetivos</h2>
            </div>
            <div className={styles.nossosObjText}>
              <p className="text-body1">
                Nosso principal objetivo é a extinção da colônia. Para
                alcançá-lo, mobilizamos continuamente outros meios no
                desenvolvimento do projeto.
              </p>
            </div>
          </div>
          <div className={styles.nossosObjList}>
            <NossosObjetivosList />
          </div>
          <Link to="/doe">
            <Button
              variant="secondaryOutline"
              className={styles.nossosObjButton}
              icon={IoHeart}
              iconColor="var(--color-primary-yellow)"
            >
              Faça uma doação
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
