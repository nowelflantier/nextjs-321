import React from "react";
import Image from "next/image";
// import Link from "next/link";
import CardDisplay from "./CardDisplay";

const DisplayGames = () => {
  const games = [{
    id: 1,
    name: "321",
    path: "/games/321/select-players?new_game=true",
    category: "darts",
    icon: "/dart-aim.svg",
  },
  {
    id: 2,
    name: "Killer",
    path: "/",
    category: "dice",
    icon: "/dice.png",
  }]
  return (
    <>
    <h2 className="code">Sélectionnez un jeu : </h2>
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
