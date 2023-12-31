"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGames } from "./GameContext";



const PlayerSelect = () => {
  const searchParams = useSearchParams();
  const [numPlayers, setNumPlayers] = useState(1);
  const router = useRouter();
  const {selectedGame, setSelectedGame} = useGames();

  useEffect(() => {
    // reset les données locales si le paramètre d'url est respecté
    if (searchParams.get("new_game")) {
      localStorage.removeItem("numPlayers");
      localStorage.removeItem("currentDart");
      localStorage.removeItem("players");
      localStorage.removeItem("winner");
      localStorage.removeItem("selectedGame");
    }
    // Read from local storage on initial render
    const storedNumPlayers = localStorage.getItem("numPlayers");
    if (storedNumPlayers) {
      setNumPlayers(storedNumPlayers);
    }
    if (searchParams.get("name")) {
      setSelectedGame(searchParams.get("name"));
      localStorage.setItem("selectedGame", searchParams.get("name"));
    }
  }, []);

  const handlePlayerSelect = (e) => {
    setNumPlayers(e.target.value);
  };

  const handleStart = () => {
    localStorage.setItem("numPlayers", numPlayers);

    router.push(
      `/games/${selectedGame}/select-players-name?selected_players=${numPlayers}`
    );
  };

  return (
    <div className="container center">
      <p className="code">Sélectionnez le nombre de joueurs: {numPlayers}</p>
      <select
        className="select"
        value={numPlayers}
        onChange={handlePlayerSelect}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <button className="btn bottom" onClick={handleStart}>
        Commencer
      </button>
    </div>
  );
};

export default PlayerSelect;
