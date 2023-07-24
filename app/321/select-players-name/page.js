"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";
import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const PlayerEdit = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([{}])
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const numPlayers = searchParams.get("selected_players");

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const storedPlayer = storedPlayers.find((player) => player.id === currentPlayer);
    console.log(storedPlayers)
    if (storedPlayer) {
      setPlayerName(storedPlayer.name);
    }
  },[currentPlayer]);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleNext = () => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const playerIndex = storedPlayers.findIndex((player) => player.id === currentPlayer);
    const playerData = { id: currentPlayer, name: playerName, score: 0, currentPlayerScore: 0, darts: [] };
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
        localStorage.setItem("currentDart",0);
        localStorage.setItem("currentPlayer",1);
        router.push(`/321/game`);
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
      <div className="center container">
        
        <h1 className="code">Player {currentPlayer}</h1>
        <input type="text" value={playerName} className="select" onChange={handleNameChange} />
        <button className='btn bottom' onClick={handleNext}><p>Suivant</p></button>
      </div>
      <div className="center container">
        {/* <p className="code">
          work in progress
          <br />
        </p> */}

        <Link href="/" className="bottom btn">
          <p>Retour à l&#39;accueil</p>
        </Link>
      
      </div>
      <div className='grid'></div>
    </main>
  );
};

export default PlayerEdit;
