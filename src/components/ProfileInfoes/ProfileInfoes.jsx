import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";

function ProfileInfoes() {
    const user = useSelector((state) => state.user);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        country: "United Kingdom",
    });

    // Dropzone setup
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result); // Set the image data (base64) to state
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
        },
        maxFiles: 1,
    });

    // Mutation for updating user details
    const mutationUserUpdate = useMutation(
        (updatedData) => UserService.updateUser(user.id, updatedData),
        {
            onSuccess: (data) => {
                console.log("User updated successfully:", data);
            },
            onError: (error) => {
                console.error("Error updating user data:", error);
            },
        }
    );

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
        const updatedData = {
            ...formData,
            profileImage: uploadedImage,
        };
        mutationUserUpdate.mutate(updatedData);
    };

    return (
        <div className="dashboard-profile-tab-content">
            <div className="profile-tab-content-title">
                <h6>Thông tin của bạn</h6>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Họ*</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Jhon"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Tên*</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Ex- Rocky"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Địa chỉ Email*</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="info@gmail.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Số điện thoại*</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="01245302....."
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>Địa chỉ*</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Mirpur DOHS, Dhaka"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-30">
                        <div className="form-inner">
                            <label>Quốc gia*</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="United Kingdom">
                                    United Kingdom
                                </option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="United States">
                                    United States
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="upload-img-area">
                    {uploadedImage && (
                        <div className="uploaded-image-preview">
                            <img
                                src={uploadedImage}
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
                                <>
                                    <button
                                        type="button"
                                        className="upload-btn"
                                    >
                                        <i className="bi bi-plus-lg"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="upload-img-area-content">
                        <h6>Tải ảnh đại diện</h6>
                        <p>Yêu cầu ảnh 300*300, định dạng JPGE hoặc PNG.</p>
                    </div>
                </div>
                <div className="form-inner mb-50">
                    <label className="containerss">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        <span className="text">
                            Cập nhật tất cả thông tin trong trang này.
                        </span>
                    </label>
                </div>
                <div className="form-inner">
                    <button type="submit" className="primary-btn3">
                        Cập nhật thay đổi
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileInfoes;
