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

const VirtualKeyboard = ({ handleHideKeyboard, handleInputChange }) => {
  const { setIsDisabled, SetIsNotValidScore } = useGameLogic({
    isDisabled: true,
    isNotValidScore: false,
  });
  const [step, setStep] = useState(1);
  const [firstValue, setFirstValue] = useState(null);
  const [displayedScore, setDisplayedScore] = useState(null);

  const keys = step === 1 ? keys1 : keys2;

  const handleKeyClick = (value) => {
    // value.preventDefault();
    setDisplayedScore(value);
    if (step === 1) {
      setFirstValue(parseInt(value));
      setStep(2);
    } else {
      handleInputChange(firstValue * parseInt(value, 10));
      setStep(1);
      //   setDisplayedScore(null);
      setFirstValue(null);
      handleHideKeyboard();
      setIsDisabled(false);
      SetIsNotValidScore(false);
    }
  };

  const handleValidationClick = () => {
    if (step === 1 && firstValue !== null) {
    } else {
      handleInputChange(displayedScore);
    }
  };
  // const handleDoneClick = () => {
  //   onDone();
  // };
  return (
    <>
      <div className="keyboard">
        {displayedScore && (
          <div className="score center">
            <h3>{displayedScore}</h3>
          </div>
        )}
        <div className="keys">
          {keys.map((k) => (
            <button
              className="key"
              key={k.label}
              onClick={() => handleKeyClick(k.value)}
            >
              {k.label.toUpperCase()}
            </button>
          ))}
          {/* <button className="key" onClick={handleValidationClick}>
            Suivant
          </button> */}
          <button className="key" onClick={handleHideKeyboard}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default VirtualKeyboard;
