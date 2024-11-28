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
import { promotionCreatechema } from "../../../../schemas/validationSchemas";
import { useNavigate } from "react-router-dom";

function PromotionCreatePage() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(promotionCreatechema),
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
                toast.success("Tạo mới ưu đãi thành công!");
                reset();
                navigate("/admin/vouchers");
            },
            onError: (error) => {
                toast.error(error.message);
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
                <h3>Thêm ưu đãi</h3>
            </div>
            <div className="dashboard-profile-wrapper two">
                <div className="dashboard-profile-tab-content">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Tên ưu đãi</label>
                                    <input
                                        {...register("name")}
                                        placeholder="Tên ưu đãi..."
                                    />
                                    <p className="text-danger">
                                        {errors.name?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Mã ưu đãi</label>
                                    <input
                                        {...register("code")}
                                        placeholder="Mã ưu đãi..."
                                    />
                                    <p className="text-danger">
                                        {errors.code?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Thời gian bắt đầu</label>
                                    <input
                                        type="datetime-local"
                                        {...register("startDate")}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Thời gian kết thúc</label>
                                    <input
                                        type="datetime-local"
                                        {...register("endDate")}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Số lượng</label>
                                    <input
                                        type="number"
                                        {...register("quantity")}
                                        placeholder="Số lượng mã sử dụng..."
                                    />
                                    <p className="text-danger">
                                        {errors.quantity?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Loại ưu đãi</label>
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
                                    <label>Giá trị</label>
                                    <input
                                        type="number"
                                        {...register("value")}
                                        placeholder="Giá trị giảm giá..."
                                    />
                                    <p className="text-danger">
                                        {errors.value?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Giá trị giảm tối đa</label>
                                    <input
                                        type="number"
                                        {...register("maxDiscountValue")}
                                        placeholder="Giá trị giảm giá tối đa..."
                                    />
                                    <p className="text-danger">
                                        {errors.maxDiscountValue?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 mb-30">
                                <div className="form-inner mb-30">
                                    <label>Áp dụng</label>
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

                            <div className="col-md-12">
                                <div className="form-inner mb-30">
                                    <label>Ảnh ưu đãi</label>
                                    <ImageUploader
                                        onImageSelect={handleImageSelect}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <button type="submit" className="primary-btn3">
                                    Thêm ngay
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
