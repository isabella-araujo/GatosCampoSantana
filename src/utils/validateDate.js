export function formatDate(value) {
  if (!value) return 'DD/MM/AAAA';
  if (value?.toDate && typeof value.toDate === 'function') {
    return value.toDate().toLocaleDateString('pt-BR');
  }
  if (value instanceof Date) {
    return value.toLocaleDateString('pt-BR');
  }
  try {
    return new Date(value).toLocaleDateString('pt-BR');
  } catch {
    return 'DD/MM/AAAA';
  }
}

export function formartBirthDate(date) {
  if (!date) return '';
  const [dia, mes, ano] = date.split('/').map(Number);
  if (!dia || !mes || !ano) return '';

  const data = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  const diferenca = hoje - data;
  const diferencaDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const diferencaMeses =
    hoje.getFullYear() * 12 +
    hoje.getMonth() -
    (data.getFullYear() * 12 + data.getMonth());
  const diferencaAnos = hoje.getFullYear() - data.getFullYear();

  const aindaNaoFezAniversario =
    hoje.getMonth() < data.getMonth() ||
    (hoje.getMonth() === data.getMonth() && hoje.getDate() < data.getDate());
  const anosCorrigido = aindaNaoFezAniversario
    ? diferencaAnos - 1
    : diferencaAnos;

  if (diferencaDias < 30) {
    return `${diferencaDias} ${diferencaDias === 1 ? 'dia' : 'dias'}`;
  } else if (anosCorrigido < 1) {
    return `${diferencaMeses} ${diferencaMeses === 1 ? 'mês' : 'meses'}`;
  } else {
    return `${anosCorrigido} ${anosCorrigido === 1 ? 'ano' : 'anos'}`;
  }
}
