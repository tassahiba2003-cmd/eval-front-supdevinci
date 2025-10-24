import { useEffect, useState } from 'react';
import type { User } from '../model/Users';
import { getUsers } from '../data/InteractApi'; 
import { UserCard } from './UserCard';
import './UserList.css';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-list">
      <h1>Liste des Utilisateurs</h1>
      <div className="user-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};