import React, { useState, useEffect } from "react";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import ImageUploader from "../../../../components/UploadImage/ImageUploader/ImageUploader"; // Import component ImageUploader
import * as PromotionService from "../../../../services/PromotionService";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function PromotionCreate() {
    const [promotionTypes, setPromotionTypes] = useState([]); // Thêm state cho loại ưu đãi
    const [selectedPromotionType, setSelectedPromotionType] = useState(null); // Thêm state cho loại ưu đãi đã chọn
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [applyTo, setApplyTo] = useState('');
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // State cho ảnh
    const user = useSelector((state) => state.user);

    useEffect(() => {
        // Giả sử có hàm lấy danh sách loại ưu đãi từ API
        PromotionService.getAllPromotionTypes(user.accessToken)
            .then((data) => setPromotionTypes(data))
            .catch((error) => toast.error(error.message));
    }, [user.accessToken]);

    const handleImageSelect = (file) => {
        setSelectedFile(file);
    };

    // Fetch all promotion types
    const mutationPromotionType = useMutation(
        (accessToken) => {
            return PromotionService.getAllPromotionTypes(accessToken);
        },
        {
            onSuccess: (data) => {
                setPromotionTypes(data);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );


    // Create a new promotion
    const mutationCreatePromotion = useMutation(
        ({ data, accessToken }) => {
            return PromotionService.createPromotion(data, accessToken);
        },
        {
            onSuccess: () => {
                toast.success("Tạo mới ưu đãi thành công!");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    useEffect(() => {
        mutationPromotionType.mutate(user.accessToken);
    }, [user.accessToken]);

    const handleCodeInput = (input) => {
        // Convert input to uppercase, remove accents, and remove spaces
        const transformed = input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
        setCode(transformed);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !code || !selectedPromotionType || !description || !value || !discountType) {
            toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }
        const formData = {
            name,
            code,
            startDate: startDate || "Không giới hạn",
            endDate: endDate || "Không giới hạn",
            quantity: quantity || "Không giới hạn",
            promotionType: selectedPromotionType.value, // Lấy value từ selectedPromotionType
            description,
            value,
            discountType,
            image: selectedFile, // Thêm ảnh vào formData
            applyTo: applyTo || "Tất cả",
            promotionType: selectedPromotionType.value, // Gửi loại ưu đãi đã chọn
        };
        mutationCreatePromotion.mutate({
            data: formData,
            accessToken: user.accessToken,
        });

    };
    return (
        <>
            <ToastContainer />
            <div className="main-content-title-profile mb-50">
                <div className="main-content-title">
                    <h3>Thêm ưu đãi</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-8">
                    <div className="dashboard-profile-wrapper two">
                        <div className="dashboard-profile-tab-content">
                            <form onSubmit={handleSubmit}>
                                <div className="col-md-12">
                                    <div className="row">
                                        {/* Tên ưu đãi */}
                                        <div className="col-md-6">
                                            <div className="form-inner mb-30">
                                                <label>Tên ưu đãi</label>
                                                <input
                                                    type="text"
                                                    placeholder="Tên ưu đãi..."
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
                                                    placeholder="Mã ưu đãi..."
                                                    value={code}
                                                    onChange={(e) => handleCodeInput(e.target.value)}
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
                                                    placeholder="Chọn thời gian bắt đầu..."
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
                                                    placeholder="Chọn thời gian kết thúc..."
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
                                                    placeholder="Số lượng mã sử dụng..."
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Loại ưu đãi */}
                                        <div className="col-md-6 mb-30">
                                            <div className="form-inner mb-30">
                                                <label>Loại ưu đãi</label>
                                                <NiceSelect
                                                    options={promotionTypes.map(type => ({ value: type.value, label: type.label }))}
                                                    // options={promotionTypes}
                                                    value={selectedPromotionType}
                                                    onChange={setSelectedPromotionType}
                                                />
                                                {!selectedPromotionType && (
                                                    <small className="text-danger">
                                                        Vui lòng chọn loại ưu đãi
                                                    </small>
                                                )}
                                            </div>
                                        </div>


                                        {/* Giá trị */}
                                        <div className="col-md-6">
                                            <div className="form-inner mb-30">
                                                <label>Giá trị</label>
                                                <input
                                                    type="text"
                                                    placeholder="Giá trị giảm giá..."
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Giảm trên */}
                                        <div className="col-md-6 mb-30">
                                            <div className="form-inner">
                                                <label>Giảm trên</label>
                                                <NiceSelect
                                                    options={[
                                                        { value: "percent", label: "Phần trăm" },
                                                        { value: "fixed", label: "Số tiền cố định" }
                                                    ]}
                                                    value={discountType}
                                                    onChange={setDiscountType}
                                                />
                                                {!discountType && (
                                                    <small className="text-danger">
                                                        Vui lòng chọn loại giảm giá
                                                    </small>
                                                )}
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

                                        {/* Tải ảnh */}
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
                                                    placeholder="Mô tả thêm về ưu đãi..."
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>



                                        {/* Nút submit */}
                                        <div className="form-inner">
                                            <button
                                                type="submit"
                                                className="primary-btn3"
                                            >
                                                Thêm ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    {/* Tổng quan khuyến mãi */}
                    <div className="col-md-11 ms-auto">
                        <div
                            className="inquiry-form"
                            style={{
                                background: "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <div className="title" style={{ marginBottom: "15px" }}>
                                <h4 style={{ color: "#333", fontWeight: "600" }}>Tổng quan khuyến mãi</h4>
                            </div>
                            <div className="pricing-area">
                                <div className="cart-menu">
                                    <div className="cart-body" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                        <p><strong>Tên ưu đãi:</strong> {name || "Chưa nhập"}</p>
                                        <p><strong>Mã ưu đãi:</strong> {code || "Chưa nhập"}</p>
                                        <p><strong>Thời gian:</strong> {startDate || "Không giới hạn"} - {endDate || "Không giới hạn"}</p>
                                        <p><strong>Số lượng:</strong> {quantity || "Không giới hạn"}</p>
                                        <p><strong>Giá trị giảm:</strong> {value} ({discountType || "Chưa chọn"})</p>
                                        <p><strong>Áp dụng cho:</strong> {applyTo || "Tất cả"}</p>
                                        <p>
                                            <strong>Mô tả:</strong>
                                            <span style={{
                                                display: "block",
                                                maxHeight: "80px", // Giới hạn chiều cao của phần mô tả
                                                overflowY: "auto", // Cho phép cuộn khi văn bản quá dài
                                                wordWrap: "break-word" // Tự động xuống dòng khi từ quá dài
                                            }}>
                                                {description || "Chưa có mô tả"}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromotionCreate;
