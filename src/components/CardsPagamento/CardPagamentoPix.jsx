import { useState } from 'react';
import { CardPagamento } from './CardPagamento';
import { SiPix } from 'react-icons/si';
import QRCodeImg from '../../assets/qr-codes/qrcode-pix.png';
const SomePixIcon = <SiPix size={32} color="var(--color-neutral-white)" />;
export function CardPagamentoPix({
  metodoKey,
  showQrCode = true,
  icone = SomePixIcon,
  label = 'Copiar chave',
}) {
  const [copiadoChave, setCopiadoChave] = useState(false);

  function copiarChave() {
    navigator.clipboard.writeText(metodoKey);
    setCopiadoChave(true);
    setTimeout(() => setCopiadoChave(false), 2000);
  }

  return (
    <CardPagamento
      metodo="Pix"
      metodoKey={metodoKey}
      qrCodeImg={QRCodeImg}
      showQrCode={showQrCode}
      icone={icone}
      bgColor="#32BCAD"
      label={copiadoChave ? 'Copiado!' : label}
      onClick={copiarChave}
    />
  );
}
export default CardPagamentoPix;
