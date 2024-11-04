import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as RoomService from "../../../../services/RoomService";
import { toast, ToastContainer } from "react-toastify";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import MultiImageUploader from "../../../../components/UploadImage/MultiImageUploader/MultiImageUploader";

const facilitiesList = [
    "Wi-Fi miễn phí",
    "Bãi đỗ xe",
    "Máy lạnh",
    "TV",
    "Hồ bơi",
    "Bồn tắm",
    "Dịch vụ phòng",
    "Nhà hàng",
];

function RoomCreate() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [bedTypes, setBedTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]); // Lưu danh sách ảnh

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

    const mutationAmenityType = useMutation(
        (accessToken) => RoomService.getRoomTypes(accessToken),
        {
            onSuccess: (data) => setRoomTypes(data),
            onError: (error) => toast.error(error.message),
        }
    );

    useEffect(() => {
        mutationAmenityType.mutate();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append room data
        formData.append("roomType", selectedRoomType);
        formData.append("facilities", JSON.stringify(selectedFacilities));

        // Append each image to `formData`
        selectedImages.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        // Gọi API để tạo phòng
        RoomService.createRoom(formData)
            .then(() => toast.success("Phòng đã được thêm thành công!"))
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile mb-50">
                        <h3>Thêm phòng</h3>
                    </div>
                    <div className="dashboard-profile-wrapper two">
                        <div className="dashboard-profile-tab-content">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-30">
                                        <div className="form-inner">
                                            <label>Loại phòng</label>
                                            <NiceSelect
                                                options={roomTypes}
                                                value={selectedRoomType}
                                                onChange={setSelectedRoomType}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-inner mb-30">
                                                <label>Giá gốc</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập giá..."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner mb-30">
                                                <label>Giá giảm</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập giá giảm..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-inner mb-30">
                                                <label>Số người (Tối đa)</label>
                                                <input
                                                    type="number"
                                                    placeholder="Nhập số lượng người...."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-inner mb-30">
                                                <label>Diện tích</label>
                                                <input
                                                    type="number"
                                                    placeholder="Nhập diện tích phòng...."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-inner mb-30">
                                                <label>Loại giường</label>
                                                <NiceSelect
                                                    options={bedTypes}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row px-3">
                                        <div className=" mb-30">
                                            <strong>Tiện ích</strong>
                                            <div className="row border rounded p-2 bg-white ">
                                                {facilitiesList.map(
                                                    (facility) => (
                                                        <div
                                                            key={facility}
                                                            className="form-check col-2"
                                                        >
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={facility}
                                                                name="facilities"
                                                                value={facility}
                                                                checked={selectedFacilities.includes(
                                                                    facility
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        facility
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    facility
                                                                }
                                                                style={{
                                                                    marginLeft:
                                                                        "8px",
                                                                }}
                                                            >
                                                                {facility}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
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
                                        Thêm ngay
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
