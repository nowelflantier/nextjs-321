import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ buttons }) => {

  return (
    <div className="center container">
    {buttons.map((button, index) => (
      <Link
        key={index}
        href={button.path}
        className="bottom btn"
      >
        <p>{button.text}</p>
      </Link>
    ))}
  </div>
  );
};

export default Footer;
