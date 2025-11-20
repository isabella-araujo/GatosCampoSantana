import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';
import VectorHomeBanner from '../../../assets/Home/vector-banner.svg';
import GatoShapeHome from '../../../assets/Home/gato-shape-banner.svg';
import QuemSomosSection from '../../../assets/Home/quem-somos.png';
import CatSilhouette from '../../../assets/Home/CatSilhouette.svg';
import GatoImgHomeBanner from '../../../assets/Home/gato-banner.png';
import patinhasGroup from '../../../assets/Home/patinhas-group.svg';
import Star from '../../../assets/Home/star.svg';
import { Link } from 'react-router-dom';
import { Button, CarroselParceiros, HomeCard } from '../../../components';
import {
  IoHeart,
  IoPawSharp,
  IoHeartCircle,
  IoHome,
  IoWallet,
} from 'react-icons/io5';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Bem-vindos ao site dos Gatos do Campo de Santana!"
        />
        <meta property="og:title" content="Home | Gatos do Campo de Santana" />
        <meta
          property="og:description"
          content="Bem-vindos ao site dos Gatos do Campo de Santana!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/home-thumb.jpg" />{' '}
        /*Substitua pelo caminho correto da imagem*/
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com.br/"
        />
      </Helmet>
      <div className={styles.homeContainer}>
        <div className={styles.bannerWrapper}>
          <img
            src={VectorHomeBanner}
            alt="SVG shape banner"
            className={styles.bannerShape}
          />
          <div className={styles.bannerContainer}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerText}>
                <h1 className={styles.bannerTitle}>
                  Mais que uma colônia, um lar para centenas de gatinhos
                </h1>
                <p className={styles.bannerSubtitle}>
                  Proteger e auxiliar esses seres indefesos é uma tarefa árdua,
                  mas possível se houver união. Nos ajude nessa missão!
                </p>
                <div className={styles.bannerButtons}>
                  <Link to="/doe">
                    <Button
                      size="small"
                      icon={IoHeart}
                      className={`${styles.bannerButton} buttonBoxShadow`}
                    >
                      Doe
                    </Button>
                  </Link>
                  <Link to="/adote">
                    <Button
                      size="small"
                      icon={IoPawSharp}
                      className={`${styles.bannerButton} buttonBoxShadow`}
                    >
                      Adote
                    </Button>
                  </Link>
                </div>
              </div>
              <div className={styles.bannerImage}>
                <img
                  src={GatoShapeHome}
                  alt="Gatos Laranja SVG shape banner"
                  className={styles.gatobannerImage}
                />
                <img
                  src={GatoImgHomeBanner}
                  alt="Gatos Laranja"
                  className={styles.gatobannerImageMobile}
                />
              </div>
            </div>
            <div className={`${styles.cardsHomeContainer} sectionMargin`}>
              <div className={styles.cardWrapper}>
                <HomeCard
                  icon={
                    <IoHeartCircle
                      size={50}
                      color="var(--color-neutral-white)"
                    />
                  }
                  title={'Como Ajudar'}
                  text={
                    'Existem muitas formas de ajudar. Seja voluntário, lar temporário, doe ou compartilhe nossas campanhas.'
                  }
                  linkTo={'/como-ajudar'}
                  buttonText={'Saiba mais'}
                />
              </div>
              <div className={styles.cardWrapper}>
                <HomeCard
                  icon={<IoHome size={50} color="var(--color-neutral-white)" />}
                  title={'Adote'}
                  text={
                    'Dar um lar é dar uma nova chance. Adote e descubra a alegria de ter um gatinho cheio de carinho e gratidão.'
                  }
                  linkTo={'/adote'}
                  buttonText={'Adotar'}
                />
              </div>
              <div className={styles.cardWrapper}>
                <HomeCard
                  icon={
                    <IoWallet size={50} color="var(--color-neutral-white)" />
                  }
                  title={'Doe'}
                  text={
                    'Cada contribuição faz a diferença. Sua doação ajuda com cuidados veterinários e  garante a alimentação dos gatinhos.'
                  }
                  linkTo={'/doe'}
                  buttonText={'Quero doar'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.quemSomosSection} sectionMargin`}>
          <h2 className="text-title">Quem Somos</h2>
          <div className={styles.quemSomosContent}>
            <div className={styles.quemSomosImage}>
              <img src={QuemSomosSection} alt="Quem Somos Section" />
            </div>
            <div className={styles.quemSomosText}>
              <h3 className="text-title">
                Mais de 1000 gatos encontraram um lar através do nosso trabalho
                desde 2018
              </h3>
              <p className="text-body1">
                O Gatos do Campo de Santana surgiu em 2018 como um projeto
                independente com o objetivo de auxiliar na adoção e qualidade de
                vida dos gatos da colônia. Naquele momento os números
                ultrapassavam 400 gatos soltos, além dos abandonos diários e
                nascimentos de novos filhotes.
              </p>
              <Button
                size="small"
                variant="secondary"
                className={`${styles.quemSomosButton} buttonBoxShadow`}
                href="/quem-somos"
              >
                Saiba mais
              </Button>
              <img
                src={patinhasGroup}
                alt="Patinhas Group"
                className={styles.quemSomosIcon}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.nossosObjWrapper} sectionMargin`}>
          <div className={styles.nossosObjContainer}>
            <div className={styles.nossosObjHeader}>
              <h2 className="text-title">Nossos Objetivos</h2>
              <div className={styles.nossosObjImg}>
                <img src={CatSilhouette} alt="Cat Silhouette" />
              </div>
            </div>
            <div className={styles.nossosObjContent}>
              <div className={styles.nossosObjItem}>
                <div className={styles.nossosObjIcon}>
                  <img src={Star} alt="Star" />
                  <span className={styles.nossosObjNumber}> 1 </span>
                </div>
                <h3 className="text-subtitle">
                  Bem-Estar e Redução da Colônia
                </h3>
              </div>
              <div className={styles.nossosObjItem}>
                <div className={styles.nossosObjIcon}>
                  <span className={styles.nossosObjNumber}> 2 </span>
                  <img src={Star} alt="Star" />
                </div>
                <h3 className="text-subtitle">Mais Lares Temporários</h3>
              </div>
              <div className={styles.nossosObjItem}>
                <div className={styles.nossosObjIcon}>
                  <span className={styles.nossosObjNumber}> 3 </span>
                  <img src={Star} alt="Star" />
                </div>
                <h3 className="text-subtitle">Incentivo ao Voluntariado</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.parceirosSection} sectionMargin`}>
          <div className={styles.parceirosHeader}>
            <div className={styles.parceirosTitle}>
              <h2 className="text-title">Parcerias</h2>
              <IoPawSharp
                color="var(--color-primary-yellow)"
                className={styles.parceirosIcon}
              />
            </div>
            <div className={styles.parceirosText}>
              <p className="text-subtitle">
                Com o apoio dos nossos parceiros, conseguimos resgatar,
                alimentar e cuidar de centenas de gatos.
              </p>
            </div>
          </div>
          <div className={styles.parceirosCarrosel}>
            <CarroselParceiros />
          </div>
          <Link
            to="https://www.instagram.com/gatosdocampodesantana/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className={`${styles.parceirosButton} buttonBoxShadow`}
            >
              Seja um parceiro
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
