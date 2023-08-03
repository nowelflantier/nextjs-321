"use client";

import styles from "../../../styles.scss";
import React, { useRef, useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EndGameWinner from "@/app/components/EndGameWinner";
import { useGames } from "@/app/components/GameContext";

const EndGame = () => {
  const { getSelectedGameDetails, selectedGame } = useGames();
  const selectedGameDetails = getSelectedGameDetails();

  return (
    <main className="main">
      <Header
        title={selectedGameDetails?.title ?? "Chargement.."}
        description={selectedGameDetails?.description ?? "Chargement.."}
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
          selectedGame && {
            text: `Nouvelle partie de ${selectedGame}`,
            path: `/games/${selectedGame}/select-players?new_game=true`,
          },
        ]}
      />
    </main>
    // </ContextDataLoader>
  );
};

export default EndGame;
