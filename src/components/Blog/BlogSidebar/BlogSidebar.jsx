import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as BlogService from "../../../services/BlogService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function BlogSidebar({ blogs }) {
    const [blogCategories, setBlogCategories] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleOpenBlogDetail = (postId) => {
        navigate(`/blogs/${postId}`);
        window.scrollTo(0, 0);
    };
    const mutationBlogPostCategories = useMutation(
        () => {
            return BlogService.getBLogCategories();
        },
        {
            onSuccess: (data) => {
                setBlogCategories(data);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    useEffect(() => {
        mutationBlogPostCategories.mutate();
    }, []);
    return (
        <div class="sidebar-area">
            <div class="single-widget mb-30">
                <h5 class="widget-title">{t("searchBlog")}</h5>
                <form>
                    <div class="search-box">
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                        />
                        <button type="submit">
                            <i class="bx bx-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="single-widget mb-30">
                <h5 className="widget-title">{t("recentPosts")}</h5>
                {blogs.slice(0, 5).map((blog) => (
                    <div className="recent-post-widget mb-20" key={blog.id}>
                        <div className="recent-post-img">
                            <Link
                                onClick={() => {
                                    handleOpenBlogDetail(blog.id);
                                }}
                                className="card-img"
                            >
                                <img
                                    style={{
                                        width: "100%",
                                        height: "70px",
                                        objectFit: "cover",
                                    }}
                                    src={
                                        blog.contents.find(
                                            (c) =>
                                                c.type === "IMAGE" && c.imageUrl
                                        )?.imageUrl ||
                                        "assets/img/home4/blog-card-img1.jpg"
                                    }
                                    alt={blog.title}
                                />
                            </Link>
                        </div>
                        <div className="recent-post-content">
                            <Link>
                                {new Date(blog.createdAt).toLocaleDateString(
                                    "vi-VN",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }
                                )}
                            </Link>
                            <h6>
                                <Link
                                    onClick={() => {
                                        handleOpenBlogDetail(blog.id);
                                    }}
                                >
                                    {blog.title}
                                </Link>
                            </h6>
                        </div>
                    </div>
                ))}
            </div>
            <div class="single-widget">
                <h5 class="widget-title">{t("categories")}</h5>
                <ul class="tag-list">
                    {blogCategories.slice(0, 8).map((blogCategory, index) => (
                        <li key={index}>
                            <a href="blog-grid.html ">
                                {t(`blogCategories.${blogCategory.value}`)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BlogSidebar;
