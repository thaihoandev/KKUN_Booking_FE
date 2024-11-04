import React, { useState, useRef, useEffect } from "react";

function NiceSelect({ options, value, onChange, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev); // Đảm bảo toggle trạng thái đúng
    };

    const handleOptionClick = (option, event) => {
        event.stopPropagation(); // Ngăn không cho sự kiện click lan đến handleToggle
        onChange(option);
        setIsOpen(false); // Đóng dropdown sau khi chọn
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false); // Đóng dropdown khi click bên ngoài
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
                <span className="current">{value ? value.label : "Chọn"}</span>
                <ul className={`list ${isOpen ? "show" : ""}`}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`option ${
                                value && value.value === option.value
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={(e) => handleOptionClick(option, e)} // Truyền event để ngăn propagation
                            role="option"
                            aria-selected={
                                value && value.value === option.value
                            }
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NiceSelect;
