import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookingFailure() {
    const { t } = useTranslation();

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Row className="text-center">
                <Col>
                    <Alert variant="danger" className="p-5 shadow-lg rounded">
                        <h1 className="mb-4">{t("paymentFailure")}</h1>
                        <p className="lead mb-4">{t("errorToBook")}</p>
                        <Button
                            variant="outline-danger"
                            size="lg"
                            as={Link}
                            to="/"
                        >
                            {t("backHomeBtn")}
                        </Button>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default BookingFailure;
