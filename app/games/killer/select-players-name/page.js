"use client";
// import Image from "next/image";
// import Link from "next/link";
import styles from "../../../styles.scss";
// import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NamePlayers from "@/app/components/NamePlayers";
import { useGames } from "@/app/components/GameContext";
// import { useRouter, useParams, useSearchParams } from "next/navigation";

const SelectPlayersName = () => {
  const { getSelectedGameDetails, selectedGame } = useGames();
  const selectedGameDetails = getSelectedGameDetails();
  return (
    <main className="main">
      {selectedGame && (
        <Header
          title={selectedGameDetails?.title ?? "Chargement.."}
          description={selectedGameDetails?.description ?? "Chargement.."}
          src={selectedGameDetails?.icon ?? "/score-board.png"}
          alt={selectedGameDetails?.title ?? "Chargement.."}
          width={selectedGameDetails?.width ?? 80}
          height={selectedGameDetails?.height ?? 80}
          selectedGameDetails={selectedGameDetails}
          selectedGame={selectedGame}
        />
      )}
<h2 className="card code">En cours de développement, ne pas utiliser</h2>
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
