"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useGames } from "./GameContext";

const NamePlayers = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([{}]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const { selectedGame } = useGames();

  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const numPlayers = searchParams.get("selected_players");

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players"));
    const storedPlayer = storedPlayers?.find(
      (player) => player.id === currentPlayer
    );

    console.log(storedPlayers);
    if (storedPlayer) {
      setPlayerName(storedPlayer.name);
    }
  }, [currentPlayer]);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleNext = (event) => {
    event.preventDefault();

    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const playerIndex = storedPlayers.findIndex(
      (player) => player.id === currentPlayer
    );
    const playerData = {
      id: currentPlayer,
      name: playerName,
      score: 0,
      resetAmount: 0,
      resetAmountDefense: 0,
      darts: [],
    };
    if (playerIndex === -1) {
      storedPlayers.push(playerData);
    } else {
      storedPlayers[playerIndex] = playerData;
      setPlayerName("");
    }
    localStorage.setItem("players", JSON.stringify(storedPlayers));
    setPlayerName("");

    if (currentPlayer < numPlayers) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      localStorage.setItem("currentDart", 0);
      localStorage.setItem("currentPlayer", 1);
      router.push(`/games/${selectedGame}/game`);
    }
  };
  return (
    <div className="center container">
      <h1 className="code">Votre nom joueur {currentPlayer}</h1>
      <form onSubmit={handleNext}>
        <input
          type="text"
          value={playerName}
          className="select"
          onChange={handleNameChange}
        />
        <button className="btn bottom" onClick={handleNext}>
          <p>Suivant</p>
        </button>
      </form>
    </div>
  );
};

export default NamePlayers;
