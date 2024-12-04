import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import ImageUploader from "../../../../components/UploadImage/ImageUploader/ImageUploader"; // Import component ImageUploader
import * as PromotionService from "../../../../services/PromotionService";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { promotionCreateSchema } from "../../../../schemas/validationSchemas";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PromotionCreatePage() {

    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(promotionCreateSchema),
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
    const navigate = useNavigate();

    const [promotionTypes, setPromotionTypes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        PromotionService.getAllPromotionTypes()
            .then((data) => setPromotionTypes(data))
            .catch((error) => toast.error(error.message));
    }, [user.accessToken]);

    const mutationCreatePromotion = useMutation(
        ({ data, accessToken }) => {
            return PromotionService.createPromotion(data, accessToken);
        },
        {
            onSuccess: () => {
                toast.success(t("promotionCreate.successMessage"));
                reset();
                navigate("/admin/vouchers");
            },
            onError: (error) => {
                toast.error(error.message || t("promotionCreate.errorMessage"));
            },
        }
    );

    const handleImageSelect = (file) => {
        setSelectedFile(file);
    };

    const handleFormSubmit = (data) => {
        const formData = {
            ...data,
            startDate: data.startDate || "Không giới hạn",
            endDate: data.endDate || "Không giới hạn",
            quantity: data.quantity || "Không giới hạn",
            image: selectedFile,
        };
        console.log(formData);
        mutationCreatePromotion.mutate({
            data: formData,
            accessToken: user.accessToken,
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="main-content-title-profile mb-20">
                <h3>{t("promotionCreate.title")}</h3>
            </div>
            <div className="dashboard-profile-wrapper two">
                <div className="dashboard-profile-tab-content">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.nameLabel")}</label>
                                    <input
                                        {...register("name")}
                                        placeholder={t("promotionCreate.namePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.name?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.codeLabel")}</label>
                                    <input
                                        {...register("code")}
                                        placeholder={t("promotionCreate.codePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.code?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.startDateLabel")}</label>
                                    <input
                                        type="datetime-local"
                                        {...register("startDate")}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.endDateLabel")}</label>
                                    <input
                                        type="datetime-local"
                                        {...register("endDate")}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.quantityLabel")}</label>
                                    <input
                                        type="number"
                                        {...register("quantity")}
                                        placeholder={t("promotionCreate.quantityPlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.quantity?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.typeLabel")}</label>
                                    <Controller
                                        name="discountType"
                                        control={control}
                                        render={({ field }) => (
                                            <NiceSelect
                                                {...field}
                                                options={promotionTypes.map(
                                                    (type) => ({
                                                        value: type.value,
                                                        label: type.label,
                                                    })
                                                )}
                                                value={promotionTypes.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value
                                                )} // Hiển thị giá trị được chọn
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.value
                                                    )
                                                } // Truyền chỉ value
                                            />
                                        )}
                                    />
                                    <p className="text-danger">
                                        {errors.discountType?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.valueLabel")}</label>
                                    <input
                                        type="number"
                                        {...register("value")}
                                        placeholder={t("promotionCreate.valuePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.value?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.maxDiscountValueLabel")}</label>
                                    <input
                                        type="number"
                                        {...register("maxDiscountValue")}
                                        placeholder={t("promotionCreate.maxDiscountValuePlaceholder")}
                                    />
                                    <p className="text-danger">
                                        {errors.maxDiscountValue?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 mb-30">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.applyToLabel")}</label>
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
                                                )} // Hiển thị giá trị đã chọn
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.value
                                                    )
                                                } // Truyền chỉ value
                                            />
                                        )}
                                    />
                                    <p className="text-danger">
                                        {errors.applyTo?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-inner mb-30">
                                    <label>
                                        {t("promotionCreate.descriptionLabel")}
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        placeholder={t(
                                            "promotionCreate.descriptionPlaceholder"
                                        )}
                                    ></textarea>
                                    <p className="text-danger">
                                        {errors.description?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-inner mb-30">
                                    <label>{t("promotionCreate.imageLabel")}</label>
                                    <ImageUploader
                                        onImageSelect={handleImageSelect}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <button type="submit" className="primary-btn3">
                                    {t("promotionCreate.addButton")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PromotionCreatePage;
