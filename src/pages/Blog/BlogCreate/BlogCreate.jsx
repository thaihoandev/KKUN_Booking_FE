import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NiceSelect from "../../../components/NiceSelect/NiceSelect";
import ImageUploader from "../../../components/UploadImage/ImageUploader/ImageUploader";
import { blogCreateSchema } from "../../../schemas/validationSchemas";
import { useMutation } from "react-query";
import * as BlogService from "../../../services/BlogService";
import * as UploadService from "../../../services/UploadService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BlogCreate() {
    const [contents, setContents] = useState([]);
    const [blogPostCategories, setBlogPostCategories] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const mutationBlogPostCategories = useMutation(
        () => BlogService.getBLogCategories(),
        {
            onSuccess: (data) => setBlogPostCategories(data),
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

    // Mutation để upload ảnh lên backend
    const mutationUploadImage = useMutation(
        ({ file, accessToken }) => UploadService.createImage(file, accessToken),
        {
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );
    const mutationCreateBlogPost = useMutation(
        ({ data, accessToken }) =>
            BlogService.createBlogPost(data, accessToken),
        {
            onSuccess: (data) => {
                navigate("/blogs", {
                    state: { message: "Đăng bài thành công!" },
                });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );
    // Thêm nội dung (đoạn văn, ảnh, trích dẫn) vào bài viết
    const addContent = (type) => {
        const newContent = {
            id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Tạo id duy nhất
            type,
            content: "",
            position: contents.length + 1,
        };

        if (type === "IMAGE") {
            newContent.imageFile = null; // Thêm trường imageFile để lưu file ảnh
            newContent.imageUrl = ""; // URL ảnh sẽ nhận được sau khi upload
        }

        setContents([...contents, newContent]);
    };

    // Cập nhật nội dung của từng thành phần trong bài viết
    const handleContentChange = (id, field, value) => {
        const updatedContents = contents.map((content) =>
            content.id === id ? { ...content, [field]: value } : content
        );
        setContents(updatedContents);
    };

    // Xử lý lưu file ảnh vào contents mà không upload ngay lập tức
    const handleImageSelect = (file, id) => {
        const updatedContents = contents.map((content) =>
            content.id === id ? { ...content, imageFile: file } : content
        );
        setContents(updatedContents);
    };

    // Xóa nội dung khỏi bài viết
    const removeContent = (id) => {
        const updatedContents = contents.filter((content) => content.id !== id);
        setContents(
            updatedContents.map((content, idx) => ({
                ...content,
                position: idx + 1,
            }))
        );
    };

    const onSubmit = async (data) => {
        try {
            // Upload ảnh trước và cập nhật URL
            const updatedContents = await Promise.all(
                contents.map(async (content) => {
                    if (content.type === "IMAGE" && content.imageFile) {
                        // Nếu là ảnh, upload file và nhận URL từ backend
                        const uploadedImage =
                            await mutationUploadImage.mutateAsync({
                                file: content.imageFile,
                                accessToken: user.accessToken,
                            });
                        return { ...content, imageUrl: uploadedImage.url }; // Cập nhật URL ảnh
                    }
                    return content; // Đối với các nội dung khác, giữ nguyên
                })
            );

            // Xóa `imageFile` khỏi `updatedContents` trước khi gửi lên backend
            const contentsWithoutImageFile = updatedContents.map((content) => {
                const { imageFile, id, ...rest } = content; // Loại bỏ imageFile
                return rest;
            });

            const newPost = {
                title: data.title,
                readTime: data.readTime,
                blogPostCategory: data.blogPostCategory,
                contents: contentsWithoutImageFile,
            };
            console.log(newPost);
            // Gửi yêu cầu tạo bài viết mới lên backend
            mutationCreateBlogPost.mutate({
                data: newPost,
                accessToken: user.accessToken,
            });
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
        }
    };

    useEffect(() => {
        mutationBlogPostCategories.mutate();
    }, []);

    return (
        <>
            <ToastContainer />
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
                                            (option) =>
                                                option.value === field.value
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
                                        onClick={() =>
                                            removeContent(content.id)
                                        }
                                    >
                                        <small>Xóa</small>
                                    </button>
                                </div>

                                {content.type === "PARAGRAPH" && (
                                    <div className="form-inner">
                                        <label>Đoạn văn</label>
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
                                        <label>Hình ảnh</label>
                                        <div className="dashboard-wrapper m-0 p-0">
                                            <div className="main-content m-0 p-0 ">
                                                <div className="dashboard-profile-wrapper d-block m-0 p-0">
                                                    <div className="dashboard-profile-tab-content m-0 pt-2 pb-2 px-0">
                                                        <ImageUploader
                                                            onImageSelect={(
                                                                file
                                                            ) =>
                                                                handleImageSelect(
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
                                    <>
                                        <div className="form-inner">
                                            <label>Trích dẫn</label>
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
                                        </div>
                                        <div className="form-inner mt-2">
                                            <label>Tác giả</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên tác giả..."
                                                value={
                                                    content.authorQuote || ""
                                                }
                                                onChange={(e) =>
                                                    handleContentChange(
                                                        content.id,
                                                        "authorQuote",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="primary-btn1 mt-4 mb-20">
                        Lưu bài viết
                    </button>
                </form>
            </div>
        </>
    );
}

export default BlogCreate;
