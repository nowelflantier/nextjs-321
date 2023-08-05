"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import CurrentPlayerDashboard from "@/app/components/CurrentPlayerDashboard";
import PlayerList from "@/app/components/PlayerList";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
// import PlayerContext from "@/app/components/PlayerContext";
import { useRouter } from "next/navigation";
import { useGames } from "@/app/components/GameContext";
import useGameLogic from "@/app/components/useGameLogic";
import Popup from "@/app/components/Popup";

const Game = () => {
  const {
    players,
    setPlayers,
    currentPlayer,
    setCurrentPlayer,
    currentDart,
    setCurrentDart,
    newCurrentScore,
    setNewCurrentScore,
    isDisabled,
    setIsDisabled,
    handleInputChange,
    handleNextPlayer,
    isWinner,
    setIsWinner,
    isNotValidScore,
    handleNewScore,
    SetIsNotValidScore,
    playerIndex,
    isPopupOpen,
    setIsPopupOpen,
    popupMessage,
    setPopupMessage,
    // other functions as needed
  } = useGameLogic({
    players: [],
    currentPlayer: 1,
    currentDart: 0,
    newCurrentScore: "",
    isDisabled: true,
    isWinner: {},
    isNotValidScore: false,
  });

  const router = useRouter();
  const inputRef = useRef();
  const { getSelectedGameDetails, selectedGame } = useGames();
  const selectedGameDetails = getSelectedGameDetails();

  useEffect(() => {
    const localData = localStorage.getItem("players");
    console.log(localData);
    if (localData !== null) {
      setPlayers(JSON.parse(localData));
    }
    if (localStorage.getItem("winner") !== null) {
      router.push(`/games/${selectedGame}/end-game`);
    }
    if (localStorage.getItem("currentDart") !== null) {
      setCurrentDart(parseInt(localStorage.getItem("currentDart"), 10));
    }
    if (localStorage.getItem("currentPlayer") !== null) {
      setCurrentPlayer(parseInt(localStorage.getItem("currentPlayer"), 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentDart", currentDart.toString());
    localStorage.setItem("currentPlayer", currentPlayer.toString());
  }, [currentDart, currentPlayer]);

  useEffect(() => {
    if (isWinner.defined) {
      // Logic for when a player wins
      // const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
      const player = players[playerIndex]; // player is a JS object now
      player.dartsLength = player.darts.length; // Add darts.length to player
      const playerJSON = JSON.stringify(player);
      localStorage.setItem("winner", playerJSON);
      console.log(`Player ${isWinner.player} is the winner!`);
      console.log(isWinner);
      router.push(`/games/${selectedGame}/end-game`);
    }
  }, [isWinner]);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  return (
    <main className="main">
      {selectedGame && (
        <Header
          title={selectedGameDetails?.title ?? "Chargement.."}
          description={selectedGameDetails?.description ?? "Chargement.."}
          src={selectedGameDetails?.icon ?? "/score-board.png"}
          alt={selectedGameDetails?.title ?? "Chargement.."}
          width={selectedGameDetails?.width ?? 80}
          height={selectedGameDetails?.height ?? 80}
        />
      )}
      <CurrentPlayerDashboard
        currentPlayer={currentPlayer}
        players={players}
        currentDart={currentDart}
        newCurrentScore={newCurrentScore}
        handleInputChange={handleInputChange}
        // handleScoreCalculation={handleScoreCalculation}
        handleNewScore={handleNewScore}
        isNotValidScore={isNotValidScore}
        handleNextPlayer={handleNextPlayer}
        isDisabled={isDisabled}
        setNewCurrentScore={setNewCurrentScore}
      />
      <PlayerList players={players} currentPlayer={currentPlayer} />
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
      />
      <h1>{popupMessage}</h1>
      <Footer
        buttons={[
          {
            text: "Retour à l'accueil",
            path: "/",
          },
        ]}
      />
    </main>
  );
};
export default Game;
