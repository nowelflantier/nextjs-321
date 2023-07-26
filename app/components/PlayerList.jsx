import React, {useState} from 'react';

const PlayerList = ({ players, currentPlayer }) => {
  return (
    <div className="grid">
      {players.filter((player) => player.id !== currentPlayer).map((player) => (
        <div className="card" key={`${player.id}${player.name}`}>
          <h2>{player.id}. {player.name}</h2>
          <p>Score : {player.score}</p>
          <p>Darts : {player.darts.length}</p>
          <p>Score : {(player.score/player.darts.length).toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}

export default PlayerList;
