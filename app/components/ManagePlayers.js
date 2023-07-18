import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NamePlayers from './NamePlayers';

const ManagePlayers = () => {
  const [numPlayers, setNumPlayers] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);

  useEffect(() => {
    const players = Cookies.get('numPlayers');
    setNumPlayers(Number(players));
    setPlayerNames(Array(Number(players)).fill(''));

    const playerIndexFromLocalStorage = localStorage.getItem('numPlayers');
    if (playerIndexFromLocalStorage) {
      setPlayerIndex(Number(playerIndexFromLocalStorage));
      setPlayerNames(Array(Number(playerIndexFromLocalStorage)).fill(''));
    } else {
      setPlayerIndex(1);
      setPlayerNames(Array(1).fill(''));
    }
  }, []);

  if (numPlayers === null) {
    return <div>Loading...</div>;
  }

  return (
    <NamePlayers
      numPlayers={numPlayers}
      playerIndex={playerIndex}
      setPlayerIndex={setPlayerIndex}
      playerNames={playerNames}
      setPlayerNames={setPlayerNames}
    />
  );
};

export default ManagePlayers;
