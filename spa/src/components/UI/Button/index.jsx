import React from "react";
import "./button.css";

function Button({ children, onClick, type = 'button', className = '', disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
