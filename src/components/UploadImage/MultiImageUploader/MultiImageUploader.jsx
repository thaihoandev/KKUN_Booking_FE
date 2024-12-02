import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function MultiImageUploader({ onImagesSelect }) {

    const { t } = useTranslation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [];

        files.forEach((file) => {
            if (file.size <= 3 * 1024 * 1024) {
                // Kiểm tra kích thước <= 3MB
                newImages.push({
                    file,
                    url: URL.createObjectURL(file),
                });
            } else {
                setError(t("MultiImageUploader.errors.sizeLimit"));
            }
        });

        const updatedImages = [...selectedImages, ...newImages].slice(0, 10); // Giới hạn tối đa 10 ảnh
        setSelectedImages(updatedImages);
        onImagesSelect(updatedImages.map((img) => img.file));
    };

    useEffect(() => {
        if (selectedImages.length < 3) {
            setError(t("MultiImageUploader.errors.minImages"));
        } else {
            setError("");
        }
    }, [selectedImages]);

    const handleRemoveImage = (index) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        onImagesSelect(updatedImages.map((img) => img.file));
    };

    return (
        <div className="upload-img-area d-flex flex-column align-items-start">
            <div className="d-flex align-items-center">
                <div className="upload-img-wrapper">
                    <div className="drag-area">
                        <button
                            type="button"
                            className="upload-btn"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <i className="bi bi-plus-lg"></i>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            hidden
                            onChange={handleImageUpload}
                            accept="image/jpeg, image/png"
                        />
                    </div>
                </div>

                <div className="upload-img-area-content px-2">
                <h6>{t("MultiImageUploader.title")}</h6>
                <p>{t("MultiImageUploader.description1")}<br />
                {t("MultiImageUploader.description2")}
                </p>
                </div>
            </div>

            <div className="row">
                <div className="preview-area d-flex overflow-auto flex-wrap mt-3">
                    {selectedImages.map((image, index) => (
                        <div
                            key={index}
                            className="preview-image me-2 position-relative"
                        >
                            <img
                                style={{
                                    height: "200px",
                                    width: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                                src={image.url}
                                alt={`preview ${index}`}
                                className="image-thumbnail"
                            />
                            <button
                                type="button"
                                className="btn btn-danger position-absolute top-0 end-0"
                                onClick={() => handleRemoveImage(index)}
                                style={{
                                    fontSize: "1rem",
                                    borderRadius: "50%",
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>
        </div>
    );
}

export default MultiImageUploader;
