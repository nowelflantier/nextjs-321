import React from "react";
import Image from "next/image";
// import Link from "next/link";
import CardDisplay from "./CardDisplay";
import { useGames } from "./GameContext";

const DisplayGames = () => {
  const {games} = useGames();
  return (
    <>
      <h2 className="code center">Sélectionnez un jeu : </h2>
      <div className="grid">
        {games.map((game) => (
          <CardDisplay
            key={game.id}
            id={game.id}
            title={game.name}
            src={game.icon}
            alt="Dart Logo"
            width={60}
            height={60}
            path={game.path}
            buttonText=""
            style="card games"
          />
        ))}
      </div>
    </>
  );
};

export default DisplayGames;
