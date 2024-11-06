import React, { useState, useEffect } from "react";

function MultiImageUploader({ onImagesSelect }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState("");

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        const updatedImages = [...selectedImages, ...newImages];
        setSelectedImages(updatedImages);
        onImagesSelect(updatedImages.map((img) => img.file)); // Truyền file ảnh lên `RoomCreate`
    };

    // Kiểm tra số lượng ảnh mỗi khi `selectedImages` thay đổi
    useEffect(() => {
        if (selectedImages.length < 3) {
            setError("Vui lòng tải lên tối thiểu 3 ảnh.");
        } else {
            setError("");
        }
    }, [selectedImages]);

    return (
        <div className="upload-img-area d-flex flex-column align-items-start">
            <div className="d-flex align-items-center">
                <div className="upload-img-wrapper">
                    <div className="drag-area">
                        <button
                            type="button"
                            className="upload-btn"
                            onClick={() =>
                                document.getElementById("file-input").click()
                            }
                        >
                            <i className="bi bi-plus-lg"></i>
                        </button>
                        <input
                            type="file"
                            id="file-input"
                            multiple
                            hidden
                            onChange={handleImageUpload}
                            accept="image/jpeg, image/png"
                        />
                    </div>
                </div>

                <div className="upload-img-area-content px-2">
                    <h6>Tải ảnh phòng</h6>
                    <p>
                        Yêu cầu ảnh tối đa 3mb, định dạng JPEG, PNG.
                        <br /> Tối thiểu 3 ảnh!
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="preview-area d-flex overflow-auto flex-wrap mt-3">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="preview-image me-2">
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
                        </div>
                    ))}
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>
        </div>
    );
}

export default MultiImageUploader;
