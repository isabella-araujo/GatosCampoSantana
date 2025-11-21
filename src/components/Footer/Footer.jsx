import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import svgVector from '../../assets/svg/vector_footer.svg';
import {
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLocation,
} from 'react-icons/io5';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <img
        src={svgVector}
        alt="onda decorativa de rodapé"
        className={styles.footerVector}
      />
      <div className={styles.footerBackground}>
        <div className={styles.footerMain}>
          <div className={styles.footerContent}>
            <div className={styles.about}>
              <h2 className="text-title">Gatos do Campo de Santana</h2>
              <p className="text-subtitle">
                Ajude-nos a cuidar e encontrar lares para os gatos do Campo de
                Santana
              </p>
            </div>
            <div className={styles.links}>
              <h3 className="text-subtitle">Contato:</h3>
              <p className="text-body1">
                Email: gatinhoscamposantana@gmail.com
              </p>
              <div className={styles.socialMedia}>
                <Link
                  to="https://whatsapp.com/channel/0029Vb5yS7z8F2pD3QxrPE3c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <IoLogoWhatsapp
                    size={24}
                    color="var(--color-primary-yellow)"
                  />
                </Link>
                <Link
                  to="https://www.instagram.com/gatosdocampodesantana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <IoLogoInstagram
                    size={24}
                    color="var(--color-primary-yellow)"
                  />
                </Link>
                <Link
                  to="https://www.facebook.com/share/1CQEiqbdJb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <IoLogoFacebook
                    size={24}
                    color="var(--color-primary-yellow)"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.helpSection}>
            <h3 className="text-subtitle">Formas de nós ajudar</h3>
            <ul className={styles.helpList}>
              <li className={styles.helpListItem}>Apadrinhe um gatinho.</li>
              <li className={styles.helpListItem}>Seja um voluntário.</li>
              <li className={styles.helpListItem}>Doe: </li>
            </ul>
            <div className={styles.donationLinks}>
              <Link
                to="https://apoia.se/camposaudavel"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donationLink}
              >
                Apoia-se
              </Link>
              <Link
                to="https://www.vakinha.com.br/vaquinha/divida-vet-angels"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donationLink}
              >
                Vakinha
              </Link>
              <Link
                to="https://app.picpay.com/user/gatosdocampodesantana"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donationLink}
              >
                Pic-Pay
              </Link>
            </div>
          </div>
          <div className={styles.locationSection}>
            <div className={styles.locationHeader}>
              <IoLocation size={24} color="var(--color-neutral-white)" />
              <h3 className="text-subtitle">Onde estamos:</h3>
            </div>

            <p className="text-subtitle">
              Praça da República, s/n Campo de Santana, RJ CEP: 20211-360
            </p>
          </div>
        </div>
        <div className={styles.footerDivider} />
        <footer className={styles.footer}>
          <p className="text-caption">
            © 2025 Gatos do Campo de Santana, Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
