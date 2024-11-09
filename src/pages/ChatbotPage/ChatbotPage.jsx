import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import * as ChatService from "../../services/ChatService";

function ChatbotPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const styles = {
        chatMessages: {
            height: "500px",
            overflowY: "auto",
            scrollBehavior: "smooth",
        },
        messageContainer: (isUser) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: isUser ? "flex-end" : "flex-start",
            marginBottom: "0.5rem",
        }),
        messageBox: (isUser) => ({
            maxWidth: "70%",
            padding: "0.2rem 0.75rem",
            borderRadius: "0.375rem",
            backgroundColor: isUser ? "#0d6efd" : "#f8f9fa",
            color: isUser ? "white" : "black",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }),
        messageText: {
            wordBreak: "break-word",
        },
        timestamp: {
            fontSize: "0.75rem",
            color: "#6c757d",
        },
        typingIndicator: {
            display: "flex",
            gap: "4px",
            padding: "0.5rem",
        },
        typingDot: {
            width: "8px",
            height: "8px",
            backgroundColor: "#90949c",
            borderRadius: "50%",
            animation: "typing 1s infinite ease-in-out",
        },
    };

    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
            @keyframes typing {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessageMutation = useMutation(
        (message) => ChatService.sendChatMessage(message),
        {
            onMutate: async (newMessage) => {
                const userMessage = {
                    user: "user",
                    text: newMessage,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, userMessage]);
                setInput("");
                setIsLoading(true);
            },
            onSuccess: (data) => {
                const botReply = {
                    user: "bot",
                    text: data[0].text,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botReply]);
            },
            onError: (error) => {
                console.error("Error sending message:", error);
            },
            onSettled: () => {
                setIsLoading(false);
            },
        }
    );

    const handleSendMessage = () => {
        if (!input.trim()) return;
        sendMessageMutation.mutate(input);
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-chat-dots-fill me-2"></i>
                                AI bot hỗ trợ xem đặt phòng
                            </h5>
                        </div>

                        <div
                            className="card-body"
                            ref={chatContainerRef}
                            style={styles.chatMessages}
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    style={styles.messageContainer(
                                        msg.user === "user"
                                    )}
                                >
                                    <div
                                        style={styles.messageBox(
                                            msg.user === "user"
                                        )}
                                    >
                                        <div style={styles.messageText}>
                                            {msg.text}
                                        </div>
                                    </div>
                                    <div style={styles.timestamp}>
                                        {formatTime(msg.timestamp)}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div style={styles.messageContainer(false)}>
                                    <div style={styles.messageBox(false)}>
                                        <div style={styles.typingIndicator}>
                                            {[0, 1, 2].map((i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        ...styles.typingDot,
                                                        animationDelay: `${
                                                            0.2 + i * 0.1
                                                        }s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="card-footer bg-light">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                    }}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSendMessage()
                                    }
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSendMessage}
                                    disabled={isLoading}
                                >
                                    <i className="bi bi-send-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatbotPage;
