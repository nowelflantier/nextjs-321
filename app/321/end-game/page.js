"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";
import React, { useRef, useState, useEffect } from "react";
import PlayerStats from "@/app/components/PlayerStats";
import PlayerList from "@/app/components/PlayerList";


const EndGame = () => {
  const [darts, setDarts] = useState([]);
  // const [newCurrentScore, setNewCurrentScore] = useState("");
  const [players, setPlayers] = useState([]);
  // const [currentPlayer, setCurrentPlayer] = useState(1);
  // const [isNotValidScore, SetIsNotValidScore] = useState(false);
  // const [isDisabled, setIsDisbled] = useState(true);
  const [isWinner, setIsWinner] = useState({});
  // const [currentPlayerScore, setCurrentPlayerScore] = useState(
  //   players[currentPlayer - 1]?.score * 1
  // );
  const [winner, setWinner] = useState({});
  // const [currentDart, setCurrentDart] = useState(0);
  const inputRef = useRef();
  const playerIndex = parseInt(winner.id, 10);
  const currentUserScore = players[playerIndex]?.score;

  useEffect(() => {
    // if (localStorage.getItem("currentDart") !== null) {
    //   setCurrentDart(parseInt(localStorage.getItem("currentDart"), 10));
    // }
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
      // router.push(`/321/end-game`);
      console.log(`Player ${isWinner.player} is the winner!`);
      console.log(isWinner);
    }
  }, [isWinner]);

  

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
      <div className="center container">
      <p className="code">
        page de fin de partie - wip
        <em><br/>bravo cependant {winner.name}</em>
      </p>
      </div>
     

      <div className="center container">
        {/* <p className="code">
          work in progress
          <br />
        </p> */}
        <Link href="/" className="bottom btn">
          <p>Retour à l&#39;accueil</p>
        </Link>
        <Link href="/321/select-players?new_game=true" className="bottom btn">
          <p>Nouvelle partie</p>
        </Link>
      </div>
    </main>
  );
};

export default EndGame;
