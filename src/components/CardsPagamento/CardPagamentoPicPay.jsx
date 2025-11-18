import { CardPagamento } from './CardPagamento';
import { SiPicpay } from 'react-icons/si';
import { IoOpenOutline } from 'react-icons/io5';
import QRCodeImg from '../../assets/qr-codes/picpay-qr-code.jpg';

const qrCodeImgPicPay = QRCodeImg;
const SomePicPayIcon = (
  <SiPicpay size={32} color="var(--color-neutral-white)" />
);
export function CardPagamentoPicPay({ metodoKey, showQrCode }) {
  function abrirPicPay() {
    window.open(
      'https://app.picpay.com/user/' + metodoKey,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <CardPagamento
      metodo="PicPay"
      metodoKey={metodoKey}
      qrCodeImg={qrCodeImgPicPay}
      showQrCode={showQrCode}
      icone={SomePicPayIcon}
      icon={<IoOpenOutline size={22} />}
      label="Abrir no PicPay"
      onClick={abrirPicPay}
      bgColor="#21C25E"
    />
  );
}

export default CardPagamentoPicPay;
