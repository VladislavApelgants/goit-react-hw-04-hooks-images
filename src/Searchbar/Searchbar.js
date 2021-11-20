import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';
import { FcSearch } from 'react-icons/fc';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const getQuery = e => {
    const { value } = e.currentTarget;
    const lowerCase = value.toLowerCase();
    setQuery(lowerCase);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.warn('Пустая строка, введи что-то!');
    }
    onSubmit(query);
    clear();
  };

  const clear = () => {
    setQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchFormButton">
          <span className="SearchFormButtonLabel">
            <FcSearch size="25px" />
          </span>
        </button>

        <input
          className="SearchFormInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={getQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
