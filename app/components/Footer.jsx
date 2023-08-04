"use client";
import React, { useEffect, useState } from "react";

const Footer = ({ buttons, selectedGame }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    {selectedGame !== null && setIsLoaded(true)}
 });

  // Si selectedGame est null, n'affichez pas les boutons
  // if (selectedGame === null) {
  //   return null;
  // }
  return (
    isLoaded && ( <div className="center container">
    {buttons.map((button, index) => {
      // Vérifiez si le bouton est null ou undefined avant d'essayer d'accéder à ses propriétés
      if (button !== null && button !== undefined) {
        return (
          <a key={index} href={`${button.path}`}>
            <p className="bottom btn">{button.text}</p>
          </a>
        );
      }
      // Si le bouton est null ou undefined, ne renvoyez rien
      return null;
    })}
  </div>)
  );
};

export default Footer;
