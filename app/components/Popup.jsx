import React from "react";
import styles from "../styles.scss";
import Image from "next/image";

function Popup({ isOpen, onClose, message, title, image }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-message">
            <Image
            className="logo"
            src={image}
            width={100}
            height={100}
            alt={image}
            />
          <h2>{title}</h2>
          <p>{message}</p>
          <button className="bottom btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
