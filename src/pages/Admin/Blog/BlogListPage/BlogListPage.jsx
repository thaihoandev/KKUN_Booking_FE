import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as BlogService from "../../../../services/BlogService";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BlogListPage() {

    const { t } = useTranslation();
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Số lượng khách sạn trên mỗi trang
    const navigate = useNavigate();
    const mutationBlogs = useMutation(() => BlogService.getAllBlogPosts(), {
        onSuccess: async (data) => {
            setBlogs(data);
        },
        onError: (error) => {
            toast.error(error.message || t("error.generic"));
        },
    });

    const handleEditBlog = (postId) => {
        navigate(`/admin/blogs/${postId}/edit`);
    };

    useEffect(() => {
        mutationBlogs.mutate();
    }, []);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(blogs.length / pageSize);

    // Lấy dữ liệu khách sạn cho trang hiện tại
    const currentBlogs = blogs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Xử lý thay đổi trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <>
            <div class="row">
                <div class="col-xl-12">
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>{t("blogList.title")}</h3>
                        </div>
                        {/* <div class="profile">
                            <a href="#">
                                {t("blogList.profileView")}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                >
                                    <path d="M6.669 2.27202L0.94102 8L0 7.05898L5.72731 1.331H0.679478V0H8V7.32052H6.669V2.27202Z"></path>
                                </svg>
                            </a>
                        </div> */}
                    </div>

                    <div class="recent-listing-area">
                        <div class="title-and-tab">
                            <h6>{t("blogList.infoTitle")}</h6>
                            <div class="search-area">
                                <form>
                                    <div class="search-box">
                                        <input
                                            type="text"
                                            placeholder={t(
                                                "blogList.searchPlaceholder"
                                            )}
                                        />
                                        <button type="submit">
                                            <i class="bx bx-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="recent-listing-table">
                            <table class="eg-table2">
                                <thead>
                                    <tr>
                                        <th>{t("blogList.tableHeaders.title")}</th>
                                        <th>{t("blogList.tableHeaders.category")}</th>
                                        <th>{t("blogList.tableHeaders.author")}</th>
                                        <th>{t("blogList.tableHeaders.readTime")}</th>
                                        <th>{t("blogList.tableHeaders.status")}</th>
                                        <th>{t("blogList.tableHeaders.actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBlogs.map((blog, index) => (
                                        <tr>
                                            <td data-label="Tour Package">
                                                <div class="product-name">
                                                    <div class="img">
                                                        <img
                                                            style={{
                                                                height: "80%",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                            src={
                                                                blog.contents.find(
                                                                    (c) =>
                                                                        c.type ===
                                                                        "IMAGE" &&
                                                                        c.imageUrl
                                                                )?.imageUrl ||
                                                                "assets/img/home4/blog-card-img1.jpg"
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="product-content">
                                                        <h6>
                                                            <Link
                                                                to={`/blogs/${blog.id}`}
                                                            >
                                                                {blog.title}
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-label="Category">
                                                {
                                                    blog.blogPostCategoryDisplayName
                                                }
                                            </td>
                                            <td data-label="Owner">
                                                {blog.author}
                                            </td>
                                            <td data-label="ReadTime">
                                                {blog.readTime}
                                            </td>
                                            <td data-label="Status">
                                                <span class="confirmed">
                                                    {t("blogList.statusActive")}
                                                </span>
                                            </td>
                                            <td data-label="">
                                                <button
                                                    onClick={() => {
                                                        handleEditBlog(blog.id);
                                                    }}
                                                    className="primary-btn1 p-2 me-2"
                                                >
                                                    <i class="bi bi-pencil-square"></i>
                                                </button>
                                                <button
                                                    className="primary-btn1 p-2"
                                                    style={{
                                                        backgroundColor: "#aaa",
                                                    }}
                                                >
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination-area">
                                <ul className="paginations">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li
                                            key={i + 1}
                                            className={`page-item ${currentPage === i + 1
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handlePageChange(i + 1)
                                            }
                                        >
                                            <a href="#">{i + 1}</a>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="paginations-buttons">
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage - 1
                                                )
                                            }
                                        >
                                            {t("blogList.pagination.prev")}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                        >
                                            {t("blogList.pagination.next")}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogListPage;
