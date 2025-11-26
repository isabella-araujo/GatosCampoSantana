import { formatDate, formatBirthDate, birthDateInMonths } from './validateDate';

export function formatarGato(gato) {
  const nome =
    gato.nome.charAt(0).toUpperCase() + gato.nome.slice(1).toLowerCase();
  const dataFormatada = formatDate(gato.nascimento);
  const idade = formatBirthDate(dataFormatada);
  const idadeMeses = birthDateInMonths(dataFormatada);

  if (idadeMeses !== null) {
    gato.idadeMeses = idadeMeses;
  }

  const genero =
    gato.genero === 'macho'
      ? 'Macho'
      : gato.genero === 'femea'
      ? 'Fêmea'
      : 'Não informado';

  const castrado = gato.castrado ? 'Castrado(a)' : 'Não castrado(a)';

  const fivFelv =
    gato.possuiFievFelv === 'nao-possui'
      ? 'Negativo Fiv/FeLV'
      : gato.possuiFievFelv === 'possui'
      ? 'Positivo Fiv/FeLV'
      : 'Não informado';

  const atributo = gato.isAdotado
    ? 'Indisponível'
    : gato.disponivelAdocao
    ? 'Adotar'
    : gato.disponivelLarTemporario
    ? 'Lar Temporário'
    : 'Indisponível';

  return {
    ...gato,
    disponivelAdocao: gato.isAdotado ? false : gato.disponivelAdocao,
    disponivelLarTemporario: gato.isAdotado
      ? false
      : gato.disponivelLarTemporario,
    nomeFormatado: nome,
    idade,
    generoFormatado: genero,
    castradoFormatado: castrado,
    fivFelvFormatado: fivFelv,
    atributo,
  };
}
