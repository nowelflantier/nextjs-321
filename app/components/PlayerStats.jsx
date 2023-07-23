import React from "react";
import ScoreInput from "./ScoreInput";

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
}) => {
  const player = players[currentPlayer - 1] || {};
  return (
    <div className="active">
      <p className="code">
        Player {currentPlayer} - tour{" "}
        {currentDart + 1 === 4 ? "terminé" : currentDart + 1}
      </p>
      <h1>{player.name}</h1>
      <h2 className="score">{player.score || 0}</h2>
      <h3 className="code">Darts: {player.darts ? player.darts.length : 0}</h3>
      <p className="code">
        Average: {player.score ? player.score / player.darts.length : 0}
      </p>
      <ScoreInput
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
