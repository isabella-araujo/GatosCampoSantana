import Dropdown from '../Dropdown/Dropdown';
import styles from './FiltrosGatos.module.css';

export default function FiltrosGatos({ filtros, setFiltros }) {
  const optionsGenero = [
    { value: '', title: 'Indiferente' },
    { value: 'macho', title: 'Macho' },
    { value: 'femea', title: 'Fêmea' },
    { value: 'nao-informado', title: 'Não informado' },
  ];

  const optionsCastrado = [
    { value: '', title: 'Indiferente' },
    { value: 'castrado', title: 'Castrado' },
    { value: 'naoCastrado', title: 'Não castrado' },
  ];

  const optionsFivFelv = [
    { value: '', title: 'Indiferente' },
    { value: 'possui', title: 'Possui' },
    { value: 'nao-possui', title: 'Não Possui' },
    { value: 'nao-testado', title: 'Não testado' },
  ];

  const optionsIdade = [
    { value: '', title: 'Indiferente' },
    { value: 'filhote', title: 'Filhote (0-6 meses)' },
    { value: 'jovem', title: 'Jovem (6 meses - 2 anos)' },
    { value: 'adulto', title: 'Adulto (2 - 7 anos)' },
    { value: 'idoso', title: 'Idoso (7+ anos)' },
  ];

  return (
    <div className={styles.filtrosContainer}>
      <Dropdown
        label="Gênero"
        options={optionsGenero}
        value={filtros.genero}
        onSelect={(option) =>
          setFiltros((f) => ({ ...f, genero: option.value }))
        }
      />

      <Dropdown
        label="Idade"
        options={optionsIdade}
        value={filtros.idade}
        onSelect={(option) =>
          setFiltros((f) => ({ ...f, idade: option.value }))
        }
        className="bgColorYellow"
      />

      <Dropdown
        label="Castrado(a)"
        options={optionsCastrado}
        value={filtros.castrado}
        onSelect={(option) =>
          setFiltros((f) => ({ ...f, castrado: option.value }))
        }
      />

      <Dropdown
        label="FIV/FeLV"
        options={optionsFivFelv}
        value={filtros.fivFelv}
        onSelect={(option) =>
          setFiltros((f) => ({ ...f, fivFelv: option.value }))
        }
        className="bgColorYellow"
      />
    </div>
  );
}
