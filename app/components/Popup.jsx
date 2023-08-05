import React from "react";
import styles from "../styles.scss";

function Popup({ isOpen, onClose, message }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>{message}</h2>
                <button className="bottom btn" onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default Popup;
