import React, { useContext } from 'react'
import { AppContext } from '../App';

export const Pagination = ({ totalUsers, paginate, currentPage }) => {

  const { usersPerPage } = useContext(AppContext);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      <ul>
        {pageNumbers.map((number) => (
          <li className={currentPage === number ? 'page__selected' : 'page__item'}
            key={number}
            onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};