'use client'

import Image from 'next/image'
import Link from 'next/link';
import styles from '../../styles.scss'
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1)


  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
    
  }, [currentPlayer]);

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
      <h2 className="code">{players[currentPlayer]?.name}</h2>
      <h2 className="code">{players[currentPlayer]?.score}</h2>
    </div>
   
    <div className="grid"> {players
      .filter(player => player.id !== currentPlayer)
      .map((player) => (
        <div className="card" key={player.id}>
          <h2>{player.id}. {player.name}</h2>
          <p>Score : {player.score}</p>
        </div>
      ))}</div>
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
