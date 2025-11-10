import { Helmet } from 'react-helmet-async';

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
        <meta property="og:image" content="/assets/doe-thumb.jpg" />{' '}
        /*Substituir pelo caminho correto da imagem*/
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com.br/doe"
        />
      </Helmet>
    </>
  );
}
