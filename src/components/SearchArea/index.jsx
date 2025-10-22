import { useState } from 'react';
import './styles.css';
import IconButton from '../IconButton/index.jsx';
import { IoSearch } from 'react-icons/io5';

const SearchArea = ({ className = 'search-area', onChange }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onChange(newQuery) && onChange(newQuery);
  };

  return (
    <div className={className}>
      <IconButton icon={IoSearch} size={18} color="#787880" />
      <input
        type="text"
        placeholder="Procurar"
        onChange={handleSearchChange}
        value={query}
      />
    </div>
  );
};

export default SearchArea;
