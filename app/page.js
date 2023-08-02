"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isCookiesStored, setIsCookieesStored] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("numPlayers") !== null) {
      setIsCookieesStored(true);
    }
  }, []);
  return (
    <main className="main">
      <Header
        title="let's play !"
        description="321 Zap - Darts scorer - v1.0"
        src="/dart-aim.svg"
        alt="Next.js Logo"
        width={180}
        height={87}
      />
      {!isCookiesStored ? (
        <Footer
          buttons={[
            {
              text: "Nouvelle partie",
              path: "/games/321/select-players?new_game=true",
            },
          ]}
        />
      ) : (
        <Footer
          buttons={[
            {
              text: "Nouvelle partie de 321",
              path: "/games/321/select-players?new_game=true&game=321",
            },
            { text: "Reprendre ma partie", path: "/games/321/game" },
          ]}
        />
      )}
      {/* <div className="grid"></div> */}
    </main>
  );
}
