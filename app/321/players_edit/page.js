"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const PlayerEdit = () => {
  const [playerName, setPlayerName] = useState("");
  const searchParams = useSearchParams();
  const params = useParams();
  let currentPlayer = 1;
  const router = useRouter();
  const numPlayers = searchParams.get("selected_players");

console.log(currentPlayer);

  useEffect(() => {
    const storedPlayerName = localStorage.getItem(`playerName${numPlayers}`);
    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }
  }, []);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleNext = () => {
    localStorage.setItem(`playerName${currentPlayer}`, playerName);
    currentPlayer++;
    console.log(currentPlayer);

    // const nextPid = parseInt(currentPlayer, 10) + 1;
    // console.log(nextPid)
    // if (nextPid <= numPlayers) {
    //   router.push(`/321/players_edit/${nextPid}`);
    // } else {
    //   router.push(`/321/game`);
    // }
  };

  return (
    <main className="main">
      <div className="description">
        <p>Jeu en cours de développement</p>
        <div>powered by le S.</div>
      </div>
      <div>
        <h1>Player {currentPlayer}</h1>
        <input type="text" value={playerName} onChange={handleNameChange} />
        <button onClick={handleNext}>Next</button>
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
        <Link href="/321/start-game" className="bottom btn">
          <p>Back to the game</p>
        </Link>
      </div>

      <div className="grid"></div>
    </main>
  );
};

export default PlayerEdit;
