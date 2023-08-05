"use client";

import React, { useRef, useState, useEffect } from "react";
import PlayerList from "@/app/components/PlayerList";
import Image from "next/image";
import { useGames } from "@/app/components/GameContext";

const EndGameWinner = () => {
  const [darts, setDarts] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isWinner, setIsWinner] = useState({});
  const [isLoaded, setIsLoaded] = useState(false)

  const [winner, setWinner] = useState({});
  const inputRef = useRef();
  const playerIndex = parseInt(winner.id, 10);
  const currentUserScore = players[playerIndex]?.score;

  useEffect(() => {
    {selectedGame !== null && setIsLoaded(true)}
 });
  useEffect(() => {
    if (localStorage.getItem("gameId") === null) {
      const gameId =
        "game-" +
        Math.random().toString(36).substr(2, 9) +
        Date.now().toString(36);
      localStorage.setItem("gameId", gameId);
    }
    if (localStorage.getItem("currentPlayer") !== null) {
      // setCurrentPlayer(parseInt(localStorage.getItem("currentPlayer", 10)));
      setWinner(JSON.parse(localStorage.getItem("winner")));
      setDarts(JSON.parse(localStorage.getItem("dart")));
      setPlayers(JSON.parse(localStorage.getItem("players")));
    }
  }, []);

  useEffect(() => {
    if (isWinner.defined) {
      // Logic for when a player wins
      const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
      const playerJSON = JSON.stringify(storedPlayers[playerIndex]);
      localStorage.setItem("winner", playerJSON);

      console.log(`Player ${isWinner.player} is the winner!`);
      console.log(isWinner);
    }
  }, [isWinner]);
  const { getSelectedGameDetails, selectedGame } = useGames();
  const selectedGameDetails = getSelectedGameDetails();

  return (
    isLoaded && (
    <div className="center container">
      <div className="active">
        <p className="code">fin de partie</p>
        <Image
          className="logo"
          src={selectedGameDetails?.icon ?? "/score-board.png"}
          alt={selectedGameDetails?.title ?? "Chargement.."}
          width={selectedGameDetails?.width ?? 80}
          height={selectedGameDetails?.height ?? 80}
          priority
        />
        <h1>bravo {winner.name}</h1>
        <h2>🥇</h2>
        <div className="grid">
          <div className="card dashboard">
            <h2>Fléchettes lancées</h2>
            <p>{winner.dartsLength}</p>
          </div>
          <div className="card dashboard">
            <h2>Moyenne globale</h2>
            <p>{(321 / winner.dartsLength).toFixed(2)}</p>
          </div>
          <div className="card dashboard">
            <h2>Reset faits</h2>
            <p>{winner.resetAmount}</p>
          </div>
          <div className="card dashboard">
            <h2>Reset subis</h2>
            <p>{winner.resetAmountDefense}</p>
          </div>
        </div>
      </div>
      <PlayerList players={players} currentPlayer={winner.id} />
    </div>)
  );
};

export default EndGameWinner;
