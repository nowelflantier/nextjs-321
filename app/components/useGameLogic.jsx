import React, { useState, useEffect, useCallback } from "react";

const useGameLogic = (initialState) => {
  const [players, setPlayers] = useState(initialState.players || []);
  const [currentPlayer, setCurrentPlayer] = useState(
    initialState.currentPlayer || 1
  );
  const [currentDart, setCurrentDart] = useState(initialState.currentDart || 0);
  const [newCurrentScore, setNewCurrentScore] = useState(
    initialState.newCurrentScore || ""
  );
  const [isDisabled, setIsDisabled] = useState(initialState.isDisabled || true);
  const [isWinner, setIsWinner] = useState(initialState.isWinner || {});
  const [isNotValidScore, SetIsNotValidScore] = useState(
    initialState.isNotValidScore || false
  );
  const playerIndex = currentPlayer - 1;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Place your logic here, like the 'handleInputChange' function, 'handleNewScore' function, etc.
  const handleInputChange = useCallback((e) => {
    if (e === "" || e === null || e === undefined) {
      setNewCurrentScore("");
      setIsDisabled(true);
      SetIsNotValidScore(false);
    } else {
      const score = parseInt(e, 10);
      if (isNaN(score) || score < 0 || score > 60) {
        setNewCurrentScore(e);
        setIsDisabled(true);
        SetIsNotValidScore(true);
      } else {
        setNewCurrentScore(score);
        setIsDisabled(false);
        SetIsNotValidScore(false);
      }
    }
  }, []);

  const handleNewScore = useCallback(() => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    // Check that player is defined
    if (!player) {
      console.error("Player is undefined");
      return;
    }
    const potentialNewScore = player.score + newCurrentScore;
    for (let i = 0; i < updatedPlayers.length; i++) {
      if (i !== playerIndex && updatedPlayers[i].score === potentialNewScore) {
        updatedPlayers[i].score = 0;
        updatedPlayers[i].resetAmountDefense =
          updatedPlayers[i].resetAmountDefense + 1;
        player.resetAmount = player.resetAmount + 1;
        // Ouvrez la popup et mettez à jour le message
        setIsPopupOpen(true);
        setPopupMessage(
          `${player.name} a reset ${updatedPlayers[i].name}`
        );
      }
    }
    player.darts.push(newCurrentScore);
    player.score = potentialNewScore;
    if (player.score === 321) {
      setIsWinner({ player: players[currentPlayer - 1].id, defined: true });
      // Réinitialiser le jeu ou faire autre chose ici
    } else if (player.score > 321) {
      const newScore = 321 - (potentialNewScore - 321);
      player.score = newScore;
      setCurrentDart(3);
    } else {
      handleNextDart(currentDart);
    }
    setPlayers(updatedPlayers);
    setNewCurrentScore("");
    setIsDisabled(true);
  }, [players, newCurrentScore, currentPlayer, currentDart]);

  const handleNextDart = useCallback((currentDart) => {
    if (currentDart >= 3) {
      setCurrentDart(0);
    } else {
      setCurrentDart(currentDart + 1);
    }
  }, []);

  const handleNextPlayer = useCallback(() => {
    if (currentPlayer === players.length) {
      setCurrentDart(0);
      setCurrentPlayer(1);
      setNewCurrentScore("");
    } else {
      setCurrentPlayer(currentPlayer + 1);
      const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
      setCurrentDart(0);
      setNewCurrentScore("");
    }
  }, [currentPlayer, players]);

  return {
    handleInputChange,
    handleNewScore,
    handleNextPlayer,
    handleNextDart,
    isPopupOpen,
    setIsPopupOpen,
    popupMessage,
    setPopupMessage,
    players,
    setPlayers,
    currentPlayer,
    setCurrentPlayer,
    currentDart,
    setCurrentDart,
    newCurrentScore,
    setNewCurrentScore,
    isDisabled,
    setIsDisabled,
    isWinner,
    setIsWinner,
    isNotValidScore,
    SetIsNotValidScore,
    playerIndex,
    // export other functions as needed
  };
};

export default useGameLogic;
