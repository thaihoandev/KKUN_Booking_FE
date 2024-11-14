import React, { useState, useEffect } from "react";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import * as AmenityService from "../../../../services/AmenityService";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function PromotionCreate() {
    const [selectedAmenity, setSelectedAmenity] = useState(null);
    const [amenities, setAmenities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const user = useSelector((state) => state.user);

    const mutationAmenityType = useMutation(
        (accessToken) => {
            return AmenityService.getAllAmenityType(accessToken);
        },
        {
            onSuccess: (data) => {
                setAmenities(data);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );
    const mutationCreateAmenity = useMutation(
        ({ data, accessToken }) => {
            return AmenityService.createAmenity(data, accessToken);
        },
        {
            onSuccess: (data) => {
                toast.success("Tạo mới tiện ích thành công!");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );
    useEffect(() => {
        mutationAmenityType.mutate(user.accessToken);
    }, [user.accessToken]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !selectedAmenity || !description) {
            toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }
        const formData = {
            name: name,
            amenityType: selectedAmenity.value, // Lấy value từ selectedAmenity
            description: description,
        };
        mutationCreateAmenity.mutate({
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
                        <div className="main-content-title">
                            <h3>Thêm Tiện ích</h3>
                        </div>
                    </div>
                    <div className="dashboard-profile-wrapper two">
                        <div className="dashboard-profile-tab-content">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>Tên tiện ích</label>
                                            <input
                                                type="text"
                                                placeholder="Tên tiện ích..."
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required // Bắt buộc nhập
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-30">
                                        <div className="form-inner">
                                            <label>Loại tiện ích</label>
                                            <NiceSelect
                                                options={amenities}
                                                value={selectedAmenity}
                                                onChange={setSelectedAmenity}
                                            />
                                            {!selectedAmenity && (
                                                <small className="text-danger">
                                                    Vui lòng chọn loại tiện ích
                                                </small>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-30">
                                        <div className="form-inner">
                                            <label>Mô tả</label>
                                            <textarea
                                                placeholder="Mô tả thêm về tiện nghi"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                                required // Bắt buộc nhập
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
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

export default PromotionCreate;
