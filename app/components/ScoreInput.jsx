'use client'
import React, {useState} from "react";
import VirtualKeyboard from "./VirtualDartScoreKeyboard";
import useGameLogic from "@/app/components/useGameLogic";

const ScoreInput = ({
  newCurrentScore,
  handleInputChange,
  handleNewScore,
  currentDart,
  handleNextPlayer,
  isTurnOver,
  isDisabled,
  isNotValidScore,
  // handleScoreCalculation,
}) => {
  const [isKeyboardVisible,setIsKeyboardVisible] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault(); // This is important to prevent form's default submission behaviour
    if (!isDisabled) {
      
      handleNewScore();
      
    }
  };
  const handleShowKeyboard = () => {
    setIsKeyboardVisible(true)
  }
  const handleHideKeyboard = () => {
    setIsKeyboardVisible(false)
    console.log(isDisabled)
  }
  return (!isTurnOver && currentDart < 3) ? (
    <form onSubmit={handleSubmit} className="addScore">
     
      <input
        type="number"
        placeholder="0"
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        value={newCurrentScore}
        className="select"
        inputMode="numeric"
        readOnly
        onFocus={handleShowKeyboard}
      />
     {isKeyboardVisible && <VirtualKeyboard handleInputChange={handleInputChange} isDisabled={isDisabled} handleHideKeyboard={handleHideKeyboard}/>}
      {isNotValidScore && isDisabled && (
        <p className="error">Entrez un nombre entre 0 et 60</p>
      )}
      {!isDisabled && (
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