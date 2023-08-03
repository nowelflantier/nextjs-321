'use client'
import React, {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

const CardDisplay = ({
  id,
  src,
  title,
  width,
  height,
  description,
  alt,
  path,
  style,
}) => {
  useEffect(()=>{
    console.log(path)
  },[])
  const url = path;
  return (
    <div className={style} id={id}>
      <a
        href={path}
        
      >
        <div className="center container">
          <Image
            className="logo"
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
          />
          <p className="code">
            {title}
            <br />
          </p>

          <p>{description}</p>
        </div>

        <p>Nouvelle partie de {title}</p>

      </a>
    </div>
  );
};

export default CardDisplay;
