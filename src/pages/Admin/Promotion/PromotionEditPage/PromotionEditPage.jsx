import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import * as PromotionService from "../../../../services/PromotionService";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import ImageUploader from "../../../../components/UploadImage/ImageUploader/ImageUploader"; // Import component ImageUploader
import Loading from "../../../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { promotionUpdateSchema } from "../../../../schemas/validationSchemas";
import { useTranslation } from "react-i18next";

function PromotionEditPage() {

    const { t } = useTranslation();
    const { voucherId } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(promotionUpdateSchema),
        defaultValues: {
            name: "",
            code: "",
            startDate: "",
            endDate: "",
            quantity: "",
            value: "",
            maxDiscountValue: "",
            discountType: "",
            applyTo: "",
            description: "",
        },
    });

    const [selectedFile, setSelectedFile] = useState(null); // State cho ảnh

    const mutationFetchPromotion = useMutation(
        (promotionId) => PromotionService.getPromotionById(promotionId),
        {
            onSuccess: (data) => {
                reset({
                    ...data,
                    discountType: data.discountType.toLowerCase(), // Chuyển thành lowercase để khớp với options
                    applyTo: data.applyTo.toLowerCase(),
                });
                setSelectedFile(data.image || null); // Nếu có ảnh, set lại
            },
            onError: () => {
                toast.error(t("promotionEdit.errorMessage"));
            },
        }
    );

    // Fetch dữ liệu khi component được mount
    useEffect(() => {
        console.log("fetching");
        if (voucherId) {
            setLoading(true);
            mutationFetchPromotion.mutate(voucherId); // Gọi API để lấy thông tin

            setLoading(false);
        }
    }, []);

    // Mutation cập nhật ưu đãi
    const mutationUpdatePromotion = useMutation(
        ({ voucherId, data, accessToken }) => {
            return PromotionService.updatePromotion(
                voucherId,
                data,
                accessToken
            );
        },
        {
            onSuccess: () => {
                toast.success(t("promotionEdit.successMessage"));
                navigate("/admin/vouchers");
            },
            onError: () => {
                toast.error(t("promotionEdit.errorMessage"));
            },
        }
    );

    // Xử lý chọn ảnh
    const handleImageSelect = (file) => {
        setSelectedFile(file);
    };

    // Submit form
    const onSubmit = (data) => {
        const formData = {
            ...data,
            startDate: data.startDate || "Không giới hạn",
            endDate: data.endDate || "Không giới hạn",
            quantity: data.quantity || "Không giới hạn",
            image: selectedFile, // Thêm ảnh
            discountType: data.discountType.toUpperCase(),
        };

        mutationUpdatePromotion.mutate({
            voucherId,
            data: formData,
            accessToken: user.accessToken,
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <ToastContainer />
            <div className="main-content-title-profile mb-50">
                <h3>{t("promotionEdit.title")}</h3>
            </div>
            <div className="dashboard-profile-wrapper two">
                <div className="dashboard-profile-tab-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            {/* Tên ưu đãi */}
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.nameLabel")}</label>
                                    <input
                                        {...register("name")}
                                        placeholder={t("promotionEdit.namePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.name?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Mã ưu đãi */}
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.codeLabel")}</label>
                                    <input
                                        {...register("code")}
                                        placeholder={t("promotionEdit.codePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.code?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Thời gian bắt đầu */}
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.startDateLabel")}</label>
                                    <input
                                        type="datetime-local"
                                        {...register("startDate")}
                                    />
                                </div>
                            </div>

                            {/* Thời gian kết thúc */}
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.endDateLabel")}</label>
                                    <input
                                        type="datetime-local"
                                        {...register("endDate")}
                                    />
                                </div>
                            </div>

                            {/* Số lượng */}
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.quantityLabel")}</label>
                                    <input
                                        type="number"
                                        {...register("quantity")}
                                        placeholder={t("promotionEdit.quantityPlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.quantity?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.valueLabel")}</label>
                                    <input
                                        type="number"
                                        {...register("value")}
                                        placeholder={t("promotionEdit.valuePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.value?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.maxDiscountValueLabel")}</label>
                                    <input
                                        type="number"
                                        {...register("maxDiscountValue")}
                                        placeholder={t("promotionEdit.maxDiscountValuePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.maxDiscountValue?.message}
                                    </p>
                                </div>
                            </div>
                            {/* Loại ưu đãi */}
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.typeLabel")}</label>
                                    <Controller
                                        name="discountType"
                                        control={control}
                                        render={({ field }) => (
                                            <NiceSelect
                                                {...field}
                                                options={[
                                                    {
                                                        value: "percent",
                                                        label: "Phần trăm",
                                                    },
                                                    {
                                                        value: "fixed",
                                                        label: "Giá cố định",
                                                    },
                                                ]}
                                                value={[
                                                    {
                                                        value: "percent",
                                                        label: "Phần trăm",
                                                    },
                                                    {
                                                        value: "fixed",
                                                        label: "Giá cố định",
                                                    },
                                                ].find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value
                                                )}
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.value
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                    <p className="text-danger">
                                        {errors.discountType?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Áp dụng */}
                            <div className="col-md-6 mb-30">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionEdit.applyToLabel")}</label>
                                    <Controller
                                        name="applyTo"
                                        control={control}
                                        render={({ field }) => (
                                            <NiceSelect
                                                {...field}
                                                options={[
                                                    {
                                                        value: "all",
                                                        label: "Tất cả",
                                                    },
                                                    {
                                                        value: "customer",
                                                        label: "Khách hàng",
                                                    },
                                                    {
                                                        value: "hotel",
                                                        label: "Khách sạn",
                                                    },
                                                    {
                                                        value: "homestay",
                                                        label: "Homestay",
                                                    },
                                                ]}
                                                value={[
                                                    {
                                                        value: "all",
                                                        label: "Tất cả",
                                                    },
                                                    {
                                                        value: "customer",
                                                        label: "Khách hàng",
                                                    },
                                                    {
                                                        value: "hotel",
                                                        label: "Khách sạn",
                                                    },
                                                    {
                                                        value: "homestay",
                                                        label: "Homestay",
                                                    },
                                                ].find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value
                                                )}
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.value
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                    <p className="text-danger">
                                        {errors.applyTo?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Sửa ảnh */}
                            <div className="col-md-12 mb-30">
                                <div className="form-inner">
                                    <label>Ảnh ưu đãi</label>
                                    <ImageUploader
                                        onImageSelect={handleImageSelect}
                                    />
                                </div>
                            </div>

                            {/* Mô tả */}
                            <div className="col-md-12 mb-30">
                                <div className="form-inner">
                                    <label>Mô tả</label>
                                    <textarea
                                        {...register("description")}
                                        placeholder="Mô tả thêm về ưu đãi..."
                                    ></textarea>
                                    <p className="text-danger">
                                        {errors.description?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Nút submit */}
                            <div className="col-md-12">
                                <button type="submit" className="primary-btn3">
                                    {t("promotionEdit.saveButton")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PromotionEditPage;
