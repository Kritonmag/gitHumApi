import React, { useContext, useMemo, useState } from 'react';

import '../sass/main.scss'
import { ItemUser } from './ItemUser'
import { AppContext } from '../App';
import { Pagination } from './Pagination';


export const ListItem = () => {
  const { usersWithRepoCount, usersPerPage, usersToShow } = useContext(AppContext);
  const [sortedByRepoAsc, setSortedByRepoAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedUsers = useMemo(() => {
    if (!usersWithRepoCount) return [];

    return usersWithRepoCount.slice().sort((a, b) => {
      if (sortedByRepoAsc) {
        return a.repoCount - b.repoCount;
      } else {
        return b.repoCount - a.repoCount;
      }
    });
  }, [usersWithRepoCount, sortedByRepoAsc]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <>
      <ul className='list__items'>
        {currentUsers.map((user) => (
          <ItemUser key={user.id} user={user} />
        ))}
        <Pagination
          totalUsers={usersToShow.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </ul>
    </>
  );
};