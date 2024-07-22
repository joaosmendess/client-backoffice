export const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove todos os caracteres não numéricos
      .replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona ponto após os dois primeiros dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona ponto após os próximos três dígitos
      .replace(/\.(\d{3})(\d)/, '.$1/$2') // Adiciona barra após os próximos três dígitos
      .replace(/(\d{4})(\d)/, '$1-$2') // Adiciona hífen após os próximos quatro dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita o número de dígitos após o hífen
  };
  