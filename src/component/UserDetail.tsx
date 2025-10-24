import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../data/InteractApi"; 
import type { User } from "../model/Users";
import './UserDetail.css';

function UserDetail() {
  const { id } = useParams<{ id: string }>(); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadUser = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const data = await getUser(parseInt(id)); // Doit être getUser(...)
          
          setUser(data);
        } catch (err: any) {
          setError(err.message || "Utilisateur non trouvé ou erreur réseau.");
        } finally {
          setLoading(false);
        }
      };
      loadUser();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (user) {
    return (
      <div className="user-detail-container">
        <Link to="/" className="back-link">
          &larr; Retour à la liste
        </Link>
        <div className="user-detail-card">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="user-detail-image"
          />
          <div className="user-detail-content">
            <h1>{user.firstName} {user.lastName}</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Âge:</strong> {user.age}</p>
            <p><strong>Société:</strong> {user.company.name}</p>
            <p><strong>Ville:</strong> {user.address.city}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return <div>Utilisateur non trouvé.</div>;
}

export default UserDetail;