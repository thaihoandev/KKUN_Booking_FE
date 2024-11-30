import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as RoomService from "../../../../services/RoomService";
import * as AmenityService from "../../../../services/AmenityService";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import MultiImageUploader from "../../../../components/UploadImage/MultiImageUploader/MultiImageUploader";
import { createRoomSchema } from "../../../../schemas/validationSchemas";

function RoomEdit() {
    const { roomId } = useParams();
    const [roomTypes, setRoomTypes] = useState([]);
    const [bedTypes, setBedTypes] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(createRoomSchema),
    });

    const mutationRoomDetail = useMutation(() => RoomService.getRoomById(roomId), {
        onSuccess: (data) => {
            setSelectedFacilities(data.amenities.map((amenity) => amenity.id));
            setSelectedImages(data.roomImages);
            setValue("roomType", data.type);
            setValue("bedType", data.bedType);
            setValue("originalPrice", data.basePrice);
            setValue("discountedPrice", data.discountedPrice);
            setValue("maxOccupancy", data.capacity);
            setValue("roomArea", data.area);
        },
        onError: (error) => toast.error(error.message || "Lỗi khi tải dữ liệu phòng."),
    });

    const mutationUpdateRoom = useMutation(
        (data) => RoomService.updateRoom(roomId, data, user.accessToken),
        {
            onSuccess: () => {
                toast.success("Cập nhật phòng thành công!");
                navigate("/hotelowner/my-rooms");
            },
            onError: (error) => toast.error(error.message || "Cập nhật thất bại."),
        }
    );

    const mutationDeleteRoom = useMutation(() => RoomService.deleteRoom(roomId, user.accessToken), {
        onSuccess: () => {
            toast.success("Xóa phòng thành công!");
            navigate("/hotelowner/my-rooms");
        },
        onError: (error) => {
            console.error("Delete Room Error:", error.response?.data || error.message);
            toast.error(error.response?.data || "Lỗi khi xóa phòng.");
        },        
    });

    


    const handleCheckboxChange = (facility) => {
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facility)
                ? prevSelected.filter((item) => item !== facility)
                : [...prevSelected, facility]
        );
    };

    // useEffect(() => {
    //     mutationRoomDetail.mutate();
    //     AmenityService.getAllAmenitiesForRoom().then(setFacilities);
    //     RoomService.getRoomTypes().then(setRoomTypes);
    //     RoomService.getBedTypes().then(setBedTypes);
    // }, [roomId]);

    // const handleDelete = () => {
    //     console.log("Room ID:", roomId);
    //     console.log("Access Token:", user.accessToken);
    
    //     if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
    //         mutationDeleteRoom.mutate();
    //     }
    // };
    

    // const accessToken = user.accessToken;
    // if (!accessToken) {
    //     toast.error("Không tìm thấy access token. Vui lòng đăng nhập lại.");
    //     return;
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await mutationRoomDetail.mutateAsync();
                const amenities = await AmenityService.getAllAmenitiesForRoom();
                const roomTypes = await RoomService.getRoomTypes();
                const bedTypes = await RoomService.getBedTypes();
    
                setFacilities(amenities);
                setRoomTypes(roomTypes);
                setBedTypes(bedTypes);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Lỗi khi tải dữ liệu!");
            }
        };
    
        fetchData();
    }, [roomId]);
    
    const handleDelete = () => {
        console.log("Room ID:", roomId);
        console.log("Access Token:", user.accessToken);
    
        if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
            mutationDeleteRoom.mutate();
        }
    };
    
    const accessToken = user.accessToken;
    if (!accessToken) {
        toast.error("Không tìm thấy access token. Vui lòng đăng nhập lại.");
        navigate("/login");
        return null; // Ngừng render component
    }
    
    const onSubmit = (data) => {
        const formData = new FormData();
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
            formData.append("roomImageList", image);
        });

        // Log dữ liệu của FormData
        // console.log("FormData Contents:");
        // for (let [key, value] of formData.entries()) {
        //     if (value instanceof File) {
        //         console.log(`${key}: File Name - ${value.name}`);
        //     } else {
        //         console.log(`${key}:`, value);
        //     }
        // }

        // Gửi dữ liệu sau khi log
        mutationUpdateRoom.mutate(formData);
    };

    return (
        <>
            <ToastContainer />
            <div className="room-details-area pt-120.mb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="main-content-title-profile mb-30">
                                <h3>Thông tin phòng</h3>
                            </div>
                            <div className="dashboard-profile-wrapper two">
                                <div className="dashboard-profile-tab-content">
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
                                                            value={roomTypes.find((option) => option.value === field.value)}
                                                            onChange={(selectedOption) => field.onChange(selectedOption.value)}
                                                        />
                                                    )}
                                                />
                                                {errors.roomType && <p className="text-danger">{errors.roomType.message}</p>}
                                            </div>

                                            <div className="form-inner mb-30 col-6">
                                                <label>Loại giường</label>
                                                <Controller
                                                    name="bedType"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <NiceSelect
                                                            options={bedTypes}
                                                            value={bedTypes.find((option) => option.value === field.value)}
                                                            onChange={(selectedOption) => field.onChange(selectedOption.value)}
                                                        />
                                                    )}
                                                />
                                                {errors.bedType && <p className="text-danger">{errors.bedType.message}</p>}
                                            </div>

                                            <div className="form-inner mb-30 col-6">
                                                <label>Giá gốc</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập giá gốc..."
                                                    {...register("originalPrice")}
                                                />
                                                {errors.originalPrice && <p className="text-danger">{errors.originalPrice.message}</p>}
                                            </div>

                                            <div className="form-inner mb-30 col-6">
                                                <label>Giá giảm</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập giá giảm..."
                                                    {...register("discountedPrice")}
                                                />
                                                {errors.discountedPrice && <p className="text-danger">{errors.discountedPrice.message}</p>}
                                            </div>

                                            <div className="form-inner mb-30 col-6">
                                                <label>Số người (Tối đa)</label>
                                                <input
                                                    type="number"
                                                    placeholder="Nhập số lượng người..."
                                                    {...register("maxOccupancy")}
                                                />
                                                {errors.maxOccupancy && <p className="text-danger">{errors.maxOccupancy.message}</p>}
                                            </div>

                                            <div className="form-inner mb-30 col-6">
                                                <label>Diện tích</label>
                                                <input
                                                    type="number"
                                                    placeholder="Nhập diện tích phòng..."
                                                    {...register("roomArea")}
                                                />
                                                {errors.roomArea && <p className="text-danger">{errors.roomArea.message}</p>}
                                            </div>
                                            <div className="mb-30 col-12">
                                                <strong>Tiện ích</strong>
                                                <div className="row border rounded m-0 p-2 bg-white">
                                                    {facilities.map((facility) => (
                                                        <div key={facility.id} className="form-check col-2 d-flex justify-content-start align-items-center ms-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={facility.id}
                                                                name="facilities"
                                                                value={facility.id}
                                                                checked={selectedFacilities.includes(facility.id)}
                                                                onChange={() => handleCheckboxChange(facility.id)}
                                                            />
                                                            <label htmlFor={facility.id} style={{ marginLeft: "8px" }}>
                                                                {facility.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <MultiImageUploader onImagesSelect={setSelectedImages} initialImages={selectedImages} />
                                        </div>
                                        <div className="form-buttons">
                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <button className="primary-btn3 me-3" onClick={() => navigate(-1)} >
                                                        Trở lại
                                                    </button>
                                                </div>

                                                <div className="col-xl-6 d-flex justify-content-end">
                                                    <button type="submit" className="primary-btn3 me-3">Cập nhật</button>
                                                    <button type="button" className="primary-btn3" onClick={handleDelete}>Xóa</button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomEdit;