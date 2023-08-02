"use client";

import Image from "next/image";
import Link from "next/link";
// import styles from "../../styles.scss";
import React, { useRef, useState, useEffect } from "react";
import PlayerStats from "@/app/components/CurrentPlayerDashboard";
// import PlayerList from "@/app/components/PlayerList";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EndGameWinner from "@/app/components/EndGameWinner";

const EndGame = () => {
  return (
    <main className="main">
    <Header
        title="let's play darts !"
        description="321 Zap - Darts scorer - v1.0"
        src="/trophy.png"
        alt="Victory Logo"
        width={180}
        height={180}
      />
      <EndGameWinner />
      <Footer
          buttons={[
            {
              text: "Retour à l'accueil",
              path: "/",
            },
            {
              text: "Nouvelle partie de 321",
              path: "/games/321/select-players?new_game=true"
            }
          ]}
        />

    </main>
  );
};

export default EndGame;

// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import styles from "../../styles.scss";

// const EndGame = () => {
//   const router = useRouter();
//   const [winner, setWinner] = useState(null);

//   useEffect(() => {
//     const winnerData = localStorage.getItem("winner");
//     if (winnerData) {
//       setWinner(JSON.parse(winnerData));
//     } else {
//       // Rediriger vers la page d'accueil si aucun gagnant n'est trouvé
//       router.push(`/`);
//     }
//   }, []);

//   if (!winner) {
//     return null;  // Ou un écran de chargement
//   }

//   return (
//     <main className="main">
//       <div className="description">
//         <p>Félicitations {winner.name} !</p>
//         <p>Score final : {winner.score}</p>
//         <p>Nombre de fléchettes : {winner.darts.length}</p>
//       </div>

//       <Image
//         className="logo"
//         src="/trophy.png"  // Mettez ici l'URL de votre image de trophée
//         alt="Trophée du gagnant"
//         width={180}
//         height={180}
//         priority
//       />

//       <div className="center container">
//         <Link href="/" className="bottom btn">
//           <p>Jouer à nouveau</p>
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default EndGame;
