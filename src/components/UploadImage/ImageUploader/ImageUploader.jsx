import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

function ImageUploader({ onImageSelect }) {

    const { t } = useTranslation();
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length > 0) {
                const error = rejectedFiles[0].errors[0];
                if (error.code === "file-too-large") {
                    toast.error(t("imageUploader.error.fileTooLarge"));
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
        <div className="upload-img-area mb-0">
            {preview && (
                <div className="uploaded-image-preview">
                    <img
                        src={preview}
                        alt="Uploaded Preview"
                        style={{
                            width: "240px",
                            height: "240px",

                            objectFit: "cover",
                        }}
                    />
                </div>
            )}
            <div className="upload-img-wrapper" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-area">
                    {isDragActive ? (
                        <p>{t("imageUploader.dragActive")}</p>
                    ) : (
                        <button type="button" className="upload-btn">
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    )}
                </div>
            </div>
            <div className="upload-img-area-content">
                <h6>{t("imageUploader.title")}</h6>
                <p>{t("imageUploader.description")}</p>
            </div>
        </div>
    );
}

export default ImageUploader;
