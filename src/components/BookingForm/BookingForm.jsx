import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    bookingFormSchema,
    paymentFormSchema,
} from "../../schemas/validationSchemas";
import { toast } from "react-toastify";
import FormField from "../Form/FormField/FormField";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import * as BookingService from "../../services/BookingService";

const TABS = {
    CONTACT: "v-pills-contact",
    PAYMENT: "v-pills-booking",
};
const MAIN_PAYMENT_METHODS = {
    ELECTRONIC: "electronic",
    CREDIT: "credit",
};
const ELECTRONIC_PAYMENT_OPTIONS = {
    MOMO: "MOMO",
    VNPAY: "VNPAY",
};

// Component for displaying the No Card Required message
const NoCardRequiredMessage = () => (
    <div className="max-w-2xl p-4 rounded-lg border mb-2">
        <div className="flex items-start gap-3">
            <div className="row m-0">
                <div className="d-flex align-items-center">
                    <i className="bi bi-credit-card"></i>
                    <span className="px-2">
                        <strong>Không yêu cầu thẻ tín dụng</strong>
                    </span>
                </div>
                <p>
                    Tin vui! Bạn có thể đặt phòng ngay mà không cần cung cấp chi
                    tiết thanh toán, và có thể thanh toán tại chỗ nghỉ trong
                    thời gian lưu trú.
                </p>
            </div>
        </div>
    </div>
);

// Component for each radio option
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

// Component for each sub radio option (like VNPay and MoMo)
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

// Tab button component
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

function BookingForm({ hotel, room }) {
    const [activeTab, setActiveTab] = useState(TABS.CONTACT);
    const [isBookingValid, setIsBookingValid] = useState(false);
    const bookingDate = useSelector((state) => state.bookingDate);
    const user = useSelector((state) => state.user);
    const [formData, setFormData] = useState({});
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

    // Watch the mainPaymentMethod value to conditionally render electronic payment options
    const mainPaymentMethod = watchPayment("mainPaymentMethod");

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            checkinDate: bookingDate.checkInDate, // Thêm bookingDate từ Redux
            checkoutDate: bookingDate.checkOutDate,
            userId: user.id ? user.id : null, // Chỉ thêm user nếu user tồn tại
            roomId: room.id, // Thêm room.id
        }));
    }, [bookingDate, user, room.id]);

    const mutationBookingSubmit = useMutation(
        ({ data, accessToken }) =>
            BookingService.createBooking(data, accessToken),
        {
            onSuccess: (data) => {
                toast.success("Đặt phòng thành công!");
                if (data.paymentUrl) {
                    window.location.href = data.paymentUrl;
                }
            },
            onError: (error) => {
                // Hiển thị message nếu có hoặc là nội dung lỗi chung
                toast.error(error.message || "Đã xảy ra lỗi.");
            },
        }
    );

    const handleFormSubmit = {
        booking: (data) => {
            setFormData((prevData) => ({
                ...prevData,
                bookingName: data.fullName,
                bookingPhone: data.phone,
                bookingEmail: data.email,
                bookingNotes: data.notes,
            }));
            setIsBookingValid(true); // Mark booking as valid
            setActiveTab(TABS.PAYMENT); // Move to payment tab
        },
        payment: async (data) => {
            const bookingData = await triggerBookingForm();
            if (!bookingData) {
                toast.error(
                    "Vui lòng hoàn thành thông tin đặt phòng trước khi thanh toán!"
                );
                setActiveTab(TABS.CONTACT);
                return;
            }
            // Tạo biến tạm để chứa formData mới nhất
            const tempFormData = {
                ...formData,
                paymentType: data.electronicPaymentOption, // Cập nhật dữ liệu payment
            };
            mutationBookingSubmit.mutate({
                data: tempFormData,
                accessToken: user.accessToken,
            });
        },
    };

    const handleTabChange = (tabId) => {
        if (tabId === TABS.PAYMENT && !isBookingValid) {
            toast.error("Vui lòng hoàn thành thông tin đặt phòng trước!");
            return;
        }
        setActiveTab(tabId);
    };

    const renderContactForm = () => (
        <form onSubmit={handleSubmitBooking(handleFormSubmit.booking)}>
            <FormField
                label="Tên đầy đủ"
                error={bookingErrors.fullName}
                register={registerBooking("fullName")}
                placeholder="Nhập tên đầy đủ"
            />
            <FormField
                label="Địa chỉ Email"
                type="email"
                error={bookingErrors.email}
                register={registerBooking("email")}
                placeholder="Nhập địa chỉ Email"
            />
            <FormField
                label="Số điện thoại"
                error={bookingErrors.phone}
                register={registerBooking("phone")}
                placeholder="Nhập số điện thoại"
            />
            <FormField
                label="Ghi chú"
                type="textarea"
                register={registerBooking("notes")}
                placeholder="Thêm ghi chú"
            />
            <button type="submit" className="primary-btn1 two">
                Kế tiếp
            </button>
        </form>
    );

    const renderPaymentForm = () => (
        <form onSubmit={handleSubmitPayment(handleFormSubmit.payment)}>
            <RadioOption
                label="Thanh toán điện tử"
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
                label="Thẻ tín dụng/Ghi nợ"
                value={MAIN_PAYMENT_METHODS.CREDIT}
                name="mainPaymentMethod"
                register={registerPayment}
                error={paymentErrors.mainPaymentMethod}
            />

            <button type="submit" className="primary-btn1 two mt-5">
                Hoàn tất ngay
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
                        label="Biểu mẫu thông tin"
                        onClick={() => handleTabChange(TABS.CONTACT)}
                    />

                    {/* Only show the Payment tab if payment policy is ONLINE */}
                    {hotel.paymentPolicy === "ONLINE" && (
                        <TabButton
                            isActive={activeTab === TABS.PAYMENT}
                            id={TABS.PAYMENT}
                            label="Thanh toán"
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

                    {/* Only show the Payment form if payment policy is ONLINE */}
                    {hotel.paymentPolicy === "ONLINE" && (
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
