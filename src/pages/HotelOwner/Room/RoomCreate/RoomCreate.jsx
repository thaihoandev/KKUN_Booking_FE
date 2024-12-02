import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import * as RoomService from "../../../../services/RoomService";
import * as AmenityService from "../../../../services/AmenityService";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import MultiImageUploader from "../../../../components/UploadImage/MultiImageUploader/MultiImageUploader";
import { createRoomSchema } from "../../../../schemas/validationSchemas";
import { useSelect } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RoomCreate() {

    const { t } = useTranslation();
    const [roomTypes, setRoomTypes] = useState([]);
    const [bedTypes, setBedTypes] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createRoomSchema), // Kết nối schema với react-hook-form
    });

    const handleCheckboxChange = (facility) => {
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facility)
                ? prevSelected.filter((item) => item !== facility)
                : [...prevSelected, facility]
        );
    };

    const handleImagesSelect = (images) => {
        setSelectedImages(images); // Cập nhật danh sách ảnh từ `MultiImageUploader`
    };
    const mutationFacilities = useMutation(
        () => AmenityService.getAllAmenitiesForRoom(),
        {
            onSuccess: (data) => setFacilities(data),
            onError: (error) => toast.error(t("RoomCreate.messages.error")),
        }
    );
    const mutationAmenityType = useMutation(() => RoomService.getRoomTypes(), {
        onSuccess: (data) => setRoomTypes(data),
        onError: (error) => toast.error(t("RoomCreate.messages.error")),
    });
    const mutationBedType = useMutation(() => RoomService.getBedTypes(), {
        onSuccess: (data) => setBedTypes(data),
        onError: (error) => toast.error(t("RoomCreate.messages.error")),
    });

    const mutationCreateRoom = useMutation(
        ({ data, accessToken }) => RoomService.createRoom(data, accessToken),
        {
            onSuccess: (data) => {
                toast.success(t("RoomCreate.messages.success"));
                navigate("/hotelowner/my-rooms");
            },
            onError: (error) => toast.error(t("RoomCreate.messages.error")),
        }
    );

    useEffect(() => {
        mutationAmenityType.mutate();
        mutationBedType.mutate();
        mutationFacilities.mutate();
    }, []);
    const onSubmit = (data) => {
        const formData = new FormData();

        // Thêm các trường vào formData
        formData.append("type", data.roomType);
        formData.append("bedType", data.bedType);
        formData.append("basePrice", data.originalPrice);
        formData.append("discountedPrice", data.discountedPrice);
        formData.append("capacity", data.maxOccupancy);
        formData.append("area", data.roomArea);
        selectedFacilities.forEach((facilityId, index) => {
            formData.append(`amenities[${index}].id`, facilityId);
        });
        selectedImages.forEach((image) => {
            formData.append("roomImageList", image); // Thêm tất cả hình ảnh với cùng key `roomImageList`
        });
        mutationCreateRoom.mutate({
            data: formData,
            accessToken: user.accessToken,
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile mb-50">
                        <h3>{t("RoomCreate.title")}</h3>
                    </div>
                    <div className="dashboard-profile-wrapper two">
                        <div className="dashboard-profile-tab-content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="form-inner mb-30 col-6">
                                        <label>{t("RoomCreate.labels.roomType")}</label>
                                        <Controller
                                            name="roomType"
                                            control={control}
                                            render={({ field }) => (
                                                <NiceSelect
                                                    options={roomTypes}
                                                    value={roomTypes.find(
                                                        (option) =>
                                                            option.value ===
                                                            field.value
                                                    )} // Hiển thị đối tượng tương ứng với giá trị `value`
                                                    onChange={(
                                                        selectedOption
                                                    ) => {
                                                        field.onChange(
                                                            selectedOption.value
                                                        ); // Truyền giá trị `value` vào hook form
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
                                    {/* Loại giường */}
                                    <div className="form-inner mb-30 col-6">
                                    <label>{t("RoomCreate.labels.bedType")}</label>
                                    <Controller
                                            name="bedType"
                                            control={control}
                                            render={({ field }) => (
                                                <NiceSelect
                                                    options={bedTypes}
                                                    value={bedTypes.find(
                                                        (option) =>
                                                            option.value ===
                                                            field.value
                                                    )} // Hiển thị đối tượng tương ứng với giá trị `value`
                                                    onChange={(
                                                        selectedOption
                                                    ) =>
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
                                        {/* Giá gốc */}
                                    <div className="form-inner mb-30 col-6">
                                    <label>{t("RoomCreate.labels.originalPrice")}</label>
                                    <input
                                            type="text"
                                            placeholder={t("RoomCreate.placeholders.enterPrice")}
                                            {...register("originalPrice")}
                                        />
                                        {errors.originalPrice && (
                                            <p className="text-danger">
                                                {errors.originalPrice.message}
                                            </p>
                                        )}
                                    </div>
                                    {/* Giá giảm */}
                                    <div className="form-inner mb-30 col-6">
                                    <label>{t("RoomCreate.labels.discountedPrice")}</label>
                                    <input
                                            type="text"
                                            placeholder={t("RoomCreate.placeholders.enterDiscountedPrice")}
                                            {...register("discountedPrice")}
                                        />
                                        {errors.discountedPrice && (
                                            <p className="text-danger">
                                                {errors.discountedPrice.message}
                                            </p>
                                        )}
                                    </div>
                                        {/* Số người tối đa */}
                                    <div className="form-inner mb-30 col-6">
                                    <label>{t("RoomCreate.labels.maxOccupancy")}</label>
                                        <input
                                            type="number"
                                            placeholder={t("RoomCreate.placeholders.enterMaxOccupancy")}
                                            {...register("maxOccupancy")}
                                        />
                                        {errors.maxOccupancy && (
                                            <p className="text-danger">
                                                {errors.maxOccupancy.message}
                                            </p>
                                        )}
                                    </div>
                                        {/* Diện tích */}
                                    <div className="form-inner mb-30 col-6">
                                    <label>{t("RoomCreate.labels.roomArea")}</label>
                                        <input
                                            type="number"
                                            placeholder={t("RoomCreate.placeholders.enterRoomArea")}
                                            {...register("roomArea")}
                                        />
                                        {errors.roomArea && (
                                            <p className="text-danger">
                                                {errors.roomArea.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tiện ích */}
                                <div className="row">
                                    <div className="mb-30">
                                        <strong >{t("RoomCreate.labels.facilities")}</strong>
                                        <div className="row border rounded p-2 m-0 mt-1 bg-white ">
                                            {facilities.map((facility) => (
                                                <div
                                                    key={facility.id}
                                                    className="form-check col-2 d-flex justify-content-start align-items-center"
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
                                    <button
                                        type="submit"
                                        className="primary-btn3"
                                    >
                                        {t("RoomCreate.labels.addButton")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomCreate;
