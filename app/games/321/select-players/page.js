import React from "react";
// import Image from "next/image";
// import Link from "next/link";
import styles from "@/app/styles.scss";
import Header from "@/app/components/Header";
import Footer from "@/components/Footer";
import PlayerSelect from "@/app/components/SelectPlayers";

const GameStart = () => {
  return (
    <main className="main">
      <Header
        title="let's play darts !"
        description="321 Zap - Darts scorer - v1.0"
        src="/dart-aim.svg"
        alt="Next.js Logo"
        width={180}
        height={87}
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
