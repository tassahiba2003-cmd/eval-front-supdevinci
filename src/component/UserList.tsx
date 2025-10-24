import { useEffect, useState, useMemo  } from 'react';
import type { User } from '../model/Users';
import { getUsers } from '../data/InteractApi'; 
import { UserCard } from './UserCard';
import { SearchBar } from './SearchBar';
import './UserList.css';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("default"); 

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





  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-list">
      <h1>Liste des Utilisateurs</h1>
       <SearchBar 
        query={searchQuery}
        onQueryChange={setSearchQuery} 
      />

              <div className="sort-container">
          <label htmlFor="sort-select">Trier par :</label>
          <select 
            id="sort-select"
            className="sort-select"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="default">Par défaut</option>
            <option value="name">Nom (A-Z)</option>
            <option value="age">Âge (Croissant)</option>
          </select>
        </div>
            
      
      <div className="user-grid">
        {sortedAndFilteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* On base le "aucun résultat" sur la liste finale */}
      {sortedAndFilteredUsers.length === 0 && (
        <p className="no-results-text">
          Aucun utilisateur trouvé pour "{searchQuery}"
        </p>
      )}
    </div>
  );
};