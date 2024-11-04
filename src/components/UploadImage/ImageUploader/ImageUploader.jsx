import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

function ImageUploader({ onImageSelect }) {
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length > 0) {
                const error = rejectedFiles[0].errors[0];
                if (error.code === "file-too-large") {
                    toast.error("Kích thước ảnh vượt quá giới hạn 3MB");
                }
                return;
            }

            const file = acceptedFiles[0];
            if (file) {
                setPreview(URL.createObjectURL(file)); // Set preview
                onImageSelect(file); // Gọi callback để truyền file lên `ProfileInfoes`
            }
        },
        [onImageSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
        },
        maxFiles: 1,
        maxSize: 3 * 1024 * 1024,
    });

    return (
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
                        <button type="button" className="upload-btn">
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
    );
}

export default ImageUploader;
