"use client";

import React, {useState} from 'react';


const PlayerList = ({ players, currentPlayer }) => {
  const [displayPlayerInfo, setDisplayPlayerInfo] = useState({});

  const toggleDisplayPlayerInfo = (playerId) => {
    setDisplayPlayerInfo(prevState => ({
      ...prevState,
      [playerId]: !prevState[playerId]
    }));
  };
  return (
    <div className="grid">
    {players.filter((player) => player.id !== currentPlayer).map((player) => (
      <div onClick={() => toggleDisplayPlayerInfo(player.id)} className="card" key={`${player.id}${player.name}`}>
        <h2>{player.id}. {player.name}</h2>
        <p>Score : {player.score}</p>
        <span  className="info-button">afficher {displayPlayerInfo[player.id] ? "moins ˄" : "plus ˅"}</span>
        {displayPlayerInfo[player.id] && (
          <>
            <p>Darts : {player.darts.length}</p>
            <p>Moyenne : {player.darts && player.darts.length > 0
              ? (player.score / player.darts.length).toFixed(2)
              : 0}</p>
            <p>Reset faits : {player.darts && player.darts.length > 0
              ? (player.resetAmount)
              : 0}</p>
            <p>Reset subis : {player.darts && player.darts.length > 0
              ? (player.resetAmountDefense)
              : 0}</p>
          </>
        )}
      </div>
    ))}
  </div>
  )
}

export default PlayerList;