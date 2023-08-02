import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = ({ src, title, width, height, description }) => {
    // const title = title;

  return (
    <>
      <div className="description">
        <p>{description}</p>
        <div>powered by le S.</div>
      </div>

      <div className="center container">
        <p className="code">
          {title}<br />
        </p>
        <Image
          className="logo"
          src={src}
          alt="Next.js Logo"
          width={width}
          height={height}
          priority
        />
      </div>
    </>
  );
};

export default Header;
