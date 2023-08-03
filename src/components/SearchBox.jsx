import React, { useContext } from 'react';
import '../sass/main.scss';
import { AppContext } from '../App';

export const SearchBox = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='input__container'>
        <i className='icon__placeholder'></i>
        <input
          className='input'
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
        />
      </div>
      <button className='form__btn' type='button' onClick={handleSearch}>
        Поиск
      </button>
    </form>
  );
};