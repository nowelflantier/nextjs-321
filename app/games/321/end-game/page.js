"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";
import React, { useRef, useState, useEffect } from "react";
import PlayerStats from "@/app/components/CurrentPlayerDashboard";
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
    if (localStorage.getItem("gameId") === null) {
      const gameId = 'game-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('gameId', gameId);
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
      // router.push(`/321/end-game`);
      console.log(`Player ${isWinner.player} is the winner!`);
      console.log(isWinner);
    }
  }, [isWinner]);
  

  return (
    <main className="main">
      <div className="description">
        <p>321 Zap - Darts scorer - v1.0</p>
        <div>powered by le S.</div>
      </div>
      <Image
        className="logo"
        src="/trophy.png"
        alt="Next.js Logo"
        width={180}
        height={180}
        priority
      />
      <div className="center container">
        <div className="active">
          <p className="code">fin de partie</p>
          <h2>🎯</h2>
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
          </div>
        </div>
      </div>
      <PlayerList players={players} currentPlayer={winner.id} />
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

// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import styles from "../../styles.scss";

// const EndGame = () => {
//   const router = useRouter();
//   const [winner, setWinner] = useState(null);

//   useEffect(() => {
//     const winnerData = localStorage.getItem("winner");
//     if (winnerData) {
//       setWinner(JSON.parse(winnerData));
//     } else {
//       // Rediriger vers la page d'accueil si aucun gagnant n'est trouvé
//       router.push(`/`);
//     }
//   }, []);

//   if (!winner) {
//     return null;  // Ou un écran de chargement
//   }

//   return (
//     <main className="main">
//       <div className="description">
//         <p>Félicitations {winner.name} !</p>
//         <p>Score final : {winner.score}</p>
//         <p>Nombre de fléchettes : {winner.darts.length}</p>
//       </div>

//       <Image
//         className="logo"
//         src="/trophy.png"  // Mettez ici l'URL de votre image de trophée
//         alt="Trophée du gagnant"
//         width={180}
//         height={180}
//         priority
//       />

//       <div className="center container">
//         <Link href="/" className="bottom btn">
//           <p>Jouer à nouveau</p>
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default EndGame;
