import styles from './Doe.module.css';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ApadrinhamentoImg from '../../../assets/Doe/apadrinhamento.webp';
import VakinhaImg from '../../../assets/Doe/vakinha.webp';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import {
  Button,
  CardPagamentoPix,
  CardPagamentoPicPay,
} from '../../../components';

export default function Doe() {
  return (
    <>
      <Helmet>
        <title>Doe | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Saiba como doar para ajudar os gatinhos do campo de Santana."
        />
        <meta property="og:title" content="Doe | Gatos do Campo de Santana" />
        <meta
          property="og:description"
          content="Saiba como doar para ajudar os gatinhos do campo de Santana."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://gatosdocampodesantana.com/og-images/doe.webp`}
        />
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com/doe"
        />
        <link rel="canonical" href="https://gatosdocampodesantana.com/doe" />
      </Helmet>
      <div className={styles.doeContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <h1 className="text-display">
              Faça a Diferença na Vida de um Gatinho
            </h1>
            <p className="text-subtitle">
              Nossa missão é resgatar, tratar e dar uma vida cheia de amor aos
              gatinhos que mais precisam. Mas não conseguimos fazer isso
              sozinhos. Cada contribuição, não importa o tamanho, ajuda a
              proporcionar alimentação, tratamentos veterinários e um ambiente
              acolhedor enquanto aguardam por uma família.
            </p>
          </div>
          <div className={styles.donationMethods}>
            <CardPagamentoPix
              metodoKey="gatinhoscamposantana@gmail.com"
              showQrCode={true}
            />
            <CardPagamentoPicPay
              metodoKey="gatosdocampodesantana"
              showQrCode={true}
            />
          </div>
        </div>
        <div className={`${styles.apadrinhamentoSection} sectionMargin`}>
          <div className={styles.apadrinhamentoContainer}>
            <div className={styles.title}>
              <h2 className="text-title">Apadrinhamento dos Gatos do Campo</h2>
            </div>
            <div className={styles.imagem}>
              <img
                src={ApadrinhamentoImg}
                alt="Apadrinhe um Gatinho"
                loading="lazy"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.apadrinhamentoDescription}>
                <p className="text-body1">
                  Desde 2018, cuidamos de uma das maiores colônias felinas do
                  Rio de Janeiro. Já realizamos mais de 1.000 adoções, mas ainda
                  há cerca de 130 gatos no local, além de abandonos constantes.
                  Nosso trabalho voluntário garante alimentação, cuidados e
                  busca por lares, mas os custos são altos e contamos com sua
                  ajuda para continuar.
                  <span className={styles.apoiaSeSpan}>
                    Com a sua ajuda no{' '}
                    {
                      <Link
                        to="https://apoia.se/camposaudavel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.apoiaSeLink} text-body2`}
                      >
                        Apoia.se
                      </Link>
                    }{' '}
                    você coopera com:
                  </span>
                </p>
              </div>
              <ul className={`${styles.apadrinhamentoBulletsList} text-body1`}>
                <li className={styles.bulletItem}>
                  <IoCheckmarkCircleOutline
                    size={23}
                    color="var(--color-primary-yellow)"
                  />
                  Tratamento veterinário dos gatos do campo
                </li>
                <li className={styles.bulletItem}>
                  <IoCheckmarkCircleOutline
                    size={23}
                    color="var(--color-primary-yellow)"
                  />{' '}
                  Garantia da alimentação dos gatinhos
                </li>
                <li className={styles.bulletItem}>
                  <IoCheckmarkCircleOutline
                    size={23}
                    color="var(--color-primary-yellow)"
                  />{' '}
                  Outros gastos
                </li>
              </ul>
              <div className={styles.apadrinhamentoButton}>
                <Link
                  to="https://apoia.se/camposaudavel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    size="large"
                    className="buttonBoxShadow"
                  >
                    Apadrinhe pelo Apoia.se
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.vakinhaSection} sectionMargin`}>
          <div className={styles.vakinhaContainer}>
            <div className={styles.title}>
              <h2 className="text-title">Vakinha da Clínica Veterinária</h2>
            </div>
            <div className={styles.imagem}>
              <img
                src={VakinhaImg}
                alt="Ajude na vakinha da Clínica Veterinária"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.vakinhaDescription}>
                <p>
                  Com a nossa dívida veterinária em nível crítico, sua ajuda é
                  urgente para mantermos os resgates de gatos vítimas de
                  acidentes e doenças. Cada doação, mesmo pequena, ou um simples
                  compartilhamento, nos ajuda a continuar salvando gatos que
                  dependem de nós. Juntos, fazemos a diferença!
                </p>
              </div>
              <div className={styles.vakinhaButton}>
                <Link
                  to="https://www.vakinha.com.br/vaquinha/divida-vet-angels"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" className="buttonBoxShadow">
                    Doar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
