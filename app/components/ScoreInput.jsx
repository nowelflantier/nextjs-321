import React from "react";
const ScoreInput = ({
  newCurrentScore,
  handleInputChange,
  handleNewScore,
  isNotValidScore,
  currentDart,
  handleNextPlayer,
  isDisabled,
  isTurnOver,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // This is important to prevent form's default submission behaviour
    if (!isDisabled) {
      if (e.key === 'Enter') {
      handleNewScore();
      }
    }
  };
  return (!isTurnOver && currentDart < 3) ? (
    <form onSubmit={handleSubmit} className="addScore">
     
      <input
        type="text"
        placeholder="0"
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        value={newCurrentScore}
        className="select"
        inputMode="numeric"
      />
      {isNotValidScore && isDisabled && (
        <p className="error">Entrez un nombre entre 0 et 60</p>
      )}
      {isDisabled ? (
        true
      ) : (
        <button
          className="btn bottom"
          value={newCurrentScore}
          type="submit" // This is important for the enter key to trigger this button's action
          onClick={handleNewScore}
          display={!isNotValidScore ? "true" : undefined}
        >
           Ajouter le score - {newCurrentScore}
        </button>
      )}
      
      </form>
  ) : (
    <div className="addScore">
      <button className="btn bottom" onClick={handleNextPlayer}>
      Joueur suivant
      </button>
    </div>
  );
};
export default ScoreInput;