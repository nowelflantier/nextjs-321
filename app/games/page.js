"use client";
// import Image from "next/image";
// import Link from "next/link";
import styles from "../styles.scss";

import React, { useState, useEffect } from "react";
import Router from "next/navigation";
import { GamesProvider, useGames } from "../components/GameContext";

export default function Home() {
  const { selectedGame } = useGames();
  useEffect(() => {
    router.push(
      `/games/${selectedGame}/select-players-name?selected_players=${numPlayers}`
    );
  }, []);
  return (
    // <GamesProvider>
      <main className="main"></main>
    // {/* </GamesProvider> */}
  );
}
