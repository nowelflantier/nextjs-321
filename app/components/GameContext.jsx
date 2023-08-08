"use client";
import React, { useEffect, createContext, useContext, useState } from "react";
// const localData = localStorage.getItem("selectedGame");
// Création du Contexte des Jeux
const GamesContext = createContext();

// Composant Provider qui rend le contexte accessible aux autres composants
export function GamesProvider({ children }) {
  const games = [
    {
      id: 1,
      name: "321",
      path: `/games/321/select-players?new_game=true&name=321`,
      category: "darts",
      icon: "/dart-aim.svg",
      title: "let's play darts !",
      description: "321 Zap - Darts scorer - v1.1",
      emoji: "🎯",
      width: "80",
    },
    {
      id: 2,
      name: "killer",
      path: `/games/killer/select-players?new_game=true&name=killer`,
      category: "dice",
      icon: "/dice.png",
      title: "let's play dice !",
      description: "Killer - Dice scorer - W.I.P.",
      emoji: "🎲",
      width: "80",
    },
  ];

  const getSelectedGameDetails = () => {
    if (selectedGame !== null) {
      return games.find(game => game.name === selectedGame);
    }
    return null;
  };

   // Utilisez une fonction pour initialiser selectedGame afin que localStorage soit lu uniquement au moment de l'initialisation
   const [selectedGame, setSelectedGame] = useState(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("selectedGame");
      return localData ? localData : null;
    }
    return null;
  });

  // Écoutez les changements de selectedGame et mettez à jour localStorage en conséquence
  useEffect(() => {
    if (selectedGame !== null) {
      localStorage.setItem("selectedGame", selectedGame);
    }
  }, [selectedGame]);
  return (
    <GamesContext.Provider value={{ games, setSelectedGame, selectedGame, getSelectedGameDetails }}>
      {children}
    </GamesContext.Provider>
  );
}

// Hook personnalisé pour utiliser le Contexte des Jeux
export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error(
      "useGames doit être utilisé à l'intérieur d'un GamesProvider"
    );
  }
  return context;
}
