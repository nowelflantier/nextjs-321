"use client";

import React, { useRef, useState, useEffect } from "react";
import PlayerStats from "@/app/components/PlayerStats";
import PlayerList from "@/app/components/PlayerList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../styles.scss";

const Game = () => {
    const router = useRouter();
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [currentDart, setCurrentDart] = useState(0);
  const [newCurrentScore, setNewCurrentScore] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef();
  const [isWinner, setIsWinner] = useState({});
  const [isNotValidScore, SetIsNotValidScore] = useState(false);
  const playerIndex = currentPlayer - 1;

  useEffect(() => {
    const localData = localStorage.getItem("players");
    if (localData) {
      setPlayers(JSON.parse(localData));
    }
    if (localStorage.getItem("winner") !== null) {
      router.push(`/321/end-game`);
    }
    if (localStorage.getItem("currentDart") !== null) {
      setCurrentDart(parseInt(localStorage.getItem("currentDart"), 10));
    }
    if (localStorage.getItem("currentPlayer") !== null) {
      setCurrentPlayer(parseInt(localStorage.getItem("currentPlayer"), 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentDart", currentDart.toString());
    localStorage.setItem("currentPlayer", currentPlayer.toString());
  }, [currentDart]);

  useEffect(() => {
    if (isWinner.defined) {
      // Logic for when a player wins
      const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
      const playerJSON = JSON.stringify(storedPlayers[playerIndex]);
      localStorage.setItem("winner", playerJSON);
      console.log(`Player ${isWinner.player} is the winner!`);
      console.log(isWinner);
      router.push(`/321/end-game`);
    }
  }, [isWinner]);

  // useEffect(()=>{
  //     inputRef.current?.focus();
  // }, [newCurrentScore])

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleInputChange = async (e) => {
    if (e.target.value === "") {
      setNewCurrentScore("");
      setIsDisabled(true);
      SetIsNotValidScore(false);
    } else {
        const score = parseInt(e.target.value, 10);
        if (isNaN(score) || score < 0 || score > 60) {
          setNewCurrentScore(e.target.value);
          setIsDisabled(true);
          SetIsNotValidScore(true);
        } else {
          setNewCurrentScore(score);
          setIsDisabled(false);
          SetIsNotValidScore(false);
        }
      }
    };
    const handleNewScore = async () => {
        // if (isNotValidScore) return;
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
            //   setCurrentDart(currentDart + 1);
          }
          setPlayers(updatedPlayers);
          setNewCurrentScore("");
          setIsDisabled(true);
        };
        const handleNextDart = (currentDart) => {
            if (currentDart >= 3) {
              setCurrentDart(0);
            } else {
                setCurrentDart(currentDart + 1);
            }
          };
          const handleNextPlayer = async () => {
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
            };
            return (
                <main className="main">
                  <div className="description">
                    <p>Jeu en cours de développement</p>
                    <div>powered by le S.</div>
                  </div>
                  <Image
                    className="logo"
                    src="/dart-aim.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={87}
                    priority
                  />
                  <PlayerStats
                          currentPlayer={currentPlayer}
                          players={players}
                          currentDart={currentDart}
                          newCurrentScore={newCurrentScore}
                          handleInputChange={handleInputChange}
                          handleNewScore={handleNewScore}
                          isNotValidScore={isNotValidScore}
                          handleNextPlayer={handleNextPlayer}
                          isDisabled={isDisabled}
                          // isTurnOver={isTurnOver}
                        />
                         <PlayerList players={players} currentPlayer={currentPlayer} />

<div className="center container">
     {/* <p className="code">
          work in progress
          <br />
          </p> */}
        <Link href="/" className="bottom btn">
          <p>Back home</p>
        </Link>
      </div>
    </main>
  );
};
export default Game;                