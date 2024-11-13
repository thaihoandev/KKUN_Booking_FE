// components/ChatButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatButton = () => {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate("/chatbot"); // Điều hướng đến trang chatbot
    };

    return (
        <button
            type="button"
            className="btn btn-primary rounded-circle position-fixed"
            style={{
                backgroundColor: "var(--primary-color1)",
                borderColor: "var(--primary-color1)",
                bottom: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                zIndex: "1000",
            }}
            onClick={handleChatClick}
        >
            💬
        </button>
    );
};

export default ChatButton;
