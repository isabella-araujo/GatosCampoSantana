import { Helmet } from 'react-helmet-async';

export default function ComoAjudar() {
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
          content="/assets/como-ajudar-thumb.jpg"
        />{' '}
        /*Substituir pelo caminho correto da imagem*/
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com.br/como-ajudar"
        />
      </Helmet>
    </>
  );
}
