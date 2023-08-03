import React, { useEffect, useState } from 'react';
import './sass/main.scss'
import { Header } from './components/Header';
import { ListItem } from './components/ListItem';
import { Workspace } from './components/Workspace';

export const AppContext = React.createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [usersToShow, setUsersToShow] = useState([]);
  const [usersWithRepoCount, setUsersWithRepoCount] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

  const handleSearch = () => {
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const limitedResults = data.items.slice(0, 20);
        setUsersToShow(limitedResults);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    const fetchRepoCount = async () => {
      const usersWithCount = await Promise.all(
        usersToShow.map((user) =>
          fetch(`https://api.github.com/users/${user.login}`)
            .then((response) => response.json())
            .then((data) => (
              {
                login: user.login,
                repoCount: data.public_repos,
                id: data.id,
                avatar: data.avatar_url,
                name: data.name,
                location: data.location,
                bio: data.bio
              }))
        )
      );
      setUsersWithRepoCount(usersWithCount);
    };

    if (usersToShow.length > 0) {
      fetchRepoCount();
    }
  }, [usersToShow]);

  const lastUserIndex = currentPage * usersPerPage;
  const friestUserIndex = lastUserIndex - usersPerPage;
  const currentUser = usersToShow.slice(friestUserIndex, lastUserIndex)

  const contextValue = {
    searchTerm,
    setSearchTerm,
    handleSearch,
    usersToShow,
    usersWithRepoCount,
    selectedUser,
    setSelectedUser,
    usersPerPage,
    currentUser
  };

  return (
    <div className="container">
      <AppContext.Provider value={contextValue}>
        <Header />
        <div className='flex'>
          <ListItem />
          <Workspace />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
