"use client";
import React, { useState } from "react";
import useGameLogic from "@/app/components/useGameLogic";
import styles from "../styles.scss";

const keys1 = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
  { label: "11", value: 11 },
  { label: "12", value: 12 },
  { label: "13", value: 13 },
  { label: "14", value: 14 },
  { label: "15", value: 15 },
  { label: "16", value: 16 },
  { label: "17", value: 17 },
  { label: "18", value: 18 },
  { label: "19", value: 19 },
  { label: "20", value: 20 },
  { label: "Bull", value: 25 },
];

const keys2 = [
  { label: "simple", value: 1 },
  { label: "double", value: 2 },
  { label: "triple", value: 3 },
];
const keysbull = [
  { label: "simple", value: 1 },
  { label: "double", value: 2 },
];
const keysValidation = [{ label: "Ajouter le score", value: 1 }];

const VirtualKeyboard = ({
  newCurrentScore,
  setNewCurrentScore,
  handleHideKeyboard,
  handleNewScore,
  handleInputChange,
}) => {
  const { setIsDisabled } = useGameLogic({
    // isDisabled: true,
    // isNotValidScore: false,
  });
  const [step, setStep] = useState(1);
  const [firstValue, setFirstValue] = useState(null);
  const [displayedScore, setDisplayedScore] = useState(null);
  const [keys, setKeys] = useState(keys1);

  //   const keys = step === 1 ? keys1 : keys2;

  const handleKeyClick = (value) => {
    // value.preventDefault();

    setDisplayedScore(value);
    if (step === 1 && value !== 0) {
      if (value === 25) {
        setKeys(keysbull);
      } else {
        setKeys(keys2);
      }
      setFirstValue(parseInt(value));
      setStep(2);
    } else if (step === 2) {
      const score = firstValue * parseInt(value, 10);
      setDisplayedScore(score);
      setKeys(keysValidation);
      setStep(3);

      setNewCurrentScore(score);
    } else {
      handleNewScore(displayedScore);
      console.log(newCurrentScore);

      setStep(1);

      setFirstValue(null);
      handleHideKeyboard();
      setIsDisabled(false);
    }
  };
  const handleReturn = () => {
    setStep(1);
    setKeys(keys1);
  };

  //   const handleValidationClick = () => {
  //     if (step === 1 && firstValue !== null) {
  //     } else {
  //       handleInputChange(displayedScore);
  //     }
  //   };
  // const handleDoneClick = () => {
  //   onDone();
  // };
  return (
    <>
      <div className="keyboard">
        {displayedScore && (
          <div>
            <p className="code">Score actuel : </p>
            <div className="score center">
              <h3>{displayedScore}</h3>
            </div>
          </div>
        )}
        <div className="keys">
          {keys.map((k) => (
            <button
              className={`key ${step === 3 ? "validate" : ""}`}
              key={k.label}
              onClick={() => handleKeyClick(k.value)}
            >
              {k.label.toUpperCase()}
            </button>
          ))}
          <div className="keyboard-buttons">
            {step === 1 && (
              <button className="key" onClick={() => handleKeyClick(0)}>
                Manqué
              </button>
            )}
            {step !== 1 && (
              <button className="key" onClick={handleReturn}>
                Retour
              </button>
            )}

            <button className="key" onClick={handleHideKeyboard}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualKeyboard;
