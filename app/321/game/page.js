"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../styles.scss";
import React, { useRef, useState, useEffect } from "react";
import PlayerStats from "@/app/components/PlayerStats";
import PlayerList from "@/app/components/PlayerList";

const Game = () => {
  const [darts, setDarts] = useState([
    { id: 0, score: null },
    { id: 1, score: null },
    { id: 2, score: null },
  ]);
  const router = useRouter();
  const [newCurrentScore, setNewCurrentScore] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isNotValidScore, SetIsNotValidScore] = useState(false);
  const [isDisabled, setIsDisbled] = useState(true);
  const [isWinner, setIsWinner] = useState({});
  const [currentPlayerScore, setCurrentPlayerScore] = useState(
    players[currentPlayer - 1]?.score * 1
  );
  const [currentDart, setCurrentDart] = useState(0);
  const inputRef = useRef();
  const playerIndex = currentPlayer - 1;
  const currentUserScore = players[playerIndex]?.score;
  useEffect(() => {
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

  useEffect(() => {
    inputRef.current?.focus();
    SetIsNotValidScore(false);
  }, [newCurrentScore]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const storedPlayer = storedPlayers.find(
      (player) => player.id === currentPlayer
    );
    setPlayers(storedPlayers);
  }, [currentDart]);

  useEffect(() => {
    if (isWinner.defined) {
      // Logic for when a player wins
      const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
      const playerJSON = JSON.stringify(storedPlayers[playerIndex]);
      localStorage.setItem("winner", playerJSON);
      console.log(`Player ${isWinner.player} is the winner!`);
      console.log(isWinner);
      router.push(`/321/end-game`);
    }
  }, [isWinner]);
  const handleAddScore = (newCurrentScore, currentDart) => {
    let potentialScore =
      parseInt(newCurrentScore, 10) + parseInt(currentUserScore, 10);
    console.log(potentialScore);
    // logique de victoire
    if (potentialScore === 321) {
      setIsWinner({ player: players[currentPlayer - 1].id, defined: true });
    } else if (potentialScore > 321) {
      
      potentialScore = 321 - (potentialScore - 321);
      // darts[currentDart] = { id: currentDart, score: newCurrentScore };
      // const updatedPlayer = {
      //   ...players[playerIndex],
      //   score: potentialScore,
      // };
      console.log(`${potentialScore} too high`)
    }
    // Check if potential score matches that of another player
    players.forEach((player, index) => {
      if (index !== playerIndex && player.score === potentialScore) {
        // Reset the score of the other player to 0
        players[index].score = 0;
      }
    });
    console.log(`${potentialScore} before update local data`)

    // Store the updated players in local storage
    localStorage.setItem("players", JSON.stringify(players));

    // ajouter la logique de remise à 0, dépassement de 321 et victoire ici, sinon ajouter la fleche
    darts[currentDart] = { id: currentDart, score: newCurrentScore };
    const updatedPlayer = {
      ...players[playerIndex],
      score: potentialScore,
    };
    console.log(`${updatedPlayer.score} after update`)
  };

  const handleNewScore = () => {
    handleAddScore(newCurrentScore, currentDart);
    handleNextDart();
    setNewCurrentScore("");

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const playerIndex = storedPlayers.findIndex(
      (player) => player.id === currentPlayer
    );
    if (playerIndex !== -1) {
      console.log('execute after handle add score > local storage')
      storedPlayers[playerIndex].score += parseInt(newCurrentScore, 10);
      storedPlayers[playerIndex].darts.push(parseInt(newCurrentScore, 10)); // add the new dart score
      localStorage.setItem("players", JSON.stringify(storedPlayers));
    }
    setIsDisbled(true);
    return newCurrentScore;
  };

  const handleInputChange = (event) => {
    setIsDisbled(false);

    // valeur à modifier hors tests
    if (
      isNaN(event.target.value) ||
      event.target.value < 0 ||
      event.target.value > 60
    ) {
      SetIsNotValidScore(true);
    } else {
      setNewCurrentScore(event.target.value);
      SetIsNotValidScore(false);
    }
    if (event.keyCode === 13) {
      handleNewScore();
    }
  };

  const handleLastPlayer = () => {
    setCurrentDart(0);
    setCurrentPlayer(1);
  };
  const handleCurrentPlayer = () => {
    setCurrentPlayerScore(currentUserScore);

    setCurrentPlayer(currentPlayer + 1);
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const storedPlayer = storedPlayers.find(
      (player) => player.id === currentPlayer
    );
    setCurrentDart(0);
  };
  const handleNextPlayer = () => {
    currentPlayer === players.length
      ? handleLastPlayer()
      : handleCurrentPlayer();
  };
  const handleNextDart = () => {
    if (currentDart < 3) {
      // Store the current player and dart in localStorage
      localStorage.setItem("currentPlayer", currentPlayer);
      localStorage.setItem("currentDart", currentDart + 1);
      setCurrentDart(currentDart + 1);
    } else {
      handleNextPlayer();
    }
  };

  return (
    <main className="main">
      <div className="description">
        <p>Jeu en cours de développement</p>
        <div>powered by le S.</div>
      </div>
      <Image
        className="logo"
        src="/dart-aim.svg"
        alt="Next.js Logo"
        width={180}
        height={87}
        priority
      />
      <PlayerStats
        newCurrentScore={newCurrentScore}
        currentPlayer={currentPlayer}
        currentDart={currentDart}
        players={players}
        handleInputChange={handleInputChange}
        handleNewScore={handleNewScore}
        isNotValidScore={isNotValidScore}
        handleNextPlayer={handleNextPlayer}
        isDisabled={isDisabled}
      />

      <PlayerList players={players} currentPlayer={currentPlayer} />

      <div className="center container">
        <p className="code">
          work in progress
          <br />
        </p>
        <Link href="/" className="bottom btn">
          <p>Back home</p>
        </Link>
      </div>
    </main>
  );
};

export default Game;
