import { useEffect, useState } from 'react';
import styles from './CardsPagamento.module.css';
import QRCode from 'qrcode';
import { IoCopyOutline } from 'react-icons/io5';

export function CardPagamento({
  metodo,
  metodoKey,
  icone,
  showQrCode = false,
  variant = 'primary',
  bgColor,
}) {
  const [copiadoChave, setCopiadoChave] = useState(false);
  const [copiadoQr, setCopiadoQr] = useState(false);
  const [qrCodeImg, setQrCodeImg] = useState(null);

  useEffect(() => {
    if (!metodoKey) return;

    QRCode.toDataURL(metodoKey)
      .then((url) => setQrCodeImg(url))
      .catch((err) => console.error(err));
  }, [metodoKey]);

  function copiarChave() {
    navigator.clipboard.writeText(metodoKey);
    setCopiadoChave(true);
    setTimeout(() => setCopiadoChave(false), 2000);
  }

  function copiarQRCode() {
    if (!qrCodeImg) return;
    navigator.clipboard.writeText(qrCodeImg);
    setCopiadoQr(true);
    setTimeout(() => setCopiadoQr(false), 2000);
  }

  return (
    <div className={styles.cardPagamento} style={{ backgroundColor: bgColor }}>
      <div className={styles.cardHeader}>
        <div className={styles.iconeContainer}>{icone}</div>
        <div className={`${styles.cardTitle} text-title`}>{metodo}</div>
      </div>
      <div className={styles.chaveContainer}>
        <h3 className={`${styles.metodoKey} text-body1`}>{metodoKey}</h3>
      </div>

      {showQrCode && qrCodeImg && (
        <div className={styles.qrCodeContainer}>
          <img
            src={qrCodeImg}
            alt={`QR Code para ${metodo}`}
            className={styles.qrCodeImage}
          />
        </div>
      )}

      <div className={`${styles.copiaColarContainer} ${styles[variant]}`}>
        <button
          onClick={copiarChave}
          className={`${styles.botaoCopiar} text-button`}
        >
          <IoCopyOutline size={22} />
          {copiadoChave ? 'Copiado!   ' : 'Copiar chave'}
        </button>

        <button
          onClick={copiarQRCode}
          className={`${styles.botaoCopiar} text-button`}
        >
          <IoCopyOutline size={22} />
          {copiadoQr ? 'Copiado!   ' : 'Copiar QRCode'}
        </button>
      </div>
    </div>
  );
}
