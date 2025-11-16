import { CardPagamento } from './CardPagamento';
import { SiPix } from 'react-icons/si';
const SomePixIcon = <SiPix size={32} color="var(--color-neutral-white)" />;
function CardPagamentoPix({ metodoKey, showQrCode, variant = 'primary' }) {
  return (
    <CardPagamento
      metodo="Pix"
      metodoKey={metodoKey}
      showQrCode={showQrCode}
      icone={SomePixIcon}
      variant={variant}
      bgColor="#32BCAD"
    />
  );
}

export default CardPagamentoPix;
