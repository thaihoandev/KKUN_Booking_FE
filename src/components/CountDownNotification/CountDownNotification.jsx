import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const CountDownNotification = () => {
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 19:52 in seconds
    const { t } = useTranslation();
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <>
            <div className="alert alert-light border-danger border-opacity-25 py-2 m-0 mb-2">
                <div className="container d-flex align-items-center justify-content-center gap-2">
                    <span className="text-danger">
                        {t("countdown.holdingPrice")}...
                    </span>
                    <div className="d-flex align-items-center gap-1 text-danger">
                        <Clock size={16} />
                        <span className="fw-medium">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CountDownNotification;
