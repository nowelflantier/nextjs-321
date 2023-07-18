import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from '../../styles.scss'
import PlayerSelect from '@/app/components/SelectPlayers';



const GameStart = () => {
  
  return (
    <main className="main">
    <div className="description">
      <p>
       Jeu en cours de développement
      </p>
      <div>
       powered by le S.
      </div>
    </div>

    <div className="center container">
    <PlayerSelect></PlayerSelect>
        <p className='code'>work in progress<br/></p>
        <Image
          className="logo"
          src="/dart-aim.svg"
          alt="Next.js Logo"
          width={180}
          height={87}
          priority
        />
        
        
        <Link href="/" className="bottom btn"><p>Back home</p></Link>
        
      </div>

    <div className="grid">
    </div>
  </main>
  );
};

export default GameStart;
