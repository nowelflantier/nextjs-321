'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const NamePlayers = () => {
    const numPlayers = Cookies.get('numPlayers');
  const [playerIndex, setPlayerIndex] = useState(0);
  const [playerNames, setPlayerNames] = useState(Array(numPlayers).fill(''));
  const router = useRouter();

  const [showModal, setShowModal] = useState(true);


  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newName = event.target.playerName.value;
    const newPlayerNames = [...playerNames];
    newPlayerNames[playerIndex] = newName;
    setPlayerNames(newPlayerNames);
    if (playerIndex < numPlayers - 1) {
      setPlayerIndex(playerIndex + 1);
    } else {
      Cookies.set('playerNames', JSON.stringify(newPlayerNames));
      router.push('/next-page');
    }
  };

  useEffect(() => {
    const players = Cookies.get('numPlayers');
    if (players) {
        setPlayerIndex(players);
      setPlayerNames(Array(players).fill(''));
    } else {
        setNumPlayers(1);
        setPlayerNames(Array(1).fill(''));
    }
  }, []);
  useEffect(() => {
    setShowModal(true);
  }, [playerIndex]);

    return (
      <div className='container'>
        {/* <p className='code'>Sélection des joueurs</p> */}
        {/* <p className='code'>Nombre de joueurs : {numPlayers}</p> */}
      {/* {showModal && (
        <div className="modal">
          <h2>Joueur {playerIndex + 1}</h2>
          <form onSubmit={handleNameSubmit}>
            <input name="playerName" placeholder="Nom du joueur" required />
            <button type="submit">Valider</button>
          </form>
        </div>
      )} */}
    
        {/* <select className="select" value={numPlayers} onChange={handlePlayerSelect}>
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
   */}
        {/* <button className='btn bottom' onClick={handleStart}>Commencer</button> */}
      </div>
    );
  };
  
  export default NamePlayers;