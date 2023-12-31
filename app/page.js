"use client";
import Image from "next/image";
// import Link from "next/link";
import styles from "./styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DisplayGames from "./components/DisplayGames";
import { useGames } from "./components/GameContext";




import React, { useState, useEffect } from "react";

export default function Home() {

  const [isCookiesStored, setIsCookieesStored] = useState(false);
  const {selectedGame, setSelectedGame} = useGames()
  useEffect(() => {
    if (localStorage.getItem("numPlayers") !== null) {
      setIsCookieesStored(true);
    }
    if (localStorage.getItem("selectedGame") !== null) {
      setSelectedGame(localStorage.getItem('selectedGame'));
    }
  }, []);
  return (
    
    <main className="main">
      <Header
        title="let's play !"
        description="app.sergei.pl - Games scorer - v1.0"
        src="/score-board.png"
        alt="Home Logo"
        width={87}
        height={87}
      />
      <DisplayGames />
      
      {isCookiesStored &&(
        <Footer
          buttons={[
            { text: `Reprendre ma partie de ${selectedGame}`, path: `/games/${selectedGame}/game` },
          ]}
        />
      )}
      
    </main>
    
  );
}
