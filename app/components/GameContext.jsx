'use client'
import React, { createContext, useContext, useState } from 'react';

// Création du Contexte des Jeux
const GamesContext = createContext();

// Composant Provider qui rend le contexte accessible aux autres composants
export function GamesProvider({ children }) {
  const games = [
    { 
      id: 1, 
      name: "321", 
      path:`/games/321/select-players?new_game=true&name=321`, 
      category: "darts", 
      icon: "/dart-aim.svg", 
    }, 
    { 
      id: 2, 
      name: "killer", 
      path:`/games/killer/select-players?new_game=true&name=killer`, 
      category: "dice", 
      icon: "/dice.png", 
    },
  ];
  const [selectedGame, setSelectedGame] = useState(null)

  return (
    <GamesContext.Provider value={{ games, setSelectedGame, selectedGame }}>
      {children}
    </GamesContext.Provider>
  );
}

// Hook personnalisé pour utiliser le Contexte des Jeux
export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error('useGames doit être utilisé à l\'intérieur d\'un GamesProvider');
  }
  return context;
}
