import { useEffect, useRef } from 'react';
import './SearchBar.css'; 


interface SearchBarProps {
  query: string; 
  onQueryChange: (newValue: string) => void; 
}

export const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { 
    ref.current?.focus();
  }, []); 
  return (
    <div className="search-container">
      <input
        ref={ref} 
        type="text"
        placeholder="Rechercher par nom, prénom, email..."
        className="search-input"
        value={query} 
        onChange={(e) => onQueryChange(e.target.value)} 
      />
    </div>
  );
};
