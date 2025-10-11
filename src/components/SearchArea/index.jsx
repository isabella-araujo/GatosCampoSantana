import './styles.css';
import IconButton from '../IconButton/index.jsx';
import { IoSearch } from 'react-icons/io5';

const SearchArea = ({ className = 'search-area', onChange, value }) => {
  return (
    <div className={className}>
      <IconButton icon={IoSearch} size={18} color="#787880" />
      <input
        type="text"
        placeholder="Procurar"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default SearchArea;
