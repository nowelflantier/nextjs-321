import React from "react";
// import Image from "next/image";
// import Link from "next/link";
import styles from "@/app/styles.scss";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PlayerSelect from "@/app/components/SelectPlayers";

const GameStart = () => {
  return (
    <main className="main">
      <Header
        title="let's play dice !"
        description="Killer - Dice scorer - v1.0"
        src="/dice.png"
        alt="Dice Logo"
        width={180}
        height={180}
      />
      
        <PlayerSelect></PlayerSelect>

        <Footer
          buttons={[
            {
              text: "Retour à l'accueil",
              path: "/",
            },
          ]}
        />
      
    </main>
  );
};

export default GameStart;
