import styles from './CardsPagamento.module.css';
import QRCode from 'qrcode';
import { IoCopyOutline } from 'react-icons/io5';
export function CardPagamento({
  metodo,
  metodoKey,
  icone,
  qrCodeImg,
  showQrCode = false,
  icon = <IoCopyOutline size={20} />,
  label = 'Copiar chave',
  onClick,
  bgColor,
}) {
  return (
    <div className={styles.cardPagamento} style={{ backgroundColor: bgColor }}>
      <div className={styles.cardHeader}>
        <div className={styles.iconeContainer}>{icone}</div>
        <div className={`${styles.cardTitle} text-title`}>{metodo}</div>
      </div>

      <div className={styles.chaveContainer}>
        <p className={`${styles.metodoKey} text-body1`}>{metodoKey}</p>
      </div>

      {showQrCode && qrCodeImg && (
        <div className={styles.qrCodeContainer}>
          <img
            src={qrCodeImg}
            alt={`QR Code para ${metodo}`}
            className={styles.qrCodeImage}
            loading="lazy"
          />
        </div>
      )}

      <div className={styles.copiaColarContainer}>
        <button
          onClick={onClick}
          className={`${styles.botaoCopiar} text-button`}
        >
          {icon}
          {label}
        </button>
      </div>
    </div>
  );
}
export default CardPagamento;
