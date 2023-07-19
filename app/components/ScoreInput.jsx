import React from "react";

const ScoreInput = ({
  newCurrentScore,
  handleInputChange,
  handleNewScore,
  isNotValidScore,
  currentDart,
  handleNewTurn,
  isDisabled,
}) => {

  return currentDart < 3 ? (
    <div className="addScore">
      <input
        type="number"
        placeholder="0"
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        value={newCurrentScore}
        className="select"
        inputMode="numeric"
      />
      {isNotValidScore && (
        <p className="error">Entrez un nombre entre 0 et 60</p>
      )}
      {isDisabled ? (
        true
      ) : (
        <button
          className="btn bottom"
          value={newCurrentScore}
          onClick={handleNewScore}
          //   display={!isNotValidScore}
          display={!isNotValidScore ? "true" : undefined}
        >
          AddScore - {newCurrentScore}
        </button>
      )}
    </div>
  ) : (
    <div className="addScore">
      <button className="btn bottom" onClick={handleNewTurn}>
        NextPlayer
      </button>
    </div>
  );
};

export default ScoreInput;
