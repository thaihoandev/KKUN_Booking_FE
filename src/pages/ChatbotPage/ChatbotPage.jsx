import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import * as ChatService from "../../services/ChatService";
import { v4 as uuidv4 } from "uuid";

function ChatbotPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const chatContainerRef = useRef(null);
    const sessionId = useRef(sessionStorage.getItem("sessionId") || uuidv4());

    useEffect(() => {
        sessionStorage.setItem("sessionId", sessionId.current);
    }, []);
    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage("");
    };
    const styles = {
        chatContainer: {
            maxWidth: "900px",
            margin: "2rem auto 10rem",
            boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            borderRadius: "1rem",
            backgroundColor: "#fff",
            overflow: "hidden",
        },
        header: {
            background: "var(--primary-color1)",
            color: "white",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
        headerTitle: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: "600",
        },
        chatMessages: {
            height: "600px",
            overflowY: "auto",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
        },
        messageContainer: (isUser) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: isUser ? "flex-end" : "flex-start",
            marginBottom: "0.25rem",
        }),

        messageWrapper: {
            display: "flex",
            gap: "0.75rem",
            maxWidth: "75%",
            alignItems: "flex-start",
            position: "relative", // Thêm position relative
        },
        avatar: (isUser) => ({
            minWidth: "2.5rem", // Thêm minWidth để tránh co lại
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isUser ? "var(--primary-color1)" : "#e9ecef",
            color: isUser ? "white" : "var(--primary-color1)",
            fontSize: "1.2rem", // Tăng kích thước icon
            position: "sticky", // Thêm position sticky
            top: "10px", // Giữ avatar ở vị trí top 10px
            flexShrink: 0, // Ngăn avatar co lại
            marginTop: "2px", // Thêm margin top nhỏ
            border: isUser ? "none" : "1px solid #dee2e6", // Thêm viền cho avatar bot
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // Thêm shadow nhẹ
        }),
        messageBox: (isUser) => ({
            padding: "0.5rem 1rem",
            borderRadius: "1rem",
            backgroundColor: isUser ? "var(--primary-color1)" : "white",
            color: isUser ? "white" : "black",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: isUser ? "none" : "1px solid #dee2e6",
            maxWidth: "100%",
            wordBreak: "break-word",
            marginTop: "2px", // Thêm margin top để căn chỉnh với avatar
        }),
        botIcon: {
            transform: "scale(1.2)", // Scale up icon một chút
            display: "block", // Đảm bảo icon hiển thị block
        },
        userIcon: {
            transform: "scale(1.1)", // Scale up icon người dùng nhẹ hơn
            display: "block",
        },
        timestamp: {
            fontSize: "0.75rem",
            color: "#6c757d",
            marginTop: "0.25rem",
            padding: "0 0.5rem",
        },
        inputContainer: {
            padding: "1rem 1.5rem",
            backgroundColor: "white",
            borderTop: "1px solid #dee2e6",
        },
        inputWrapper: {
            display: "flex",
            gap: "0.75rem",
        },
        input: {
            flex: 1,
            padding: "0.75rem 1rem",
            border: "1px solid #dee2e6",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            transition: "border-color 0.15s ease-in-out",
            outline: "none",
        },
        sendButton: {
            padding: "0.75rem 1.5rem",
            backgroundColor: "var(--primary-color1)",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "background-color 0.15s ease-in-out",
        },
        typingIndicator: {
            display: "flex",
            gap: "6px",
            padding: "0.75rem 1rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            width: "fit-content",
        },
        typingDot: {
            width: "8px",
            height: "8px",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            animation: "typing 1s infinite ease-in-out",
        },
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        modalImage: {
            maxWidth: "90%",
            maxHeight: "90%",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
        closeButton: {
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "30px",
            height: "30px", // Add height to ensure it's a perfect circle
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.5rem", // Adjust font size if needed
            lineHeight: "1", // Set line height to ensure icon is centered
            padding: "0", // Remove padding to prevent distortion
        },
    };

    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
            @keyframes typing {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            .hover-button:hover {
                background-color: #0b5ed7 !important;
            }

            .hover-input:focus {
                border-color: #0d6efd !important;
                box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25) !important;
            }

            /* Custom Scrollbar */
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 3px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessageMutation = useMutation(
        (message) => ChatService.sendChatMessage(message, sessionId.current),
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
                const botReplies = data.messages.map((msg) => ({
                    user: "bot",
                    text: msg,
                    timestamp: new Date(),
                }));
                setMessages((prev) => [...prev, ...botReplies]);
            },
            onError: (error) => {
                console.error("Lỗi khi gửi tin nhắn:", error);
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
        return new Date(date).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const renderMessageText = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const imageUrls = text.match(urlRegex) || [];

        if (imageUrls.length > 0) {
            return (
                <div
                    style={{
                        display: "inline-grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "0.5rem",
                        marginTop: "0.5rem",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt="Room Detail"
                            onClick={() => openModal(url)}
                            style={{
                                width: "100%", // Adjust width to fit within the grid column
                                height: "100px", // Set a fixed height for consistency
                                objectFit: "cover", // Ensures images fill the box without distortion
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                            }}
                        />
                    ))}
                </div>
            );
        }

        return text.split(urlRegex).map((part, index) =>
            urlRegex.test(part) ? (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    {part}
                </a>
            ) : (
                part
            )
        );
    };

    const TypingIndicator = () => (
        <div style={styles.typingIndicator}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    style={{
                        ...styles.typingDot,
                        animationDelay: `${i * 0.15}s`,
                    }}
                />
            ))}
        </div>
    );

    return (
        <div style={styles.chatContainer}>
            <div style={styles.header}>
                <h5 style={styles.headerTitle}>
                    <i className="bi bi-robot" />
                    Trợ lý AI Đặt Phòng
                </h5>
            </div>

            <div
                ref={chatContainerRef}
                style={styles.chatMessages}
                className="custom-scrollbar"
            >
                {messages.map((msg, index) => {
                    const isUser = msg.user === "user";

                    // Determine if this message should display an avatar
                    const showAvatar =
                        index === 0 || messages[index - 1]?.user !== msg.user;

                    // Determine if a timestamp should be displayed
                    const showTimestamp =
                        index === messages.length - 1 ||
                        messages[index + 1]?.user !== msg.user ||
                        new Date(messages[index + 1]?.timestamp) -
                            new Date(msg.timestamp) >
                            60000;

                    return (
                        <div
                            key={index}
                            style={styles.messageContainer(isUser)}
                        >
                            <div
                                style={{
                                    ...styles.messageWrapper,
                                    paddingLeft:
                                        !isUser && !showAvatar ? "3rem" : "0", // Adjust padding for bot messages without avatar
                                    paddingRight:
                                        isUser && !showAvatar ? "3rem" : "0", // Adjust padding for user messages without avatar
                                }}
                            >
                                {!isUser && showAvatar && (
                                    <div style={styles.avatar(false)}>
                                        <i
                                            className="bi bi-robot"
                                            style={styles.botIcon}
                                        />
                                    </div>
                                )}
                                <div style={styles.messageBox(isUser)}>
                                    {renderMessageText(msg.text)}
                                </div>
                                {isUser && showAvatar && (
                                    <div style={styles.avatar(true)}>
                                        <i
                                            className="bi bi-person-fill"
                                            style={styles.userIcon}
                                        />
                                    </div>
                                )}
                            </div>
                            {showTimestamp && (
                                <div style={styles.timestamp}>
                                    {formatTime(msg.timestamp)}
                                </div>
                            )}
                        </div>
                    );
                })}
                {isLoading && (
                    <div style={styles.messageContainer(false)}>
                        <div style={styles.messageWrapper}>
                            <div style={styles.avatar(false)}>
                                <i className="bi bi-robot" />
                            </div>
                            <TypingIndicator />
                        </div>
                    </div>
                )}
            </div>

            <div style={styles.inputContainer}>
                <div style={styles.inputWrapper}>
                    <input
                        type="text"
                        style={styles.input}
                        className="hover-input"
                        placeholder="Nhập tin nhắn của bạn..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                        }
                    />
                    <button
                        style={styles.sendButton}
                        className="hover-button"
                        onClick={handleSendMessage}
                        disabled={isLoading}
                    >
                        <i className="bi bi-send-fill" />
                        Gửi
                    </button>
                </div>
            </div>
            {/* Modal for image zoom */}
            {isModalOpen && (
                <div style={styles.modalOverlay} onClick={closeModal}>
                    <button style={styles.closeButton} onClick={closeModal}>
                        &times;
                    </button>
                    <img
                        src={modalImage}
                        alt="Zoomed"
                        style={styles.modalImage}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatbotPage;
