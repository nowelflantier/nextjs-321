import { useEffect, useState, useRef } from "react";

// Nous définissons un Hook personnalisé pour gérer le localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useLocalStorage("currentPlayer", 1);
  const [currentDart, setCurrentDart] = useLocalStorage("currentDart", 0);
  const [players, setPlayers] = useLocalStorage("players", [
    { id: 0, score: null },
    { id: 1, score: null },
    { id: 2, score: null },
  ]);
  const [newScore, setNewScore] = useState("");
  const [isScoreInvalid, setIsScoreInvalid] = useState(false);
  const inputRef = useRef();

  // Cette fonction vérifie si le score potentiel est valide, puis met à jour le score du joueur.
  const updatePlayerScore = (score) => {
    if (score < 0 || score > 60) {
      setIsScoreInvalid(true);
    } else {
      const newPlayers = players.map((player, index) => {
        if (index + 1 === currentPlayer) {
          return { ...player, score };
        }
        return player;
      });

      setPlayers(newPlayers);
      setIsScoreInvalid(false);
    }
  };

  const handleScoreChange = (event) => {
    setNewScore(event.target.value);
  };

  const handleNewScore = () => {
    updatePlayerScore(parseInt(newScore, 10) + players[currentPlayer - 1].score);
    if (currentDart < 3) {
      setCurrentDart(currentDart + 1);
    } else {
      const nextPlayer = currentPlayer === players.length ? 1 : currentPlayer + 1;
      setCurrentPlayer(nextPlayer);
      setCurrentDart(0);
    }
    setNewScore("");
  };

  useEffect(() => {
    if (players.find((player) => player.score === 321)) {
      // Redirect to end game
    }
  }, [players]);

  useEffect(() => {
    inputRef.current.focus();
  }, [newScore]);

  // ... reste du code
};

export default Game;
