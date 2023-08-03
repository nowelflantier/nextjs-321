"use client";
// import Image from "next/image";
// import Link from "next/link";
import styles from "../../../styles.scss";
// import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NamePlayers from "@/app/components/NamePlayers";
// import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useGames } from "@/app/components/GameContext";


const SelectPlayersName = () => {
  const { getSelectedGameDetails, selectedGame } = useGames();
  const selectedGameDetails = getSelectedGameDetails();

  return (
    <main className="main">
      {selectedGame && <Header
   title={selectedGameDetails?.title ?? 'Chargement..'}
   description={selectedGameDetails?.description ?? 'Chargement..'}
   src={selectedGameDetails?.icon ?? '/score-board.png'}
   alt={selectedGameDetails?.title ?? 'Chargement..'}
   width={selectedGameDetails?.width ?? 80}
   height={selectedGameDetails?.height ?? 80}
      />}
      <NamePlayers />
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

export default SelectPlayersName;
