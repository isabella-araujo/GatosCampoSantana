import { Helmet } from 'react-helmet-async';
import styles from './ComoAjudar.module.css';
import commonStyles from '../styles/PublicCommon.module.css';
import { Button, CardPagamentoPix, CarroselGatos } from '../../../components';
import { Link } from 'react-router-dom';
import VoluntarioImg from '../../../assets/ComoAjudar/voluntario.webp';
import VoluntarioPaws from '../../../assets/ComoAjudar/paws.svg';
import PiBoneFill from '../../../assets/ComoAjudar/bone.svg';
import {
  IoCarSharp,
  IoHomeSharp,
  IoBalloon,
  IoPawSharp,
  IoHeart,
  IoChevronDown,
  IoArrowRedoSharp,
} from 'react-icons/io5';
import { useState } from 'react';
import CardPagamentoPicPay from '../../../components/CardsPagamento/CardPagamentoPicPay';

export default function ComoAjudar() {
  const [open, setOpen] = useState(false);

  const ToggleEvent = () => {
    setOpen(!open);
  };
  return (
    <>
      <Helmet>
        <title>Como Ajudar | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Saiba como ajudar os gatinhos do campo de Santana."
        />
        <meta
          property="og:title"
          content="Como Ajudar | Gatos do Campo de Santana"
        />
        <meta
          property="og:description"
          content="Saiba como ajudar os gatinhos do campo de Santana."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://gatoscamposantana.web.app/og-images/como-ajudar.jpg`}
        />
        <meta
          property="og:url"
          content="https://gatoscamposantana.web.app/como-ajudar"
        />
        <link
          rel="canonical"
          href="https://gatoscamposantana.web.app/como-ajudar"
        />
      </Helmet>
      <div
        className={`${styles.comoAjudarContainer} ${commonStyles.animatedFadeIn}  ${commonStyles.paddingInlineClamp}`}
      >
        <div className={styles.headerContent}>
          <h1 className="text-display">Junte-se a nós nessa missão </h1>
          <p className="text-subtitle">
            Ajude a transformar a vida de um gatinho, é mais simples do que você
            imagina.
          </p>
        </div>
        <div
          className={`${styles.sejaVoluntarioSection} ${commonStyles.sectionMargin}  ${commonStyles.paddingInlineClamp}`}
        >
          <div className={styles.sejaVoluntarioContainer}>
            <div className={styles.sejaVoluntarioContent}>
              <div className={styles.sejaVoluntarioHeader}>
                <h2 className="text-title">Seja Voluntário</h2>
                <p className="text-body1">
                  Você sabia que pode contribuir com o seu tempo livre? Temos
                  diversas áreas de atuação.
                </p>
              </div>
              <div className={styles.sejaVoluntarioDescription}>
                <p className={`${'text-body1'} ${styles.listTitle}`}>
                  Lista de atividades
                </p>
                <ul className={styles.comoAjudarList}>
                  <li className={`${styles.listItem} text-body1`}>
                    <img
                      src={PiBoneFill}
                      alt="Osso Decorativo"
                      width={28}
                      height={28}
                    />
                    Alimentação diária
                  </li>
                  <li className={`${styles.listItem} text-body1`}>
                    <IoCarSharp size={28} color="var(--color-primary-yellow)" />{' '}
                    Transporte para consultas veterinárias
                  </li>
                  <li className={`${styles.listItem} text-body1`}>
                    <IoHomeSharp
                      size={28}
                      color="var(--color-primary-yellow)"
                    />{' '}
                    Acolhimento em lares temporários
                  </li>
                  <li className={`${styles.listItem} text-body1`}>
                    <IoBalloon size={28} color="var(--color-primary-yellow)" />{' '}
                    Organização de eventos e feiras de adoção
                  </li>
                  <li className={`${styles.listItem} text-body1`}>
                    <IoPawSharp size={28} color="var(--color-primary-yellow)" />{' '}
                    Cuidados diários e socialização dos gatinhos
                  </li>
                  <li className={`${styles.listItem} text-body1`}>
                    <IoHeart size={28} color="var(--color-primary-yellow)" />{' '}
                    Divulgação nas redes sociais e captação de recursos
                  </li>
                </ul>
                <p className="text-caption">
                  Doe um pouco do seu tempo e faça parte dessa corrente do bem.
                  Preencha nosso formulário e venha transformar vidas conosco !
                </p>
                <Link
                  to="https://docs.google.com/forms/d/1uMHcGHGnW5gBgS0URinOHpwZh7Jjarm-tsms1JQHCVk/viewform?ts=6755a1ae&edit_requested=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="buttonBoxShadow">
                    Quero ser um Voluntário
                  </Button>
                </Link>
              </div>
            </div>
            <div className={styles.sejaVoluntarioImgContainer}>
              <div className={styles.sejaVoluntarioImage}>
                <img
                  src={VoluntarioImg}
                  alt="Seja um Voluntário"
                  loading="lazy"
                />
              </div>
              <div className={styles.voluntarioPaws}>
                <img
                  src={VoluntarioPaws}
                  alt="Patas Decorativas"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.sejaLarTemporarioSection} ${commonStyles.sectionMargin}  ${commonStyles.paddingInlineClamp}`}
        >
          <div className={styles.sejaLarTemporarioContainer}>
            <div className={styles.sejaLarTemporarioContent}>
              <h2 className="text-title">Seja um Lar Temporário</h2>
              <p className="text-body1">
                {' '}
                Abra sua casa e seu coração para um gatinho enquanto ele espera
                por uma adoção definitiva. Cada lar temporário salva vidas e dá
                uma nova chance.
              </p>
              <Link
                to="https://ig.me/m/gatosdocampodesantana"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sejaLarTemporarioLink}
              >
                Quero ser um Lar Temporário
              </Link>
            </div>
            <div className={styles.sejaLarTemporarioCarrosel}>
              <CarroselGatos />
            </div>
            <div className={styles.sejaLarTemporarioButton}>
              <Link to="/adote">
                <Button variant="secondary" className="buttonBoxShadow">
                  Gatinhos para adotar
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${styles.outrasFormasAjudarSection} ${commonStyles.sectionMargin}`}
        >
          <div className={styles.outrasFormasAjudarContainer}>
            <div className={styles.doacaoItemsContainer}>
              <div className={styles.doacaoItemsHeader}>
                <h2 className="text-title">Doação de Itens</h2>
                <p className="text-body">
                  Ração, areia, medicamentos e outros itens são sempre
                  bem-vindos! Também aceitamos acessórios usados em bom estado.
                  Confira abaixo nossa lista de necessidades e pontos de
                  entrega.
                </p>
              </div>
              <p className={`${'text-body1'} ${styles.listTitle}`}>
                Itens básicos:
              </p>
              <ul className={styles.comoAjudarList}>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Ração para gatos
                </li>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Areia para gatos
                </li>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Jornal e papel para forração
                </li>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Potes de água e comida
                </li>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Caixas de areia
                </li>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Caminhas e cobertores
                </li>
                <li className={`${styles.listItem} text-body1`}>
                  <IoPawSharp size={28} color="var(--color-primary-blue)" />{' '}
                  Brinquedos e acessórios usados em bom estado
                </li>
              </ul>
              <div className={styles.medicamentosAccordionList}>
                <button
                  className={`${styles.accordionTitle} text-button`}
                  onClick={ToggleEvent}
                >
                  Medicamentos
                  <IoChevronDown
                    size={20}
                    className={open ? styles.iconOpen : ''}
                  />
                </button>
                <div
                  className={`${styles.accordionContent} ${
                    open ? styles.open : ''
                  }`}
                >
                  <ul className={styles.medicamentosList}>
                    <li className="text-body2">
                      <strong>Vermífugos </strong>
                    </li>
                    <li className="text-body2">
                      <strong>Anti-pulgas: </strong> Cronidor, Spray de prata.
                    </li>
                    <li className="text-body2">
                      <strong>Anti-inflamatórios e pomadas: </strong> Maxicam
                      0,5, Mertiolate Spray crepe, Kolagenase, Sulfadiazina,
                      Novacort, Nebacetin.
                    </li>
                    <li className="text-body2">
                      <strong>Vitaminas: </strong> Glicopam Gold, Glicopam Pet,
                      Glicopet Felinos, Hemolitam, Hemolitam Gold, Enisyl-f,
                      Promuncat, Lilyan Cat, Emungel, Lysin Cat, Metacel,
                      Nutrifull Cat, Vita C.
                    </li>
                    <li className="text-body2">
                      <strong>Soluções otológicas:</strong> Otodem, Otoguard,
                      Natalene.
                    </li>
                    <li className="text-body2">
                      <strong>Colírios: </strong> Tobrex, Zymar, Pred-fort.
                    </li>
                    <li className="text-body2">
                      <strong>Probióticos: </strong> Biocanis.
                    </li>
                    <li className="text-body2">
                      <strong>Antibióticos: </strong> Stomorgyl, Agenox CL,
                      Synuloz, Oralguard, Rilexine, Zitrex, Azicox, Doxiciclina,
                      Pentabiótico 1.200.
                    </li>
                    <li className="text-body2">
                      <strong>Material para curativos: </strong> Gaze estéril,
                      soro fisiológico, lenços umedecidos, ataduras.
                    </li>
                  </ul>
                </div>
              </div>
              <p className={styles.itensBasicosText + ' text-body2'}>
                Toda contribuição faz uma enorme diferença para manter nossos
                resgates e tratamentos.
              </p>
            </div>
            <div className={styles.apoioFinanceiroContainer}>
              <div className={styles.apoioFinanceiroHeader}>
                <h2 className="text-title">Apoio Financeiro</h2>
                <p className="text-body2">
                  {' '}
                  Seu apoio mantém nosso projeto vivo! Com doações pontuais ou
                  mensais, você ajuda a cobrir cuidados veterinários, ração e
                  demais despesas dos gatinhos.
                </p>
              </div>
              <div className={styles.cardsApoioFinanceiro}>
                <CardPagamentoPix metodoKey="gatinhoscamposantana@gmail.com" />
                <CardPagamentoPicPay metodoKey="@gatosdocampodesantana" />
              </div>
              <div className={styles.apoioFinanceiroDescription}>
                <p className="text-body2">
                  *Toda ajuda é fundamental! Caso precise das informações
                  bancárias ou queira gerar um boleto, é só nos chamar no direct
                  do instagram.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.entregasSection} ${commonStyles.sectionMargin} ${commonStyles.paddingInlineClamp} ${commonStyles.lastSectionMargin}`}
        >
          <div className={styles.entregasContainer}>
            <div className={styles.entregaPresencial}>
              <h3 className="text-subtitle">Entrega Presencial</h3>
              <p className={styles.entregaPresencialText + ' text-body1'}>
                Nossos voluntários estão no Parque todos os dias, de 9h às 13h.
                Para levar doações, envie uma mensagem no{' '}
                <Link
                  to="https://www.instagram.com/gatosdocampodesantana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.instagramLink}`}
                >
                  Instagram
                </Link>
                <IoArrowRedoSharp
                  size={16}
                  color="var(--color-secondary-blue)"
                />{' '}
                {''}e combinaremos o dia, horário e contato da pessoa que estará
                recebendo.
              </p>
            </div>
            <div className={styles.pontosColeta}>
              <h3 className="text-subtitle">Pontos de Coleta</h3>
              <p className={styles.pontosColetaText + ' text-body1'}>
                Para descobrir os pontos de coleta mais próximos, veja nosso{' '}
                <Link
                  to="https://www.instagram.com/stories/highlights/17905037030180220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.instagramLink}`}
                >
                  destaque no Instagram
                </Link>
                ✨.
                <span>
                  {' '}
                  Observação: Os locais podem mudar, então recomendamos enviar
                  uma mensagem na nossa DM para confirmar antes de ir até o
                  ponto.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
