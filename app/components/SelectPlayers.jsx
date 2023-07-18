'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PlayerSelect = () => {
    const [numPlayers, setNumPlayers] = useState(1);
    const router = useRouter();

    useEffect(() => {
        // Read from local storage on initial render
        const storedNumPlayers = localStorage.getItem('numPlayers');
        if (storedNumPlayers) {
          setNumPlayers(storedNumPlayers);
        }
      }, []);
  
    const handlePlayerSelect = (e) => {
      setNumPlayers(e.target.value);
    };
  
    const handleStart = () => {
    localStorage.setItem('numPlayers', numPlayers);

    router.push(`/321/players_edit/1?selected_players=${numPlayers}`);
  };
  
  return (
    <div className='container center'>
      <p className='code'>Sélectionnez le nombre de joueurs: {numPlayers}</p>
      <select className="select" value={numPlayers} onChange={handlePlayerSelect}>
        {Array.from({ length: 8 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <button className='btn bottom' onClick={handleStart}>Commencer</button>
    </div>
  );
};
  
  export default PlayerSelect;