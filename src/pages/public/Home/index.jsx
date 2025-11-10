import { Helmet } from 'react-helmet-async';
import MobileNotSupported from '../Others/MobileNotSupported';
import PageNotFound from '../Others/PageNotFound';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Bem-vindos ao site dos Gatos do Campo de Santana!"
        />
        <meta property="og:title" content="Home | Gatos do Campo de Santana" />
        <meta
          property="og:description"
          content="Bem-vindos ao site dos Gatos do Campo de Santana!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/home-thumb.jpg" />{' '}
        /*Substitua pelo caminho correto da imagem*/
        <meta
          property="og:url"
          content="https://gatosdocampodesantana.com.br/"
        />
      </Helmet>
    </>
  );
}
