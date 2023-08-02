"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles.scss";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
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
              text: "Nouvelle partie",
              path: "/games/321/select-players?new_game=true",
            },
            { text: "Reprendre ma partie", path: "/games/321/game" },
          ]}
        />
      )}
      {/* <div className="grid"></div> */}
    </main>
  );
}
