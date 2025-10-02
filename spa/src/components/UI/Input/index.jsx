import React from "react";
import "./input.css";

function Input({ label, name, type = 'text', value, onChange, placeholder = '', required = false, disabled = false, className = '' }) {
    return (
        <div className={`input-group ${className}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                autoComplete="off"
                />
        </div>
    );
}

export default Input;
