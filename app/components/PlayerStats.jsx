import React from "react";
import ScoreInput from "./ScoreInput";
import styles from "../styles.scss";

const PlayerStats = ({
  currentPlayer,
  players,
  currentDart,
  newCurrentScore,
  handleInputChange,
  handleNewScore,
  isNotValidScore,
  handleNextPlayer,
  isDisabled,
  isTurnOver,
}) => {
  const player = players[currentPlayer - 1] || {};
  function getBackgroundColor(diff) {
    // Si la différence est nulle, la couleur sera rouge.
    // Si la différence est de 321 (le score maximum), la couleur sera verte.
    // Pour toutes les autres valeurs, la couleur sera un mélange de rouge et de vert.
    if (diff > 0) {
      const greenAmount = Math.round((diff / 500) * 255);
      console.log(greenAmount)
      const redAmount = 255 - greenAmount;
      console.log(redAmount)
      const transparency = 100
      // return `rgb(0, ${greenAmount}, 0, 30%)`;
      // return `rgb(${redAmount}, ${greenAmount}, 0, 30%)`;
      return `rgb(${redAmount}, 0, 0, ${100 - greenAmount}%)`;
    }
  }
  return (
    <div className="active">
      <p className="code">
        Player {currentPlayer} - tour{" "}
        {currentDart + 1 === 4 ? "terminé" : currentDart + 1}
      </p>
      <h1>{player.name}</h1>
      <h2 className="score">{player.score || 0}</h2>
      <h3 className="code">Fléchettes lancées : {player.darts ? player.darts.length : 0}</h3>
      <p className="code">
        Moyenne / fléchette :{" "}
  {player.darts && player.darts.length > 0
    ? (player.score / player.darts.length).toFixed(2)
    : 0}
      </p>
      <div className="grid">
          <div className="card dashboard">
            <h2>Reste pour gagner :</h2>

            <p>{321 - player.score || 0}</p>
          </div>
        </div>
      <div className="player-list ">
        {/* <h4>Écarts avec les autres joueurs</h4> */}
        <div className="grid">
        {players
          .filter((p) => p.id !== player.id && p.score > player.score)
          .map((p) => {
            return (
              <div
                key={p.id}
                className="card dashboard"
                
                style={{
                  backgroundColor: getBackgroundColor(p.score - player.score),
                  
                }}
              >
                <h2>
                  {p.id}. {p.name}
                </h2>
                {parseInt(p.score, 10) - (player.score || 0) >= 0 ? (
                  <p>{parseInt(p.score, 10) - (player.score || 0)} pour reset {p.name}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
            );
          })}
          </div>

        {/* <div className="grid">
          {players
            .filter((p) => p.id !== player.id)
            .map((p) => (
              <div key={p.id} className="card">
                <h2>
                  {p.id}. {p.name}
                </h2>
                {parseInt(p.score, 10) - (player.score || 0) >= 0 ? (
                  <p>{parseInt(p.score, 10) - (player.score || 0)}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
            ))}
        </div> */}
       
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
      />
    </div>
  );
};

export default PlayerStats;
