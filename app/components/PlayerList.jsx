"use client";

import React, {useContext, useEffect, useState} from 'react';
import PlayerContext from './PlayerContext';

const PlayerList = ({ players, currentPlayer }) => {
  // const { players, setPlayers } = useContext(PlayerContext);

  return (
    <div className="grid">
      {players.filter((player) => player.id !== currentPlayer).map((player) => (
        <div className="card" key={`${player.id}${player.name}`}>
          <h2>{player.id}. {player.name}</h2>
          <p>Score : {player.score}</p>
          <p>Darts : {player.darts.length}</p>
          <p>Moyenne : {player.darts && player.darts.length > 0
          ? (player.score / player.darts.length).toFixed(2)
          : 0}</p>
        </div>
      ))}
    </div>
  )
}

export default PlayerList;