import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookingSuccess() {
    const { t } = useTranslation();

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", padding: "30px" }} // Thêm padding để tránh bị dồn vào góc
        >
            <Row className="text-center">
                <Col md={12} lg={12}>
                    {" "}
                    {/* Điều chỉnh độ rộng của Alert */}
                    <Alert variant="success" className="p-5 shadow-lg rounded">
                        <h1 className="display-4">
                            <strong>{t("paymentSuccess")}</strong>
                        </h1>
                        <p className="lead">{t("thanksToBook")}</p>
                        <Link className="primary-btn3 mt-4" to="/">
                            {t("backHomeBtn")}
                        </Link>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default BookingSuccess;
