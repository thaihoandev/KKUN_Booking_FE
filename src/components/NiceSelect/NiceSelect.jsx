import React, { useState, useRef, useEffect } from "react";

function NiceSelect({ options, value, onChange, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="form-inner" ref={dropdownRef}>
            {label && <label>{label}</label>}
            <div
                className={`nice-select ${isOpen ? "open" : ""}`}
                onClick={handleToggle}
                tabIndex={0}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="current">{value}</span>
                <ul className={`list ${isOpen ? "show" : ""}`}>
                    {options.map((option) => (
                        <li
                            key={option}
                            className={`option ${
                                value === option ? "selected" : ""
                            }`}
                            onClick={() => handleOptionClick(option)}
                            role="option"
                            aria-selected={value === option}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NiceSelect;
