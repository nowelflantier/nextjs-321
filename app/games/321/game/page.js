"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import CurrentPlayerDashboard from "@/app/components/CurrentPlayerDashboard";
import PlayerList from "@/app/components/PlayerList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "../../../styles.scss";

const Game = () => {
  const router = useRouter();
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentDart, setCurrentDart] = useState(0);
  const [newCurrentScore, setNewCurrentScore] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef();
  const [isWinner, setIsWinner] = useState({});
  const [isNotValidScore, SetIsNotValidScore] = useState(false);
  const playerIndex = currentPlayer - 1;

  useEffect(() => {
    const localData = localStorage.getItem("players");
    if (localData) {
      setPlayers(JSON.parse(localData));
    }
    if (localStorage.getItem("winner") !== null) {
      router.push(`/321/end-game`);
    }
    if (localStorage.getItem("currentDart") !== null) {
      setCurrentDart(parseInt(localStorage.getItem("currentDart"), 10));
    }
    if (localStorage.getItem("currentPlayer") !== null) {
      setCurrentPlayer(parseInt(localStorage.getItem("currentPlayer"), 10));
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    if (e.target.value === "") {
      setNewCurrentScore("");
      setIsDisabled(true);
      SetIsNotValidScore(false);
    } else {
      const score = parseInt(e.target.value, 10);
      if (isNaN(score) || score < 0 || score > 60) {
        setNewCurrentScore(e.target.value);
        setIsDisabled(true);
        SetIsNotValidScore(true);
      } else {
        setNewCurrentScore(score);
        setIsDisabled(false);
        SetIsNotValidScore(false);
      }
    }
  }, []);

  const handleNewScore = useCallback(() => {
    // if (isNotValidScore) return;
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    // Check that player is defined
    if (!player) {
      console.error("Player is undefined");
      return;
    }
    const potentialNewScore = player.score + newCurrentScore;
    for (let i = 0; i < updatedPlayers.length; i++) {
      if (i !== playerIndex && updatedPlayers[i].score === potentialNewScore) {
        updatedPlayers[i].score = 0;
      }
    }
    player.darts.push(newCurrentScore);
    player.score = potentialNewScore;
    if (player.score === 321) {
      setIsWinner({ player: players[currentPlayer - 1].id, defined: true });
      // Réinitialiser le jeu ou faire autre chose ici
    } else if (player.score > 321) {
      const newScore = 321 - (potentialNewScore - 321);
      player.score = newScore;
      setCurrentDart(3);
    } else {
      handleNextDart(currentDart);
      //   setCurrentDart(currentDart + 1);
    }
    setPlayers(updatedPlayers);
    setNewCurrentScore("");
    setIsDisabled(true);
  }, [players, newCurrentScore, currentPlayer, currentDart]);

  const handleNextDart = useCallback((currentDart) => {
    if (currentDart >= 3) {
      setCurrentDart(0);
    } else {
      setCurrentDart(currentDart + 1);
    }
  }, []);

  const handleNextPlayer = useCallback(() => {
    if (currentPlayer === players.length) {
      setCurrentDart(0);
      setCurrentPlayer(1);
      setNewCurrentScore("");
    } else {
      setCurrentPlayer(currentPlayer + 1);
      const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
      setCurrentDart(0);
      setNewCurrentScore("");
    }
  }, [currentPlayer, players]);

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
      router.push(`/321/end-game`);
    }
  }, [isWinner]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <main className="main">
      <Header
        title="let's play darts !"
        description="321 Zap - Darts scorer - v1.0"
        src="/dart-aim.svg"
        alt="Next.js Logo"
        width={180}
        height={87}
      />
      <CurrentPlayerDashboard
        currentPlayer={currentPlayer}
        players={players}
        currentDart={currentDart}
        newCurrentScore={newCurrentScore}
        handleInputChange={handleInputChange}
        handleNewScore={handleNewScore}
        isNotValidScore={isNotValidScore}
        handleNextPlayer={handleNextPlayer}
        isDisabled={isDisabled}
        // isTurnOver={isTurnOver}
      />
      <PlayerList players={players} currentPlayer={currentPlayer} />

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
