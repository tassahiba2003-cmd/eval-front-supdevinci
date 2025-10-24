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
      <div className="user-grid">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
       {filteredUsers.length === 0 && (
        <p className="no-results-text">
          Aucun utilisateur trouvé pour "{searchQuery}"
        </p>
      )}
    </div>
  );
};