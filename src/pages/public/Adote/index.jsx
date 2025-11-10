import { Helmet } from 'react-helmet-async';

export default function Adote() {
  return (
    <>
      <Helmet>
        <title>Adote | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Adote um gatinho e faça a diferença na vida dele."
        />
        <meta property="og:title" content="Adote | Gatos do Campo de Santana" />
        <meta
          property="og:description"
          content="Adote um gatinho e faça a diferença na vida dele."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/adote-thumb.jpg" /> //
        Substituir pelo caminho correto da imagem
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com.br/adote"
        />
      </Helmet>
    </>
  );
}
