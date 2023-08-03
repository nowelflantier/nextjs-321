import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ buttons }) => {
console.log(buttons)
  return (
    <div className="center container">
    {buttons.map((button, index) => (
      <Link
        key={index}
        href="{button.path}"
        
      >
        <p className="bottom btn">{button.text}</p>
      </Link>
    ))}
  </div>
  );
};

export default Footer;
