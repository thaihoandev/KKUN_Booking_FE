import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import {
    bookingFormSchema,
    paymentFormSchema,
} from "../../schemas/validationSchemas";
import * as BookingService from "../../services/BookingService";
import FormField from "../Form/FormField/FormField";
import { useTranslation } from "react-i18next";
import convertToVND from "../../utils/convertToVND";

const TABS = {
    CONTACT: "v-pills-contact",
    PAYMENT: "v-pills-booking",
};

const MAIN_PAYMENT_METHODS = {
    ELECTRONIC: "electronic",
    CREDIT: "credit",
    ON_CHECKOUT: "POC",
};

const ELECTRONIC_PAYMENT_OPTIONS = {
    MOMO: "MOMO",
    VNPAY: "VNPAY",
};

const NoCardRequiredMessage = () => {
    const { t } = useTranslation(); // Khai báo useTranslation hook

    return (
        <div className="max-w-2xl p-4 rounded-lg border mb-2">
            <div className="flex items-start gap-3">
                <div className="row m-0">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-credit-card"></i>
                        <span className="px-2">
                            <strong>
                                {t("checkoutBooking.noCreditCardLabel")}
                            </strong>
                        </span>
                    </div>
                    {/* Dùng t để dịch chuỗi */}
                    <p>{t("checkoutBooking.noticeNotToPrePayment")}</p>
                </div>
            </div>
        </div>
    );
};
const RadioOption = ({ label, value, name, register, error }) => (
    <div
        className="checkbox-container"
        style={{ margin: "0 0", paddingBottom: "10px" }}
    >
        <label className="check-container">
            {label}
            <input
                type="radio"
                className="services_check"
                value={value}
                {...register(name)}
            />
            <span className="checkmark"></span>
        </label>
        {error && <span className="text-danger">{error.message}</span>}
    </div>
);

const RadioOptionSub = ({ label, value, name, register }) => (
    <div
        className="checkbox-container"
        style={{ borderBottom: "none", margin: "0 20px 0 0" }}
    >
        <label className="check-container">
            {label}
            <input
                type="radio"
                className="services_check"
                value={value}
                {...register(name)}
            />
            <span className="checkmark"></span>
        </label>
    </div>
);

const TabButton = ({ isActive, id, label, onClick }) => (
    <button
        className={`nav-link ${isActive ? "active" : ""}`}
        id={`${id}-tab`}
        data-bs-toggle="pill"
        data-bs-target={`#${id}`}
        type="button"
        role="tab"
        aria-controls={id}
        aria-selected={isActive}
        onClick={onClick}
    >
        {label}
    </button>
);

