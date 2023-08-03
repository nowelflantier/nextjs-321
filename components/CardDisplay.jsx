import React from "react";
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
  
  return (
    <div className={style} id={id}>
      <Link
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

      </Link>
    </div>
  );
};

export default CardDisplay;
