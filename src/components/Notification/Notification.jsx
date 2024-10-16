import React, { useState } from "react";
import { useEffect } from "react";
import "./Notification.css"; // Đảm bảo bạn tạo file CSS riêng

const Notification = ({
    type = "success",
    message = "",
    title = "",
    duration = 3000,
}) => {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(100); // Tiến trình sẽ chạy từ 100% đến 0%

    useEffect(() => {
        // Mỗi 30ms sẽ giảm 1% cho thanh tiến trình
        const interval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 100 / (duration / 30), 0));
        }, 30);

        // Sau 3 giây (hoặc thời gian được chỉ định), ẩn thông báo
        const timeout = setTimeout(() => {
            setVisible(false);
        }, duration);

        // Xóa timer khi component bị unmount
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [duration]);

    if (!visible) {
        return null; // Không hiển thị nếu thông báo đã bị ẩn
    }

    return (
        <div className={`notice ${type}`}>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="notice-title">{title}</h4>
                <div className="close-btn" onClick={() => setVisible(false)}>
                    &times;
                </div>
            </div>
            <p>{message}</p>

            {/* Thanh tiến trình */}
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Notification;
