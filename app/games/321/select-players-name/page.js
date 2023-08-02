// "use client";
// import Image from "next/image";
// import Link from "next/link";
import styles from "../../../styles.scss";
// import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NamePlayers from "@/app/components/NamePlayers";
// import { useRouter, useParams, useSearchParams } from "next/navigation";

const PlayerEdit = () => {
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
      <NamePlayers/>
      <Footer
          buttons={[
            {
              text: "Retour à laccueil",
              path: "/",
            },
          ]}
        />
    </main>
  );
};

export default PlayerEdit;
