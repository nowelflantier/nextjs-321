"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
// import { useGames } from "@/app/components/GameContext"

const Header = ({
  src,
  title,
  width,
  height,
  description,
  alt,
  selectedGame,
  selectedGameDetails,
}) => {
   const [isLoaded, setIsLoaded] = useState(false)
  // const title = title;
  // const { getSelectedGameDetails, selectedGame } = useGames();
  // const selectedGameDetails = getSelectedGameDetails();
  // If selectedGame is undefined, render null
  // if ( selectedGame === undefined || selectedGame === null) {
  //   return null;
  // }
  useEffect(() => {
     {selectedGame !== null && setIsLoaded(true)}
  });
  return (
   isLoaded && (
      <>
        <div className="description">
          <p>{description}</p>
          <div>powered by le S.</div>
        </div>
  
        <div className="center container">
          <p className="code">
            {title}
            <br />
          </p>
          <Image
            className="logo"
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
          />
        </div>
      </>
    )
  );
};

export default Header;
