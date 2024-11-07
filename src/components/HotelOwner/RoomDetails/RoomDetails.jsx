import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";

import * as RoomService from "../../../services/RoomService";
import * as AmenityService from "../../../services/AmenityService";
import NiceSelect from "../../../components/NiceSelect/NiceSelect";
import MultiImageUploader from "../../../components/UploadImage/MultiImageUploader/MultiImageUploader";
import { createRoomSchema } from "../../../schemas/validationSchemas";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RoomDetails({ roomDetails, setRoomDetails, onNext }) {
    const [roomTypes, setRoomTypes] = useState([]);
    const [bedTypes, setBedTypes] = useState([]);
    const [roomFacilities, setRoomFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedRoomImages, setSelectedRoomImages] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createRoomSchema),
    });

    const handleCheckboxChange = (facility) => {
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facility)
                ? prevSelected.filter((item) => item !== facility)
                : [...prevSelected, facility]
        );
    };

    const handleImagesSelect = (images) => {
        setSelectedRoomImages(images);
    };

    const mutationFacilities = useMutation(
        () => AmenityService.getAllAmenitiesForRoom(),
        {
            onSuccess: (data) => setRoomFacilities(data),
            onError: (error) => toast.error(error.message),
        }
    );

    const mutationAmenityType = useMutation(() => RoomService.getRoomTypes(), {
        onSuccess: (data) => setRoomTypes(data),
        onError: (error) => toast.error(error.message),
    });

    const mutationBedType = useMutation(() => RoomService.getBedTypes(), {
        onSuccess: (data) => setBedTypes(data),
        onError: (error) => toast.error(error.message),
    });

    useEffect(() => {
        mutationAmenityType.mutate();
        mutationBedType.mutate();
        mutationFacilities.mutate();
    }, []);

    const onSubmit = (data) => {
        // Cập nhật state `roomDetails` với dữ liệu từ form
        setRoomDetails({
            ...data,
            facilities: selectedFacilities,
            images: selectedRoomImages,
        });
        onNext();
    };

    return (
        <>
            <div className="dashboard-profile-tab-content">
                <div className="account-details-tab-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="form-inner mb-30 col-6">
                                <label>Loại phòng</label>
                                <Controller
                                    name="roomType"
                                    control={control}
                                    render={({ field }) => (
                                        <NiceSelect
                                            options={roomTypes}
                                            value={roomTypes.find(
                                                (option) =>
                                                    option.value === field.value
                                            )}
                                            onChange={(selectedOption) => {
                                                field.onChange(
                                                    selectedOption.value
                                                );
                                            }}
                                        />
                                    )}
                                />
                                {errors.roomType && (
                                    <p className="text-danger">
                                        {errors.roomType.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-inner mb-30 col-6">
                                <label>Loại giường</label>
                                <Controller
                                    name="bedType"
                                    control={control}
                                    render={({ field }) => (
                                        <NiceSelect
                                            options={bedTypes}
                                            value={bedTypes.find(
                                                (option) =>
                                                    option.value === field.value
                                            )}
                                            onChange={(selectedOption) =>
                                                field.onChange(
                                                    selectedOption.value
                                                )
                                            }
                                        />
                                    )}
                                />
                                {errors.bedType && (
                                    <p className="text-danger">
                                        {errors.bedType.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-inner mb-30 col-6">
                                <label>Giá gốc</label>
                                <input
                                    type="text"
                                    placeholder="Nhập giá..."
                                    {...register("originalPrice")}
                                />
                                {errors.originalPrice && (
                                    <p className="text-danger">
                                        {errors.originalPrice.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-inner mb-30 col-6">
                                <label>Giá giảm</label>
                                <input
                                    type="text"
                                    placeholder="Nhập giá giảm..."
                                    {...register("discountedPrice")}
                                />
                                {errors.discountedPrice && (
                                    <p className="text-danger">
                                        {errors.discountedPrice.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-inner mb-30 col-6">
                                <label>Số người (Tối đa)</label>
                                <input
                                    type="number"
                                    placeholder="Nhập số lượng người..."
                                    {...register("maxOccupancy")}
                                />
                                {errors.maxOccupancy && (
                                    <p className="text-danger">
                                        {errors.maxOccupancy.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-inner mb-30 col-6">
                                <label>Diện tích</label>
                                <input
                                    type="number"
                                    placeholder="Nhập diện tích phòng..."
                                    {...register("roomArea")}
                                />
                                {errors.roomArea && (
                                    <p className="text-danger">
                                        {errors.roomArea.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-30">
                                <strong>Tiện ích</strong>
                                <div className="row border rounded p-2 bg-white ">
                                    {roomFacilities.map((facility) => (
                                        <div
                                            key={facility.id}
                                            className="form-check col-2 d-flex justify-content-center align-items-center"
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={facility.id}
                                                name="facilities"
                                                value={facility.id}
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
                                                htmlFor={facility.id}
                                                style={{
                                                    marginLeft: "8px",
                                                }}
                                            >
                                                {facility.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <MultiImageUploader
                            onImagesSelect={handleImagesSelect}
                        />

                        <div className="form-inner">
                            <button type="submit" className="primary-btn3">
                                Tiếp tục
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RoomDetails;
