import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import * as PromotionService from "../../../../services/PromotionService";
import ImageUploader from "../../../../components/UploadImage/ImageUploader/ImageUploader"; // Import component ImageUploader
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import Loading from "../../../../components/Loading/Loading";
import { useSelector } from "react-redux";

function PromotionEdit() {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    // State cho các trường dữ liệu
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [value, setValue] = useState("");
    const [discountType, setDiscountType] = useState("");
    const [applyTo, setApplyTo] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // State cho ảnh

    // anh
    const handleImageSelect = (file) => {
        setSelectedFile(file);
    };

    // Lấy thông tin chi tiết của ưu đãi dựa trên id
    const { data: promotion, Loading } = useQuery(
        ["promotionDetails", id],
        () => PromotionService.getPromotionById(id, user.accessToken),
        {
            onSuccess: (data) => {
                setName(data.name);
                setCode(data.code);
                setStartDate(data.startDate);
                setEndDate(data.endDate);
                setQuantity(data.quantity);
                setValue(data.value);
                setDiscountType(data.discountType);
                setApplyTo(data.applyTo);
                setDescription(data.description);
                setIsActive(data.isActive);
            },
            onError: () => {
                toast.error("Không thể tải thông tin ưu đãi.");
            },
        }
    );

    // Mutation để cập nhật ưu đãi
    const mutationUpdatePromotion = useMutation(
        ({ id, data, accessToken }) => {
            return PromotionService.updatePromotion(id, data, accessToken);
        },
        {
            onSuccess: () => {
                toast.success("Cập nhật thành công!");
                navigate("/admin/promotions");
            },
            onError: () => {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !code || !description || !value || !discountType) {
            toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }
        const formData = {
            name,
            code,
            startDate: startDate || "Không giới hạn",
            endDate: endDate || "Không giới hạn",
            quantity: quantity || "Không giới hạn",
            value,
            discountType,
            applyTo: applyTo || "Tất cả",
            description,
            image: selectedFile, // Thêm ảnh vào formData
            isActive,
        };
        mutationUpdatePromotion.mutate({
            id,
            data: formData,
            accessToken: user.accessToken,
        });
    };

    if (Loading) {
        return <div>Đang tải...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="main-content-title-profile mb-50">
                <div className="main-content-title">
                    <h3>Chỉnh sửa ưu đãi</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Tên ưu đãi */}
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Tên ưu đãi</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Mã ưu đãi */}
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Mã ưu đãi</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                    </div>

                    {/* Thời gian bắt đầu */}
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Thời gian bắt đầu</label>
                            <input
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Thời gian kết thúc */}
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Thời gian kết thúc</label>
                            <input
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Số lượng */}
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Số lượng</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Loại ưu đãi */}
                    <div className="col-md-6 mb-30">
                        <div className="form-inner">
                            <label>Loại ưu đãi</label>
                            <NiceSelect
                                options={[
                                    { value: "coupon", label: "Phiếu giảm giá" },
                                    { value: "special", label: "Chiến dịch đặc biệt" },
                                    { value: "limited", label: "Khuyến mãi có thời hạn" }
                                ]}
                                value={discountType}
                                onChange={setDiscountType}
                            />
                        </div>
                    </div>

                    {/* Giá trị */}
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Giá trị</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Áp dụng */}
                    <div className="col-md-6 mb-30">
                        <div className="form-inner">
                            <label>Áp dụng</label>
                            <NiceSelect
                                options={[
                                    { value: "all", label: "Tất cả" },
                                    { value: "customer", label: "Khách hàng" },
                                    { value: "hotel", label: "Khách sạn" },
                                    { value: "homestay", label: "Homestay" }
                                ]}
                                value={applyTo}
                                onChange={setApplyTo}
                            />
                        </div>
                    </div>

                    {/* Sửa ảnh */}
                    <div className="col-md-12 mb-30">
                        <div className="form-inner">
                            <label>Ảnh ưu đãi</label>
                            <ImageUploader onImageSelect={handleImageSelect} />
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div className="col-md-12 mb-30">
                        <div className="form-inner">
                            <label>Mô tả</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Nút submit */}
                    <div className="form-inner">
                        <button type="submit" className="primary-btn3">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default PromotionEdit;
