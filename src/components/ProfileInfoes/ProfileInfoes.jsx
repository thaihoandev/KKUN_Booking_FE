import React, { useCallback, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import NiceSelect from "../NiceSelect/NiceSelect";
import { toast } from "react-toastify";
import ImageUploader from "../UploadImage/ImageUploader/ImageUploader";
import { useTranslation } from "react-i18next";

function ProfileInfoes() {

    const { t } = useTranslation();
    const user = useSelector((state) => state.user);
    const [selectedFile, setSelectedFile] = useState(null); // Lưu ảnh được chọn
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

    // Hàm callback nhận ảnh từ `ImageUploader`
    const handleImageSelect = (file) => {
        setSelectedFile(file);
    };

    const mutationUserUpdate = useMutation(
        (updatedData) => UserService.updateUser(updatedData, user.accessToken),
        {
            onSuccess: (data) => {
                // Update form data with new user details
                setFormData({
                    id: data.id,
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    avatar: data.avatar || "",
                    country: "Viet Nam",
                    type: (data.role || "").toLowerCase(),
                });
                toast.success(t("profileInfoes.success"));
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("user", JSON.stringify(formData));

        // Gắn file ảnh nếu có
        if (selectedFile) {
            data.append("profileImage", selectedFile);
        }

        mutationUserUpdate.mutate(data); // Gọi API cập nhật người dùng
    };

    return (
        <div className="dashboard-profile-tab-content">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>{t("profileInfoes.labels.firstName")}</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder={t(
                                    "profileInfoes.labels.firstNamePlaceholder"
                                )}
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>{t("profileInfoes.labels.lastName")}</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder={t(
                                    "profileInfoes.labels.lastNamePlaceholder"
                                )}
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>{t("profileInfoes.labels.email")}</label>
                            <input
                                type="email"
                                name="email"
                                readOnly
                                placeholder={t(
                                    "profileInfoes.labels.emailPlaceholder"
                                )}
                                value={formData.email}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>{t("profileInfoes.labels.phone")}</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder={t(
                                    "profileInfoes.labels.phonePlaceholder"
                                )}
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inner mb-30">
                            <label>{t("profileInfoes.labels.address")}</label>
                            <input
                                type="text"
                                name="address"
                                placeholder={t(
                                    "profileInfoes.labels.addressPlaceholder"
                                )}
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* <div div className="col-md-6 mb-30">
                        <NiceSelect
                            options={options}
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            label={t("profileInfoes.labels.country")}
                        />
                    </div> */}
                </div>
                <ImageUploader onImageSelect={handleImageSelect} />

                <div className="form-inner mt-30">
                    <button type="submit" className="primary-btn3">
                        {t("profileInfoes.labels.submitButton")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileInfoes;
