// "use client";
// import Image from "next/image";
// import Link from "next/link";
import styles from "../../../styles.scss";
// import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NamePlayers from "@/app/components/NamePlayers";
// import { useRouter, useParams, useSearchParams } from "next/navigation";

const SelectPlayersName = () => {
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
      
      <NamePlayers/>
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
