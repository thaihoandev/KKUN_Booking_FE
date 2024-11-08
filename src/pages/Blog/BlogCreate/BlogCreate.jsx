import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NiceSelect from "../../../components/NiceSelect/NiceSelect";
import ImageUploader from "../../../components/UploadImage/ImageUploader/ImageUploader";
import { blogCreateSchema } from "../../../schemas/validationSchemas";
import { useMutation } from "react-query";
import * as BlogService from "../../../services/BlogService";
function BlogCreate() {
    const [contents, setContents] = useState([]);
    const [blogPostCategories, setBlogPostCategories] = useState([]);
    const mutationBlogPostCategories = useMutation(
        () => {
            return BlogService.getBLogCategories();
        },
        {
            onSuccess: (data) => {
                setBlogPostCategories(data);
            },
        }
    );

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(blogCreateSchema),
    });

    const addContent = (type) => {
        const newContent = {
            id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Sử dụng Date.now() kết hợp số ngẫu nhiên để tạo id duy nhất
            type,
            content: "",
            position: contents.length + 1,
        };

        if (type === "IMAGE") {
            newContent.imageUrl = "";
        }

        setContents([...contents, newContent]);
    };

    const handleContentChange = (id, field, value) => {
        const updatedContents = contents.map((content) =>
            content.id === id ? { ...content, [field]: value } : content
        );
        setContents(updatedContents);
    };

    const handleImageUpload = (file, id) => {
        const updatedContents = contents.map((content) =>
            content.id === id
                ? { ...content, imageUrl: URL.createObjectURL(file) }
                : content
        );
        setContents(updatedContents);
    };

    const removeContent = (id) => {
        const updatedContents = contents.filter((content) => content.id !== id);
        setContents(
            updatedContents.map((content, idx) => ({
                ...content,
                position: idx + 1,
            }))
        );
    };

    const onSubmit = (data) => {
        const newPost = {
            title: data.title,
            readTime: data.readTime,
            blogPostCategory: data.blogPostCategory,
            contents,
        };
        console.log("Bài viết mới:", newPost);
        // Gửi bài viết mới (API hoặc lưu trữ trong Redux)
    };

    useEffect(() => {
        mutationBlogPostCategories.mutate();
    }, []);
    return (
        <div className="container mb-30 border p-5 rounded">
            <h2>Tạo bài viết mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="form-inner mb-30 col-12">
                        <label>Tiêu đề</label>
                        <input
                            type="text"
                            placeholder="Nhập tiêu đề bài viết..."
                            className={`form-control ${
                                errors.title ? "is-invalid" : ""
                            }`}
                            {...register("title")}
                        />
                        {errors.title && (
                            <div className="invalid-feedback">
                                {errors.title.message}
                            </div>
                        )}
                    </div>

                    <div className="form-inner mb-30 col-6">
                        <label>Danh mục</label>
                        <Controller
                            name="blogPostCategory"
                            control={control}
                            render={({ field }) => (
                                <NiceSelect
                                    options={blogPostCategories}
                                    value={blogPostCategories.find(
                                        (option) => option.value === field.value
                                    )}
                                    onChange={(selectedOption) =>
                                        field.onChange(selectedOption.value)
                                    }
                                />
                            )}
                        />
                        {errors.blogPostCategory && (
                            <div className="invalid-feedback d-block">
                                {errors.blogPostCategory.message}
                            </div>
                        )}
                    </div>

                    <div className="form-inner mb-30 col-6">
                        <label>Thời gian đọc (phút)</label>
                        <input
                            type="number"
                            placeholder="Nhập thời gian đọc..."
                            className={`form-control ${
                                errors.readTime ? "is-invalid" : ""
                            }`}
                            {...register("readTime")}
                        />
                        {errors.readTime && (
                            <div className="invalid-feedback">
                                {errors.readTime.message}
                            </div>
                        )}
                    </div>

                    <div className="row">
                        <h4>Nội dung bài viết</h4>
                        <div className="form-inner mb-30">
                            <button
                                type="button"
                                className="primary-btn4 me-2"
                                onClick={() => addContent("PARAGRAPH")}
                            >
                                Thêm Đoạn Văn
                            </button>
                            <button
                                type="button"
                                className="primary-btn4 me-2"
                                onClick={() => addContent("IMAGE")}
                            >
                                Thêm Hình Ảnh
                            </button>
                            <button
                                type="button"
                                className="primary-btn4"
                                onClick={() => addContent("QUOTE")}
                            >
                                Thêm Câu Trích Dẫn
                            </button>
                        </div>
                    </div>

                    {contents.map((content, index) => (
                        <div key={content.id} className="form-group mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>{`Nội dung ${index + 1}`}</h5>
                                <button
                                    type="button"
                                    className="secondary-btn4 px-4 py-2 rounded"
                                    onClick={() => removeContent(content.id)}
                                >
                                    <small>Xóa</small>
                                </button>
                            </div>

                            {content.type === "PARAGRAPH" && (
                                <div className="form-inner">
                                    <label>Đoạn Văn</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Nhập nội dung đoạn văn..."
                                        value={content.content}
                                        onChange={(e) =>
                                            handleContentChange(
                                                content.id,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                            )}
                            {content.type === "IMAGE" && (
                                <div className="form-inner">
                                    <label>URL Hình Ảnh</label>
                                    <div className="dashboard-wrapper m-0 p-0">
                                        <div className="main-content m-0 p-0 ">
                                            <div className="dashboard-profile-wrapper d-block m-0 p-0">
                                                <div className="dashboard-profile-tab-content m-0 pt-2 pb-2 px-0">
                                                    <ImageUploader
                                                        onImageSelect={(file) =>
                                                            handleImageUpload(
                                                                file,
                                                                content.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {content.type === "QUOTE" && (
                                <div className="form-inner">
                                    <label>Trích Dẫn</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Nhập lời trích dẫn..."
                                        value={content.content}
                                        onChange={(e) =>
                                            handleContentChange(
                                                content.id,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <label>Tác Giả Trích Dẫn</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập tên tác giả..."
                                        value={content.authorQuote || ""}
                                        onChange={(e) =>
                                            handleContentChange(
                                                content.id,
                                                "authorQuote",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button type="submit" className="primary-btn1 mt-4 mb-20">
                    Lưu bài viết
                </button>
            </form>
        </div>
    );
}

export default BlogCreate;