function BookingForm({ hotel, room, discount, setDiscount }) {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState(TABS.CONTACT);
    const [isBookingValid, setIsBookingValid] = useState(false);
    const booking = useSelector((state) => state.booking);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [voucherCode, setVoucherCode] = useState("");

    const [voucherError, setVoucherError] = useState(""); // Thông báo lỗi mã voucher
    const [promotionId, setPromotionId] = useState(null);
    const {
        register: registerBooking,
        handleSubmit: handleSubmitBooking,
        trigger: triggerBookingForm,
        formState: { errors: bookingErrors },
    } = useForm({
        resolver: yupResolver(bookingFormSchema),
        mode: "onChange",
    });

    const {
        register: registerPayment,
        handleSubmit: handleSubmitPayment,
        formState: { errors: paymentErrors },
        watch: watchPayment,
    } = useForm({
        resolver: yupResolver(paymentFormSchema),
        defaultValues: {
            mainPaymentMethod: MAIN_PAYMENT_METHODS.ELECTRONIC,
            electronicPaymentOption: ELECTRONIC_PAYMENT_OPTIONS.VNPAY,
        },
        mode: "onChange",
    });

    const mainPaymentMethod = watchPayment("mainPaymentMethod");

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            checkinDate: booking.checkInDate,
            checkoutDate: booking.checkOutDate,
            userId: user.id ? user.id : null,
            roomId: room.id,
            baseRatePerNight: room.basePrice,
        }));
    }, [booking, user, room.id]);

    const mutationBookingSubmit = useMutation(
        ({ data, accessToken }) =>
            BookingService.createBooking(data, accessToken || "anonymous"),
        {
            onSuccess: (data) => {
                toast.info(`${t("pendingBookings")}...!`);
                console.log(data);
                if (data.code === "200" && data.paymentUrl != null) {
                    window.location.href = data.paymentUrl;
                } else {
                    setTimeout(() => {
                        navigate("/bookings/booking-success");
                    }, 1000); // Độ trễ 2 giây
                }
            },
            onError: (error) => {
                toast.error(
                    error.message || t("toast.finishInfoBeforePayment")
                );
            },
        }
    );
    const verifyVoucherMutation = useMutation(
        (voucherCode) => BookingService.verifyVoucher(voucherCode),
        {
            onSuccess: (data) => {
                if (data && data.isActive) {
                    // Tính giá trị giảm giá dựa trên loại giảm giá
                    let calculatedDiscount =
                        data.discountType === "PERCENT"
                            ? Math.floor((data.value * room.basePrice) / 100)
                            : data.value;

                    // Kiểm tra nếu có maxDiscountValue
                    if (
                        data.maxDiscountValue &&
                        calculatedDiscount > data.maxDiscountValue
                    ) {
                        // Giới hạn giảm giá ở maxDiscountValue
                        calculatedDiscount = data.maxDiscountValue;
                    }

                    // Cập nhật giá trị giảm giá qua setDiscount
                    setDiscount(calculatedDiscount);

                    // Lưu thông tin promotion và xóa lỗi
                    setPromotionId(data.id);
                    setVoucherError("");

                    // Thông báo thành công
                    toast.success(
                        `${t(
                            "toast.applyVoucherSuccess"
                        )}: ${calculatedDiscount.toLocaleString("vi-VN")} VNĐ`
                    );
                } else {
                    // Voucher không hợp lệ hoặc hết hạn
                    setPromotionId(null);
                    setVoucherError(`${t("toast.invalidVoucherCode")}`);
                }
            },
            onError: (error) => {
                // Lỗi khi gọi API kiểm tra voucher
                setPromotionId(null);
                setVoucherError(`${t("toast.finishInfoBeforePayment")}`);
            },
        }
    );

    const handleFormSubmit = {
        booking: (data) => {
            const updatedFormData = {
                ...formData,
                bookingName: data.fullName,
                bookingPhone: data.phone,
                bookingEmail: data.email,
                bookingNotes: data.notes,
                paymentType:
                    hotel.paymentPolicy === "CHECKOUT"
                        ? MAIN_PAYMENT_METHODS.ON_CHECKOUT
                        : null,
                promotionId: promotionId || null,
            };

            // Cập nhật formData trước khi submit
            setFormData(updatedFormData);

            setIsBookingValid(true);

            if (
                hotel.paymentPolicy === "ONLINE" ||
                hotel.paymentPolicy === "ONLINE_CHECKOUT"
            ) {
                setActiveTab(TABS.PAYMENT);
            } else {
                console.log("data", updatedFormData); // Log chính xác dữ liệu đã cập nhật
                mutationBookingSubmit.mutate({
                    data: updatedFormData,
                    accessToken: user.accessToken,
                });
            }
        },
        payment: async (data) => {
            const bookingData = await triggerBookingForm();
            if (!bookingData) {
                toast.error(`${t("toast.finishInfoBeforePayment")}`);
                setActiveTab(TABS.CONTACT);
                return;
            }
            console.log(data);

            const tempFormData = {
                ...formData,
                promotionId: promotionId || null,
                paymentType:
                    data.mainPaymentMethod === MAIN_PAYMENT_METHODS.ELECTRONIC
                        ? data.electronicPaymentOption
                        : data.mainPaymentMethod,
            };
            mutationBookingSubmit.mutate({
                data: tempFormData,
                accessToken: user.accessToken,
            });
        },
    };

    const handleTabChange = (tabId) => {
        if (tabId === TABS.PAYMENT && !isBookingValid) {
            toast.error(`${t("toast.finishInfoBeforePayment")}`);

            return;
        }
        setActiveTab(tabId);
    };
    const applyVoucher = () => {
        if (!voucherCode) {
            setVoucherError(`${t("toast.voucherRequired")}`);
            return;
        }

        verifyVoucherMutation.mutate(voucherCode); // Gọi mutation
    };

    const renderContactForm = () => (
        <form onSubmit={handleSubmitBooking(handleFormSubmit.booking)}>
            <FormField
                label={t("fullName")}
                error={bookingErrors.fullName}
                register={registerBooking("fullName")}
                placeholder={t("checkoutBooking.nameLabelPh")}
            />
            <FormField
                label={t("email")}
                type="email"
                error={bookingErrors.email}
                register={registerBooking("email")}
                placeholder={t("checkoutBooking.emailLabelPh")}
            />
            <FormField
                label={t("phoneNumber")}
                error={bookingErrors.phone}
                register={registerBooking("phone")}
                placeholder={t("checkoutBooking.phoneLabelPh")}
            />
            <FormField
                label={t("notes")}
                type="textarea"
                register={registerBooking("notes")}
                placeholder={t("checkoutBooking.noteLabelPh")}
            />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <FormField
                    label={t("promotionCode")}
                    placeholder={t("checkoutBooking.voucherLabelPh")}
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                    type="button"
                    className="primary-btn2"
                    onClick={() => applyVoucher()}
                >
                    {t("applyBtn")}
                </button>
                {discount > 0 && (
                    <p className="text-success m-0 pb-0">
                        {t("applySuccess")}! {t("discount")}:{" "}
                        {convertToVND(discount)}
                    </p>
                )}
                {voucherError && (
                    <span className="text-danger m-0">{voucherError}</span>
                )}
            </div>

            <button type="submit" className="primary-btn1 two">
                {hotel.paymentPolicy === "ONLINE" ||
                hotel.paymentPolicy === "ONLINE_CHECKOUT"
                    ? `${t("checkoutBooking.nextBtn")}`
                    : `${t("completeBtn")}`}
            </button>
        </form>
    );

    const renderPaymentForm = () => (
        <form onSubmit={handleSubmitPayment(handleFormSubmit.payment)}>
            <RadioOption
                label={t("checkoutBooking.ePaymentLabel")}
                value={MAIN_PAYMENT_METHODS.ELECTRONIC}
                name="mainPaymentMethod"
                register={registerPayment}
                error={paymentErrors.mainPaymentMethod}
            />

            {mainPaymentMethod === MAIN_PAYMENT_METHODS.ELECTRONIC && (
                <div className="ms-4 d-flex">
                    <RadioOptionSub
                        label="VNPay"
                        value={ELECTRONIC_PAYMENT_OPTIONS.VNPAY}
                        name="electronicPaymentOption"
                        register={registerPayment}
                    />
                    <RadioOptionSub
                        label="MoMo"
                        value={ELECTRONIC_PAYMENT_OPTIONS.MOMO}
                        name="electronicPaymentOption"
                        register={registerPayment}
                    />
                    {paymentErrors.electronicPaymentOption && (
                        <span className="text-danger">
                            {paymentErrors.electronicPaymentOption.message}
                        </span>
                    )}
                </div>
            )}

            <RadioOption
                label={t("checkoutBooking.creditCardLabel")}
                value={MAIN_PAYMENT_METHODS.CREDIT}
                name="mainPaymentMethod"
                register={registerPayment}
                error={paymentErrors.mainPaymentMethod}
            />
            {(hotel.paymentPolicy === "CHECKOUT" ||
                hotel.paymentPolicy === "ONLINE_CHECKOUT") && (
                <RadioOption
                    label={t("checkoutBooking.payAtLocationLabel")}
                    value={MAIN_PAYMENT_METHODS.ON_CHECKOUT}
                    name="mainPaymentMethod"
                    register={registerPayment}
                    error={paymentErrors.mainPaymentMethod}
                />
            )}
            <button type="submit" className="primary-btn1 two mt-5">
                {t("completeBtn")}
            </button>
        </form>
    );

    return (
        <>
            {hotel.paymentPolicy !== "ONLINE" && <NoCardRequiredMessage />}

            <div className="booking-form-wrap mb-30">
                <div className="nav nav-pills mb-40" role="tablist">
                    <TabButton
                        isActive={activeTab === TABS.CONTACT}
                        id={TABS.CONTACT}
                        label={t("checkoutBooking.infoFormLabel")}
                        onClick={() => handleTabChange(TABS.CONTACT)}
                    />

                    {(hotel.paymentPolicy === "ONLINE" ||
                        hotel.paymentPolicy === "ONLINE_CHECKOUT") && (
                        <TabButton
                            isActive={activeTab === TABS.PAYMENT}
                            id={TABS.PAYMENT}
                            label={t("checkoutBooking.paymentLabel")}
                            onClick={() => handleTabChange(TABS.PAYMENT)}
                        />
                    )}
                </div>

                <div className="tab-content" id="v-pills-tabContent2">
                    <div
                        className={`tab-pane fade ${
                            activeTab === TABS.CONTACT ? "show active" : ""
                        }`}
                        id={TABS.CONTACT}
                        role="tabpanel"
                        aria-labelledby={`${TABS.CONTACT}-tab`}
                    >
                        <div className="sidebar-booking-form">
                            {renderContactForm()}
                        </div>
                    </div>

                    {(hotel.paymentPolicy === "ONLINE" ||
                        hotel.paymentPolicy === "ONLINE_CHECKOUT") && (
                        <div
                            className={`tab-pane fade ${
                                activeTab === TABS.PAYMENT ? "show active" : ""
                            }`}
                            id={TABS.PAYMENT}
                            role="tabpanel"
                            aria-labelledby={`${TABS.PAYMENT}-tab`}
                        >
                            <div className="sidebar-booking-form">
                                {renderPaymentForm()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default BookingForm;
