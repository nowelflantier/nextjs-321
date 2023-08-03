import React from "react";


const Footer = ({ buttons, selectedGame }) => {
  

  // Si selectedGame est null, n'affichez pas les boutons
  if (selectedGame === null) {
    return null;
  }
  return (
    

    <div className="center container">
      {buttons.map((button, index) => (
        <a key={index} href={`${button.path}`}>
          <p className="bottom btn">{button.text}</p>
        </a>
      ))}
    </div>
    // </ContextDataLoader>

  );
};

export default Footer;
