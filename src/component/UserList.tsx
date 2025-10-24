import { useEffect, useState, useMemo } from 'react';
import type { User } from '../model/Users';
import { getUsers } from '../data/InteractApi';
import { UserCard } from './UserCard';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination'; 
import './UserList.css';

const USERS_PER_PAGE = 10;

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers();
        setUsers(data.users); 
      } catch (err: any) {
        setError(err.message || 'Impossible de charger les utilisateurs.');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []); 

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      return users;
    }
    return users.filter((user) => {
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();
      const email = user.email.toLowerCase();
      return (
        firstName.includes(query) ||
        lastName.includes(query) ||
        email.includes(query)
      );
    });
  }, [users, searchQuery]);

  const sortedAndFilteredUsers = useMemo(() => {
    const usersToSort = [...filteredUsers];
    if (sortCriteria === 'name') {
      usersToSort.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (sortCriteria === 'age') {
      usersToSort.sort((a, b) => a.age - b.age);
    }
    return usersToSort;
  }, [filteredUsers, sortCriteria]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return sortedAndFilteredUsers.slice(startIndex, endIndex);
  }, [sortedAndFilteredUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortCriteria]);


  if (loading) {
    return <div className="loading-error-center">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error-center error-text">{error}</div>;
  }

  return (
    <div className="user-list">
      <h1>Liste des Utilisateurs</h1>

      <div className="controls-container">
        <SearchBar 
          query={searchQuery}
          onQueryChange={setSearchQuery} 
        />
        <div className="sort-container">
          <label htmlFor="sort">Trier par :</label>
          <select 
            id="sort" 
            className="sort-select"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="default">Par défaut</option>
            <option value="name">Nom (A-Z)</option>
            <option value="age">Âge (Croissant)</option>
          </select>
        </div>
      </div>

      <div className="user-grid">
        {paginatedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {paginatedUsers.length === 0 && searchQuery.length > 0 && (
        <p className="no-results-text">
          Aucun utilisateur trouvé pour "{searchQuery}"
        </p>
      )}

    
      <Pagination
        total={sortedAndFilteredUsers.length}
        page={currentPage}                     
        perPage={USERS_PER_PAGE}               
        onPage={setCurrentPage}                
      />

    </div>
  );
};

