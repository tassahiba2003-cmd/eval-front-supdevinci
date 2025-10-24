import type { User } from "../model/Users";
import { Link } from "react-router-dom";
import './UserCard.css';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    // Link rend toute la carte cliquable et mène vers la page détail
    <Link to={`/user/${user.id}`} className="user-card-link">
      <div className="user-card">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-image"
        />
        <div className="user-content">
          {/* On affiche les infos demandées : Prénom, Nom, Email */}
          <h3 className="user-name">{user.firstName} {user.lastName}</h3>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
    </Link>
  );
};