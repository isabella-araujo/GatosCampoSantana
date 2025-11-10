import { Helmet } from 'react-helmet-async';

export default function SobreNos() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Saiba mais sobre o projeto Gatos do Campo de Santana!"
        />
        <meta
          property="og:title"
          content="Sobre Nós | Gatos do Campo de Santana"
        />
        <meta
          property="og:description"
          content="Saiba mais sobre o projeto Gatos do Campo de Santana!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/sobre-nos-thumb.jpg" />{' '}
        /*Substitua pelo caminho correto da imagem*/
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com.br/sobre-nos"
        />
      </Helmet>
    </>
  );
}
