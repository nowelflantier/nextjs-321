import React, { useState } from "react";
import ScoreInput from "./ScoreInput";
import styles from "../styles.scss";
import Image from "next/image";

const CurrentPlayerDashboard = ({
  currentPlayer,
  players,
  currentDart,
  handleInputChange,
  handleNewScore,
  isNotValidScore,
  handleNextPlayer,
  isDisabled,
  isTurnOver,
  newCurrentScore,
  setNewCurrentScore,
  // handleScoreCalculation,
}) => {
  const [displayPlayerInfo, setDisplayPlayerInfo] = useState(false);

  if (!players || players.length === 0) {
    // Change this to your desired loading state
    return (
      <div className="active">
        <h1 className="code">Chargement...</h1>
        <Image
          className="loading"
          src="/loading.gif"
          alt="Loading"
          width={100}
          height={100}
        />
      </div>
    );
  }

  const player = players[currentPlayer - 1] || {};
  function getBackgroundColor(diff) {
    // Si la différence est nulle, la couleur sera rouge.
    // Si la différence est de 321 (le score maximum), la couleur sera verte.
    // Pour toutes les autres valeurs, la couleur sera un mélange de rouge et de vert.
    if (diff > 0) {
      const greenAmount = Math.round((diff / 500) * 255);
      // console.log(greenAmount);
      const redAmount = 255 - greenAmount;
      // console.log(redAmount);
      const transparency = 100;
      // return `rgb(0, ${greenAmount}, 0, 30%)`;
      // return `rgb(${redAmount}, ${greenAmount}, 0, 30%)`;
      return `rgb(${redAmount}, 0, 0, ${100 - greenAmount}%)`;
    }
  }
  const toggleDisplayPlayerInfo = () => {
    setDisplayPlayerInfo(!displayPlayerInfo);
  };
  return (
    <div className="active">
      <p className="code">
        Player {currentPlayer} - tour{" "}
        {currentDart + 1 === 4 ? "terminé" : currentDart + 1}
      </p>
      <h1 >
        {player.name}
      </h1>
      <h2 className="score">{player.score || 0} points</h2>
      <span onClick={toggleDisplayPlayerInfo} className="info-button">afficher {displayPlayerInfo ? "moins ˄" : "plus ˅"}</span>
      {displayPlayerInfo && (
        <>
          <h3 className="code">
            Fléchettes lancées : {player.darts ? player.darts.length : 0}
          </h3>
          <div className="code"><p>
            Moyenne / fléchette :{" "}
            {player.darts && player.darts.length > 0
              ? (player.average).toFixed(2)
              : 0}</p>
              <p>Nombre de reset faits :{" "}
            {player.darts && player.darts.length > 0
              ? (player.resetAmount)
              : 0}</p>
               <p>Nombre de reset subis :{" "}
            {player.darts && player.darts.length > 0
              ? (player.resetAmountDefense)
              : 0}</p>
          </div>
          <p className="code">
            
          </p>
        </>
      )}
      <div className="grid">
        <div className="card dashboard">
          <h2>Reste pour gagner :</h2>

          <p>{321 - player.score || 0}</p>
        </div>
      </div>

      <div className="player-list ">
        <div className="grid">
          {players
            .filter((p) => p.id !== player.id && p.score > player.score)
            .sort((a, b) => a.score - player.score - (b.score - player.score)) // Ici, nous ajoutons un tri par ordre décroissant.
            .map((p) => {
              return (
                <div
                  key={p.id}
                  className="card dashboard"
                  style={{
                    backgroundColor: getBackgroundColor(p.score - player.score),
                  }}
                >
                  <h2>{p.name}</h2>
                  {parseInt(p.score, 10) - (player.score || 0) >= 0 ? (
                    <p>
                      {parseInt(p.score, 10) - (player.score || 0)} pour reset{" "}
                      {p.name}
                    </p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <ScoreInput
        isTurnOver={isTurnOver}
        newCurrentScore={newCurrentScore}
        handleInputChange={handleInputChange}
        handleNewScore={handleNewScore}
        isNotValidScore={isNotValidScore}
        currentDart={currentDart}
        handleNextPlayer={handleNextPlayer}
        isDisabled={isDisabled}
        setNewCurrentScore={setNewCurrentScore}
        // handleScoreCalculation={handleScoreCalculation}
      />
    </div>
  );
};
export default CurrentPlayerDashboard;
