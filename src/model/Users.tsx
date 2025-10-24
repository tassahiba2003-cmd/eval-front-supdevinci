// src/model/Users.tsx

// Interface pour un utilisateur individuel
// Basée sur les champs requis en Niveau 1 [cite: 11, 12]
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string; // Pour la photo 
  age: number;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
  // Ajoute d'autres champs de l'API si nécessaire
}

// Interface pour la réponse de l'API (liste)
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}