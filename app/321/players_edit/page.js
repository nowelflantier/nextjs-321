// 'use client'
// import Image from 'next/image'
// import Link from 'next/link';
// import styles from '../../styles.scss'

// import React, { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import {  } from 'next/navigation';

// const PlayerEdit = () => {
//   const [playerName, setPlayerName] = useState("");
//   const router = useRouter();
//   const {pid} = useParams();
//   console.log({pid});

//   useEffect(() => {
//     const storedPlayerName = localStorage.getItem(`playerName${pid}`);
//     if (storedPlayerName) {
//       setPlayerName(storedPlayerName);
//     }
//   }, [pid]);

//   const handleNameChange = (e) => {
//     setPlayerName(e.target.value);
//   };

//   const handleNext = () => {
//     localStorage.setItem(`playerName${pid}`, playerName);

//     const nextPid = parseInt(pid, 10) + 1;
//     const numPlayers = parseInt(localStorage.getItem('numPlayers'), 10);
//     if (nextPid <= numPlayers) {
//       router.push(`/321/players_edit/${nextPid}`);
//     } else {
//       router.push(`/321/game`);
//     }
//   };

//   return (
//     <main className="main">
//     <div className="description">
//       <p>
//        Jeu en cours de développement
//       </p>
//       <div>
//        powered by le S.
//       </div>
//     </div>

//     <div className="center container">
        
//         <p className='code'>work in progress<br/></p>
//         <Image
//           className="logo"
//           src="/dart-aim.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={87}
//           priority
//         />
        
        
//         <Link href="/" className="bottom btn"><p>Back home</p></Link>
//         <Link href="/321/start-game" className="bottom btn"><p>Back to the game</p></Link>
        
//       </div>

//     <div className="grid">
//     </div>
  
//     <div>
//       <h1>Player {pid}</h1>
//       <input type="text" value={playerName} onChange={handleNameChange} />
//       <button onClick={handleNext}>Next</button>
//     </div>
//     </main>
//   );
// };

// export default PlayerEdit;
