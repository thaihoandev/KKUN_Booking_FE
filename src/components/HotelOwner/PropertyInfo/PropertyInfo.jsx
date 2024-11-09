import React, { useEffect, useState } from "react";
import NiceSelect from "../../NiceSelect/NiceSelect";
import MultiImageUploader from "../../UploadImage/MultiImageUploader/MultiImageUploader";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as AmenityService from "../../../services/AmenityService";
import * as HotelService from "../../../services/HotelService";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { hotelDetailsSchema } from "../../../schemas/validationSchemas";

function PropertyInfo({ hotelDetails, setHotelDetails, onNext }) {
    const [selectedHotelImages, setHotelSelectedImages] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [hotelFacilities, setHotelFacilities] = useState([]);
    const [hotelCategories, setHotelCategories] = useState([]);
    const [hotelPolicies, setHotelPolicies] = useState([]);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(hotelDetailsSchema),
        defaultValues: {
            name: "",
            category: "",
            description: "",
            paymentPolicy: "",
        },
    });

    // Lấy dữ liệu amenities và categories
    const mutationFacilities = useMutation(
        () => AmenityService.getAllAmenities(),
        {
            onSuccess: (data) => setHotelFacilities(data),
            onError: (error) => toast.error(error.message),
        }
    );
    const mutationHotelCategories = useMutation(
        () => HotelService.getHotelCategories(),
        {
            onSuccess: (data) => setHotelCategories(data),
            onError: (error) => toast.error(error.message),
        }
    );
    const mutationHotelPolicies = useMutation(
        () => HotelService.getHotelPolicies(),
        {
            onSuccess: (data) => setHotelPolicies(data),
            onError: (error) => toast.error(error.message),
        }
    );
    useEffect(() => {
        mutationHotelPolicies.mutate();
        mutationHotelCategories.mutate();
        mutationFacilities.mutate();
    }, []);

    // Cập nhật `hotelDetails` mỗi khi form thay đổi
    useEffect(() => {
        const formData = watch();
        setHotelDetails({
            ...formData,
            facilities: selectedFacilities,
            images: selectedHotelImages,
        });
    }, [watch, selectedFacilities, selectedHotelImages, setHotelDetails]);

    const handleImagesSelect = (images) => {
        setHotelSelectedImages(images);
    };

    const handleCheckboxChange = (facility) => {
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facility)
                ? prevSelected.filter((item) => item !== facility)
                : [...prevSelected, facility]
        );
    };

    const groupFacilitiesByType = () => {
        return hotelFacilities.reduce((groups, facility) => {
            const { amenityTypeDisplayName } = facility;
            if (!groups[amenityTypeDisplayName]) {
                groups[amenityTypeDisplayName] = [];
            }
            groups[amenityTypeDisplayName].push(facility);
            return groups;
        }, {});
    };

    const groupedFacilities = groupFacilitiesByType(hotelFacilities);

    // Hàm xử lý submit form và lưu thông tin vào `hotelDetails`
    const onSubmit = (data) => {
        setHotelDetails({
            ...data,
            facilities: selectedFacilities,
            images: selectedHotelImages,
        });

        onNext();
    };

    return (
        <div className="dashboard-profile-tab-content">
            <div className="account-details-tab-content">
                <div className="account-tab-content-title">
                    <h4>Thông tin cơ bản về khách sạn</h4>
                    <p>Cung cấp các thông tin cơ bản về khách sạn của bạn.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="general-information">
                        <h5>Thông tin chung</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Tên khách sạn*</label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Nhập tên khách sạn..."
                                            />
                                        )}
                                    />
                                    <p>{errors.name?.message}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Loại khách sạn*</label>

                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <NiceSelect
                                                options={hotelCategories}
                                                value={hotelCategories.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value
                                                )}
                                                onChange={(selectedOption) =>
                                                    field.onChange(
                                                        selectedOption.value
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                    <p>{errors.category?.message}</p>
                                </div>
                            </div>

                            <div className="additional-information">
                                <h6>Mô tả</h6>
                                <div className="form-inner mb-30">
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                className="form-control"
                                                placeholder="Mô tả các điểm nổi bật gần khách sạn như ..."
                                                rows="4"
                                            ></textarea>
                                        )}
                                    />
                                    {errors.description && (
                                        <p className="error-message">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="additional-information">
                                <h6>Hình ảnh khách sạn</h6>
                                <MultiImageUploader
                                    onImagesSelect={handleImagesSelect}
                                />
                            </div>

                            <div className="additional-information">
                                <strong>Tiện ích</strong>
                                <div className="row border rounded p-3 bg-white">
                                    {Object.keys(groupedFacilities).map(
                                        (type) => (
                                            <div
                                                key={type}
                                                className="col-3 mb-3"
                                            >
                                                <h5>{type}</h5>
                                                <div className="row">
                                                    {groupedFacilities[
                                                        type
                                                    ].map((facility) => (
                                                        <div
                                                            key={facility.id}
                                                            className="form-check col-12 d-flex justify-content-start align-items-center"
                                                        >
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={facility.id}
                                                                name="facilities"
                                                                value={
                                                                    facility.id
                                                                }
                                                                checked={selectedFacilities.includes(
                                                                    facility.id
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        facility.id
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    facility.id
                                                                }
                                                                style={{
                                                                    marginLeft:
                                                                        "8px",
                                                                }}
                                                            >
                                                                {facility.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="additional-information mt-3">
                                <h6>Chính sách</h6>
                                <div className="form-inner mb-30">
                                    <label>Phương thức thanh toán*</label>

                                    <Controller
                                        name="paymentPolicy"
                                        control={control}
                                        render={({ field }) => (
                                            <NiceSelect
                                                options={hotelPolicies}
                                                value={hotelPolicies.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value
                                                )}
                                                onChange={(selectedOption) =>
                                                    field.onChange(
                                                        selectedOption.value
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                    <p>{errors.paymentPolicy?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="primary-btn3 mt-4">
                        Tiếp theo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PropertyInfo;
