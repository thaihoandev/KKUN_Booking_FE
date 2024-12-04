import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

function AccountDetails() {
    const user = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        lastName: user.lastName || "",
        firstName: user.firstName || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirmPassword: "",
        alias: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Dropzone setup for profile picture upload
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
        maxFiles: 1,
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }
        // Process form submission logic here
    };

    return (
        <>
            <div className="dashboard-profile-tab-content">
                <div className="account-details-tab-content">
                    <div className="account-tab-content-title">
                        <h6>Thông tin tài khoản</h6>
                        <p>Cung cấp thông tin cá nhân của bạn để bắt đầu.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="general-information">
                            <h6>Thông tin cá nhân</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Họ*</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Nhập họ..."
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Tên*</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Nhập tên..."
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Email*</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Nhập email..."
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Số điện thoại*</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Nhập số điện thoại..."
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Biệt danh (nếu có)</label>
                                        <input
                                            type="text"
                                            name="alias"
                                            placeholder="Nhập biệt danh..."
                                            value={formData.alias}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="security-information">
                            <h6>Bảo mật tài khoản</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Mật khẩu*</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Nhập mật khẩu..."
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        <small>Yêu cầu mật khẩu ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt.</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-inner mb-30">
                                        <label>Xác nhận mật khẩu*</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Nhập lại mật khẩu..."
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Picture Upload */}
                        <div className="row">
                            <div className="upload-img-area">
                                {preview && (
                                    <div className="uploaded-image-preview">
                                        <img
                                            src={preview}
                                            alt="Uploaded Preview"
                                            style={{
                                                width: "240px",
                                                height: "240px",
                                                marginTop: "10px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="upload-img-wrapper" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="drag-area">
                                        {isDragActive ? (
                                            <p>Thả ảnh tại đây...</p>
                                        ) : (
                                            <button
                                                type="button"
                                                className="upload-btn"
                                            >
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="upload-img-area-content">
                                    <h6>Tải ảnh đại diện</h6>
                                    <p>Yêu cầu ảnh 300x300, định dạng JPEG hoặc PNG.</p>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="primary-btn3">
                            Tiếp theo
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AccountDetails;
