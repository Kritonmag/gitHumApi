import React, { useContext } from 'react';

import '../sass/main.scss'
import { AppContext } from '../App';

export const ItemUser = ({ user }) => {

  const { selectedUser, setSelectedUser } = useContext(AppContext);

  return (
    <li className={`item ${user.id === selectedUser?.id ? 'selected' : ''}`}
      onClick={() => setSelectedUser(user)}>
      <p className='item__text'><strong>{user.login}</strong></p>
      <p className='item__repo'>{user.repoCount}</p>
    </li>
  )
}