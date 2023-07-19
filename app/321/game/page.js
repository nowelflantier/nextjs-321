"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";
import React, { useRef, useState, useEffect } from "react";

const Game = () => {
  const [darts, setDarts] = useState([
    { id: 0, score: null },
    { id: 1, score: null },
    { id: 2, score: null },
  ]);
  const [newCurrentScore, setNewCurrentScore] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentNewScore, setCurrentNewScore] = useState(0);
  const [currentPlayerScore, setCurrentPlayerScore] = useState(
    players[currentPlayer - 1]?.score * 1
  );
  const [currentDart, setCurrentDart] = useState(0);
  const inputRef = useRef();

  const currentUserScore = players[currentPlayer - 1]?.score;
  useEffect(() => {
    if(localStorage.getItem("currentDart") !== null) {setCurrentDart(parseInt(localStorage.getItem("currentDart"),10))};
    if(localStorage.getItem("currentPlayer") !== null) {setCurrentPlayer(parseInt(localStorage.getItem("currentPlayer", 10)))};
  },[]);
  useEffect(() => {
    console.log(currentDart)
    
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const storedPlayer = storedPlayers.find(
      (player) => player.id === currentPlayer
    );
    setPlayers(storedPlayers);
  }, [currentDart]);

  const handleAddScore = (newCurrentScore, currentDart) => {
    darts[currentDart] = { id: currentDart, score: newCurrentScore };
    console.log(darts);
  };
  const handleInputChange = (event) => {
    setNewCurrentScore(event.target.value);
    inputRef.current.focus();

  };

  const updateDartScore = () => {
    darts.score = newCurrentScore;
    console.log(darts);
  };
  const handleNewScore = () => {
    // updateDartScore()
    handleAddScore(newCurrentScore, currentDart);
    handleNextDart();
    setNewCurrentScore("");

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const playerIndex = storedPlayers.findIndex(
      (player) => player.id === currentPlayer
    );
    if (playerIndex !== -1) {
      storedPlayers[playerIndex].score += parseInt(newCurrentScore, 10);
      storedPlayers[playerIndex].darts.push(parseInt(newCurrentScore, 10));  // add the new dart score
      localStorage.setItem("players", JSON.stringify(storedPlayers));
    }
    return newCurrentScore;
  };
  const handleNewTurn = () => {
    handleNextPlayer();
  };
  const NextDart = () => {
    return currentDart < 3 ? (
      // affiche l'input et le bouton pour ajouter une valeur tant que la flèce actuelle est < 3
      <div className="addScore">
        <input
         ref={inputRef}
          type="number"
          placeholder="0"
          onChange={handleInputChange}
          value={newCurrentScore}
          className="select"
        />
        <button
          className="btn bottom"
          value={newCurrentScore}
          onClick={handleNewScore}
        >
          AddScore - {newCurrentScore}
        </button>
      </div>
    ) : (
      // sinon affiche le bouton pour passer au joueur suivant
      <div className="addScore">
        <button className="btn bottom" onClick={handleNewTurn}>
          NextPlayer
        </button>
      </div>
    );
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
      localStorage.setItem('currentPlayer', currentPlayer);
      localStorage.setItem('currentDart', currentDart + 1);
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
      <div className="active">
        <h1 className="code">Player {currentPlayer}</h1>
        <h2 className="code">{players[currentPlayer - 1]?.name}</h2>
        <h2 className="code">{players[currentPlayer - 1]?(players[currentPlayer - 1].score):(0)}</h2>
        <h2 className="code">Darts: {players[currentPlayer -1]?.darts?(players[currentPlayer -1].darts.length):0}</h2>
        <h3 className="code">Average: {players[currentPlayer -1]?.darts?(players[currentPlayer - 1].score/players[currentPlayer -1].darts.length):0}</h3>

        <div className="addScore">
          <NextDart
          // players={players}
          // currentPlayer={currentPlayer}
          // currentDart={currentDart}
          // currentUserScore={currentUserScore}
          // currentNewScore={currentNewScore}
          // handleNextDart={handleNextDart}
          // handleNextPlayer={handleNextPlayer}
          // darts={darts}
          />
        </div>
      </div>

      <div className="grid">
        {" "}
        {players
          .filter((player) => player.id !== currentPlayer)
          .map((player) => (
            <div className="card" key={player.id}>
              <h2>
                {player.id}. {player.name}
              </h2>
              <p>Score : {player.score}</p>
            </div>
          ))}
      </div>
      {/* La logique du jeu va ici */}
      <div className="center container">
        <p className="code">
          work in progress
          <br />
        </p>
        <Link href="/" className="bottom btn">
          <p>Back home</p>
        </Link>
        <Link href="/321/select-players" className="bottom btn">
          <p>Back to the player selection</p>
        </Link>
      </div>
    </main>
  );
};

export default Game;
