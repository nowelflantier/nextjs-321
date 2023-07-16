'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const PlayerSelect = () => {
    const [numPlayers, setNumPlayers] = React.useState(1);
    const router = useRouter();
  
    const handlePlayerSelect = (e) => {
      setNumPlayers(e.target.value);
    };
  
    const handleStart = () => {
      Cookies.set('numPlayers', numPlayers);
      router.push('/321/select-players');
    };
  
    return (
      <div className='container center'>
        <p className='code'>Sélectionnez le nombre de joueurs</p>
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