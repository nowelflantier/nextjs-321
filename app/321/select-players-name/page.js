"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";
import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const PlayerEdit = () => {
  const [playerName, setPlayerName] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const numPlayers = searchParams.get("selected_players");

  useEffect(() => {
    const storedPlayerName = localStorage.getItem(`playerName${numPlayers}`);
    console.log(storedPlayerName)
    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }
  },);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleNext = () => {
    localStorage.setItem(`playerName${currentPlayer}`, playerName);

    if (currentPlayer < numPlayers) {
        setCurrentPlayer(currentPlayer + 1);
      } else {
        router.push(`/321/game`);
      }
  };

  return (
    <main className="main">
      <div className="description">
        <p>Jeu en cours de développement</p>
        <div>powered by le S.</div>
      </div>
      <div className="center container">
        <h1 className="code">Player {currentPlayer}</h1>
        <input type="text" value={playerName} className="select" onChange={handleNameChange} />
        <button className='btn bottom' onClick={handleNext}>Next</button>
      </div>
      <div className="center container">
        <p className="code">
          work in progress
          <br />
        </p>
        <Image
          className="logo"
          src="/dart-aim.svg"
          alt="Next.js Logo"
          width={180}
          height={87}
          priority
        />

        <Link href="/" className="bottom btn">
          <p>Back home</p>
        </Link>
        <Link href="/321/select-players" className="bottom btn">
          <p>Back to the player selection</p>
        </Link>
      </div>
      <div className="grid"></div>
    </main>
  );
};

export default PlayerEdit;
