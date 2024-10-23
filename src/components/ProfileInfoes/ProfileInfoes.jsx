import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import NiceSelect from "../NiceSelect/NiceSelect";
import useToast from "../../utils/toast";
import { toast, ToastContainer } from "react-toastify";

function ProfileInfoes() {
    const user = useSelector((state) => state.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const { showToast, showLoading, dismissToast, TOAST_MESSAGES } = useToast();
    const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
    const options = ["United Kingdom", "Bangladesh", "United States"];
    const [formData, setFormData] = useState({
        id: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        country: "Viet Nam",
        type: (user.role || "").toLowerCase(),
    });

    // Dropzone setup
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Set a preview URL for the image
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

    // Mutation for fetching user details
    const mutationUserDetails = useMutation(
        () => UserService.getDetailsUser(user.id, user.access_token),
        {
            onSuccess: (data) => {
                // Update the formData with the new user details
                setFormData({
                    id: data.id,
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    country: "Viet Nam", // Adjust if needed based on response
                });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    // Mutation for updating user details
    const mutationUserUpdate = useMutation(
        (updatedData) =>
            UserService.updateUser(user.id, updatedData, user.access_token),
        {
            onSuccess: (data) => {
                // Update the formData with the returned user details
                setFormData({
                    id: data.id,
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    avatar: data.avatar || "",
                    country: "Viet Nam", // Adjust if needed
                });
                showToast("success", TOAST_MESSAGES.SAVE_SUCCESS);
            },
            onError: (error) => {
                toast.error(error.message);
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
        // Create a new FormData instance
        const data = new FormData();

        // Append the user data
        data.append("user", JSON.stringify(formData));

        // Append the selected file if it exists
        if (selectedFile) {
            data.append("profileImage", selectedFile);
        }

        // Call the mutation to update user information
        mutationUserUpdate.mutate(data);
    };

    // Automatically load user details when the component mounts
    useEffect(() => {
        if (user.id) {
            mutationUserDetails.mutate(); // Fetch user details
        }
    }, [user.id]);

    return (
        <>
            <ToastContainer />
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
                                    placeholder="Nhập họ..."
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
                                    placeholder="Nhập tên..."
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-inner mb-30">
                                <label>Địa chỉ Email* (Mặc định)</label>
                                <input
                                    type="email"
                                    name="email"
                                    readOnly
                                    placeholder="Nhập email..."
                                    value={formData.email}
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
                                <label>Địa chỉ*</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ..."
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-30">
                            <NiceSelect
                                options={options}
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                                label="Quốc gia*"
                            />
                        </div>
                    </div>

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
                            <p>Yêu cầu ảnh 300*300, định dạng JPEG hoặc PNG.</p>
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
        </>
    );
}

export default ProfileInfoes;
