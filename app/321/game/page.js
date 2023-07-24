// [{"id":1,"name":"Tob","score":310,"currentPlayerScore":0,"darts":[10,60,60,60,60,60]},{"id":2,"name":"TO","score":305,"currentPlayerScore":0,"darts":[60,60,60,60,60,5]},{"id":3,"name":"Sll","score":320,"currentPlayerScore":0,"darts":[20,60,60,60,60,60]}]

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
  // const [currentPlayerScore, setCurrentPlayerScore] = useState(
  //   players[currentPlayer - 1]?.score * 1
  // );
  const [isTurnOver, setIsTurnOver] = useState(false);
  const [isScoreTooHigh, setIsScoreTooHigh] = useState(false);
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
    setPlayers(storedPlayers);
    console.log(currentDart);
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
    const playerIndex = currentPlayer - 1; // Define playerIndex here

    let potentialScore =
      parseInt(newCurrentScore, 10) + parseInt(currentUserScore, 10);
    console.log(potentialScore);
    // SI VICTOIRE
    if (potentialScore === 321) {
      setIsWinner({ player: players[currentPlayer - 1].id, defined: true });
    } else if (potentialScore > 321) {
      // SI SUPERIEUR A 321
      potentialScore = 321 - (potentialScore - 321);
      darts[currentDart] = { id: currentDart, score: newCurrentScore };
      const updatedPlayer = {
        ...players[playerIndex],
        score: potentialScore,
      };
      console.log(`${potentialScore} too high`);
      setIsScoreTooHigh(true);
      // setCurrentDart(3); // Set currentDart to 3
      localStorage.setItem("currentDart", 3); // Update currentDart in localStorage
      // handleNextPlayer(); // Pass to the next player
      // handleNextDart();
      setIsTurnOver(true);
    } else {
      darts[currentDart] = { id: currentDart, score: newCurrentScore };
      const updatedPlayer = {
        ...players[playerIndex],
        score: potentialScore,
      };
      console.log(`${potentialScore} is good`);
      setIsTurnOver(false);
      setIsScoreTooHigh(false);
    }

    // Check if potential score matches that of another player
    players.forEach((player, index) => {
      if (index !== playerIndex && player.score === potentialScore) {
        // Reset the score of the other player to 0
        players[index].score = 0;
      }
    });

    // Store the updated players in local storage
    localStorage.setItem("players", JSON.stringify(players));

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

    if (playerIndex !== -1) {
      console.log("execute after handle add score > local storage");
      storedPlayers[playerIndex].score = potentialScore;
      storedPlayers[playerIndex].darts.push(parseInt(newCurrentScore, 10)); // add the new dart score
      localStorage.setItem("players", JSON.stringify(storedPlayers));
    }
    setIsDisbled(true);
  };

  const handleNewScore = () => {
    handleAddScore(newCurrentScore, currentDart);
    handleNextDart();
    setNewCurrentScore("");

    // return newCurrentScore;
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
    // setCurrentPlayerScore(currentUserScore);

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
    if (isScoreTooHigh) {
      localStorage.setItem("currentPlayer", currentPlayer);
      localStorage.setItem("currentDart", currentDart + 1);
      setCurrentDart(currentDart + 1);
      setIsTurnOver(false);
    } else {
      if (currentDart === 3) {
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("currentDart", 0);
        setCurrentDart(0);
      } else if (currentDart < 3) {
        // Store the current player and dart in localStorage
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("currentDart", currentDart + 1);
        setCurrentDart(currentDart + 1);
        setIsTurnOver(false);
      } else {
        setIsTurnOver(true);
      }
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
        isTurnOver={isTurnOver}
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
