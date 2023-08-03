"use client";

// import Image from "next/image";
// import Link from "next/link";
// import styles from "../../styles.scss";
import React, { useRef, useState, useEffect } from "react";
// import PlayerStats from "@/app/components/CurrentPlayerDashboard";
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

