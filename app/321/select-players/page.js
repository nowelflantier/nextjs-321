import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles.scss";
import PlayerSelect from "@/app/components/SelectPlayers";

const GameStart = () => {
  return (
    <main className="main">
      <div className="description">
        <p>
        321 Zap - Darts scorer - v1.0
        </p>
        <div>powered by le S.</div>
      </div>
      <Image
        className="logo"
        src="/dart-aim.svg"
        alt="Next.js Logo"
        width={180}
        height={87}
        priority
      />
      <div className="center container">
        <PlayerSelect></PlayerSelect>
        {/* <p className='code'>work in progress<br/></p> */}

        <Link href="/" className="bottom btn">
          <p>Retour à l&#39;accueil</p>
        </Link>
        <div className='grid'></div>
      </div>

      
    </main>
  );
};

export default GameStart;
