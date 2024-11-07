import { useEffect, useRef, useState } from "react";

function NiceSelect({ options, value, onChange, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option, event) => {
        event.stopPropagation();
        onChange(option); // Truyền đối tượng { label, value } để lấy `label` khi cần
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
                            onClick={(e) => handleOptionClick(option, e)}
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
