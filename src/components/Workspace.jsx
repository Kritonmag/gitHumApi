import React, { useContext } from 'react';

import '../sass/main.scss'
import { AppContext } from '../App';


export const Workspace = () => {
  const { selectedUser } = useContext(AppContext);


  if (selectedUser) {
    return (
      <div className='workspace'>
        <img src={selectedUser.avatar} alt="image" />
        <p className="search-text"><span>Имя: </span>{selectedUser.name}</p>
        <p className="search-text"><span>Кол-во репозиторий: </span>{selectedUser.repoCount}</p>
        <p className="search-text"><span>Город: </span>{selectedUser.location}</p>
        <p className="search-text"><span>О себе: </span>{selectedUser.bio}</p>
      </div>
    )
  } else {
    return null
  }
};
