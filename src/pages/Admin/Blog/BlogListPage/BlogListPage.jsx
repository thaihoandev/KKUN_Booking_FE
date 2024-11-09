import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as BlogService from "../../../../services/BlogService";

function BlogListPage() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Số lượng khách sạn trên mỗi trang

    const mutationBlogs = useMutation(() => BlogService.getAllBlogPosts(), {
        onSuccess: async (data) => {
            setBlogs(data);
        },
        onError: (error) => {
            toast.error(error.message || "Đã xảy ra lỗi.");
        },
    });

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
                            <h3>Tất cả khách sạn</h3>
                        </div>
                        <div class="profile">
                            <a href="#">
                                View Profile
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                >
                                    <path d="M6.669 2.27202L0.94102 8L0 7.05898L5.72731 1.331H0.679478V0H8V7.32052H6.669V2.27202Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="recent-listing-area">
                        <div class="title-and-tab">
                            <h6>Thông tin khách sạn</h6>
                            <div class="search-area">
                                <form>
                                    <div class="search-box">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm ở đây"
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
                                        <th>Tiêu đề</th>
                                        <th>Loại bài viết</th>
                                        <th>Tác giả</th>
                                        <th>Thời gian đọc</th>
                                        <th>Trạng thái</th>
                                        <th>#</th>
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
                                                            <a href="hotel-details.html">
                                                                {blog.title}
                                                            </a>
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
                                                    {/* {hotel.stat} */}
                                                </span>
                                            </td>
                                            <td data-label=""></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination-area">
                                <ul className="paginations">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li
                                            key={i + 1}
                                            className={`page-item ${
                                                currentPage === i + 1
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
                                            Prev
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
                                            Next
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
