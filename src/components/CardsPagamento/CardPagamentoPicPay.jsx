import { CardPagamento } from './CardPagamento';
import { SiPicpay } from 'react-icons/si';
const SomePicPayIcon = (
  <SiPicpay size={32} color="var(--color-neutral-white)" />
);
function CardPagamentoPicPay({ metodoKey, showQrCode, variant = 'primary' }) {
  return (
    <CardPagamento
      metodo="PicPay"
      metodoKey={metodoKey}
      showQrCode={showQrCode}
      icone={SomePicPayIcon}
      variant={variant}
      bgColor="#21C25E"
    />
  );
}

export default CardPagamentoPicPay;
