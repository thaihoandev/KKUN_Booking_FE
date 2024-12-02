import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as BlogService from "../../../services/BlogService";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import BlogSidebar from "../../../components/Blog/BlogSidebar/BlogSidebar";
import { useTranslation } from "react-i18next";

function BlogDetails() {
    const { t } = useTranslation();

    const { postId } = useParams();
    const [blog, setBlog] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [navigationPosts, setNavigationPosts] = useState({
        prevPost: null,
        nextPost: null,
    });

    const navigate = useNavigate();
    const handleOpenBlogDetail = (postId) => {
        navigate(`/blogs/${postId}`);
        window.scrollTo(0, 0);
    };
    const mutationBlogPostAll = useMutation(
        () => BlogService.getAllBlogPosts(),
        {
            onSuccess: (data) => setBlogs(data),
            onError: (err) => toast.error(err.message),
        }
    );

    const mutationGetBlogPost = useMutation(
        (postId) => BlogService.getBlogPostById(postId),
        {
            onSuccess: (data) => setBlog(data),
            onError: (err) => toast.error(err.message),
        }
    );
    const mutationBlogNavigation = useMutation(
        (postId) => BlogService.getBLogNavigation(postId),
        {
            onSuccess: (data) => {
                setNavigationPosts(data);
            },
            onError: (err) => toast.error(err.message),
        }
    );
    useEffect(() => {
        mutationGetBlogPost.mutate(postId);
        mutationBlogPostAll.mutate();
        mutationBlogNavigation.mutate(postId);
    }, [postId]);

    return (
        <>
            <ToastContainer />
            <div className="blog-details-section mt-3">
                <div className="container">
                    <div className="row g-lg-4 gy-5 justify-content-center">
                        <div className="col-lg-8">
                            <div className="post-thumb mb-30">
                                <img
                                    style={{
                                        width: "100%",
                                        height: "460px",
                                        objectFit: "cover",
                                    }}
                                    src={
                                        (blog.contents &&
                                            blog.contents.find(
                                                (content) =>
                                                    content.type === "IMAGE" &&
                                                    content.imageUrl && // Kiểm tra imageUrl khác null
                                                    content.imageUrl.trim() !==
                                                        "" // Kiểm tra imageUrl không phải chuỗi rỗng
                                            )?.imageUrl) ||
                                        "assets/img/innerpage/blog-standard-img2.jpg"
                                    }
                                    alt={blog.title}
                                />
                            </div>
                            <div className="post-title mb-40">
                                <h1>{blog.title}</h1>
                            </div>
                            <div className="blog-meta two mb-50">
                                <div className="author-area">
                                    <div className="author-img">
                                        <img
                                            src="assets/img/innerpage/blog-meta-author-img.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="author-content">
                                        <h6>
                                            {t("by")},{" "}
                                            <a href="#">{blog.author}</a>
                                        </h6>
                                    </div>
                                </div>
                                <ul>
                                    <li>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="16"
                                            viewBox="0 0 12 16"
                                        >
                                            <path d="..." />
                                        </svg>
                                        {blog.views} {t("views")}
                                    </li>
                                    <li>
                                        {blog.readTime} {t("timeRead")}
                                    </li>
                                </ul>
                            </div>

                            {/* Hiển thị nội dung của bài viết */}
                            {blog.contents &&
                                blog.contents.map((content, index) => {
                                    if (content.type === "PARAGRAPH") {
                                        return (
                                            <p
                                                key={index}
                                                className={
                                                    index === 0
                                                        ? "paragraph first-para"
                                                        : "paragraph"
                                                }
                                            >
                                                {content.content}
                                            </p>
                                        );
                                    } else if (content.type === "IMAGE") {
                                        return (
                                            <div
                                                key={index}
                                                className="post-thumb mt-4 mb-30"
                                            >
                                                <img
                                                    style={{
                                                        width: "100%",
                                                        height: "380px",
                                                        objectFit: "cover",
                                                    }}
                                                    src={content.imageUrl}
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    } else if (content.type === "QUOTE") {
                                        return (
                                            <blockquote key={index}>
                                                <div class="quoat-icon">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="26"
                                                        height="18"
                                                        viewBox="0 0 26 18"
                                                    >
                                                        <path
                                                            d="M20.6832 6.05443L20.4534 6.62147L21.0549 6.73371C23.6453 7.21714 25.5 9.46982 25.5 12.0337C25.5 13.573 24.8343 15.0529 23.6667 16.09C22.4982 17.1192 20.9207 17.6286 19.3329 17.4722C16.4907 17.1844 14.2846 14.6588 14.3404 11.7032C14.4201 7.67759 15.8945 5.07458 17.6289 3.38578C19.3761 1.68459 21.4158 0.884497 22.6452 0.531618L22.6591 0.527628L22.6728 0.52284C22.7152 0.507954 22.7704 0.5 22.8713 0.5C23.1425 0.5 23.3799 0.624329 23.5265 0.85037L23.5277 0.852289C23.7128 1.13485 23.6857 1.4981 23.4524 1.75822L23.4523 1.75827C22.2163 3.13698 21.2806 4.57999 20.6832 6.05443Z"
                                                            stroke="white"
                                                        ></path>
                                                        <path
                                                            d="M6.84136 6.05442L6.61159 6.62147L7.21303 6.73371C9.80353 7.21714 11.6582 9.46983 11.6582 12.0337C11.6582 13.573 10.9925 15.0529 9.82487 16.09C8.65615 17.1194 7.07865 17.6285 5.50008 17.4722C2.67976 17.1842 0.498651 14.7207 0.498651 11.8126V11.6985C0.579458 7.67556 2.05336 5.07393 3.7871 3.38579C5.53424 1.6846 7.574 0.884504 8.8034 0.531628L8.81731 0.527636L8.83096 0.522848C8.8734 0.507959 8.92859 0.500008 9.02944 0.500008C9.3007 0.500008 9.53807 0.624359 9.68459 0.850338L9.6859 0.852327C9.87103 1.13488 9.84386 1.49811 9.61059 1.75823L9.61054 1.75828C8.37446 3.13698 7.43881 4.57999 6.84136 6.05442Z"
                                                            stroke="white"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <p>{content.content}</p>
                                                <cite>
                                                    {content.authorQuote}
                                                </cite>
                                            </blockquote>
                                        );
                                    }
                                    return null;
                                })}

                            {/* Các thành phần khác của Blog Details */}
                            <div class="tag-and-social-area mb-30">
                                <div class="bolg-tag">
                                    {blog.blogPostCategoryDisplayName && (
                                        <ul class="tag-list">
                                            <li>
                                                <a href="# ">
                                                    {t(
                                                        `blogCategories.${blog.blogPostCategory}`
                                                    )}
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <div class="social-area">
                                    <h6>Share On:</h6>
                                    <ul class="social-link">
                                        <li>
                                            <a href="https://www.facebook.com/">
                                                <i class="bx bxl-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="12"
                                                    fill="currentColor"
                                                    class="bi bi-twitter-x"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.pinterest.com/">
                                                <i class="bx bxl-pinterest-alt"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/">
                                                <i class="bx bxl-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row mb-100">
                                <div class="col-lg-12">
                                    <div className="details-navigation">
                                        {navigationPosts.prevPost && (
                                            <div className="single-navigation">
                                                <Link
                                                    onClick={() => {
                                                        handleOpenBlogDetail(
                                                            navigationPosts
                                                                .prevPost.id
                                                        );
                                                    }}
                                                    className="arrow"
                                                >
                                                    <svg
                                                        width="9"
                                                        height="15"
                                                        viewBox="0 0 8 13"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z"></path>
                                                    </svg>
                                                </Link>
                                                <div className="content">
                                                    <Link
                                                        onClick={() => {
                                                            handleOpenBlogDetail(
                                                                navigationPosts
                                                                    .prevPost.id
                                                            );
                                                        }}
                                                    >
                                                        {t("prePost")}
                                                    </Link>
                                                    <h6>
                                                        <Link
                                                            onClick={() => {
                                                                handleOpenBlogDetail(
                                                                    navigationPosts
                                                                        .prevPost
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            {
                                                                navigationPosts
                                                                    .prevPost
                                                                    .title
                                                            }
                                                        </Link>
                                                    </h6>
                                                </div>
                                            </div>
                                        )}
                                        {navigationPosts.nextPost && (
                                            <div className="single-navigation two text-end">
                                                <div className="content">
                                                    <Link
                                                        onClick={() => {
                                                            handleOpenBlogDetail(
                                                                navigationPosts
                                                                    .nextPost.id
                                                            );
                                                        }}
                                                    >
                                                        {t("nextPost")}
                                                    </Link>
                                                    <h6>
                                                        <Link
                                                            onClick={() => {
                                                                handleOpenBlogDetail(
                                                                    navigationPosts
                                                                        .nextPost
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            {
                                                                navigationPosts
                                                                    .nextPost
                                                                    .title
                                                            }
                                                        </Link>
                                                    </h6>
                                                </div>
                                                <Link
                                                    onClick={() => {
                                                        handleOpenBlogDetail(
                                                            navigationPosts
                                                                .nextPost.id
                                                        );
                                                    }}
                                                    className="arrow"
                                                >
                                                    <svg
                                                        width="9"
                                                        height="15"
                                                        viewBox="0 0 8 13"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <BlogSidebar blogs={blogs}></BlogSidebar>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetails;
