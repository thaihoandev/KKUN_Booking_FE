import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as BlogService from "../../../services/BlogService";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import BlogSidebar from "../../../components/Blog/BlogSidebar/BlogSidebar";

function BlogDetails() {
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
                                                    content.type === "IMAGE"
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
                                            Viết bởi,{" "}
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
                                        {blog.views} Lượt xem
                                    </li>
                                    <li>{blog.readTime} phút đọc</li>
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
                                                    {
                                                        blog.blogPostCategoryDisplayName
                                                    }
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
                                                        Bài trước đó
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
                                                        Bài kế tiếp
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
                            <div class="row">
                                <div class="comment-area" id="comment-area">
                                    <div class="comment-title">
                                        <h4>Comments (03)</h4>
                                        <div class="dash"></div>
                                    </div>
                                    <ul class="comment">
                                        <li>
                                            <div class="single-comment-area">
                                                <div class="author-img">
                                                    <img
                                                        src="assets/img/innerpage/comment-author-01.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div class="comment-content">
                                                    <div class="author-name-deg">
                                                        <h6>
                                                            Mr. Bowmik Haldar,
                                                        </h6>
                                                        <span>
                                                            05 June, 2023
                                                        </span>
                                                    </div>
                                                    <p>
                                                        However, here are some
                                                        well-regarded car
                                                        dealerships known for
                                                        their customer service,
                                                        inventory, and overall
                                                        reputation. It's always
                                                        a good idea to research
                                                        and read reviews
                                                        specific...
                                                    </p>
                                                    <div class="replay-btn">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="11"
                                                            viewBox="0 0 14 11"
                                                        >
                                                            <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                                                        </svg>
                                                        Reply (02)
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="comment-replay">
                                                <li>
                                                    <div class="single-comment-area">
                                                        <div class="author-img">
                                                            <img
                                                                src="assets/img/innerpage/comment-author-02.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div class="comment-content">
                                                            <div class="author-name-deg">
                                                                <h6>
                                                                    Jacoline
                                                                    Juie,
                                                                </h6>
                                                                <span>
                                                                    05 June,
                                                                    2023
                                                                </span>
                                                            </div>
                                                            <p>
                                                                However, here
                                                                are some
                                                                well-regarded
                                                                car dealerships
                                                                known for their
                                                                customer
                                                                service,
                                                                inventory, and
                                                                overall
                                                                reputation. It's
                                                                always a good
                                                                idea to research
                                                                and read reviews
                                                                specific...
                                                            </p>
                                                            <div class="replay-btn">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="14"
                                                                    height="11"
                                                                    viewBox="0 0 14 11"
                                                                >
                                                                    <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                                                                </svg>
                                                                Reply
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="single-comment-area">
                                                        <div class="author-img">
                                                            <img
                                                                src="assets/img/innerpage/comment-author-03.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div class="comment-content">
                                                            <div class="author-name-deg">
                                                                <h6>
                                                                    Robert
                                                                    Smith,
                                                                </h6>
                                                                <span>
                                                                    05 June,
                                                                    2023
                                                                </span>
                                                            </div>
                                                            <p>
                                                                However, here
                                                                are some
                                                                well-regarded
                                                                car dealerships
                                                                known for their
                                                                customer
                                                                service,
                                                                inventory, and
                                                                overall
                                                                reputation. It's
                                                                always a good
                                                                idea to research
                                                                and read reviews
                                                                specific...
                                                            </p>
                                                            <div class="replay-btn">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="14"
                                                                    height="11"
                                                                    viewBox="0 0 14 11"
                                                                >
                                                                    <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                                                                </svg>
                                                                Reply
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div class="single-comment-area">
                                                <div class="author-img">
                                                    <img
                                                        src="assets/img/innerpage/comment-author-04.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div class="comment-content">
                                                    <div class="author-name-deg">
                                                        <h6>Srileka Panday,</h6>
                                                        <span>
                                                            05 June, 2023
                                                        </span>
                                                    </div>
                                                    <p>
                                                        However, here are some
                                                        well-regarded car
                                                        dealerships known for
                                                        their customer service,
                                                        inventory, and overall
                                                        reputation. It's always
                                                        a good idea to research
                                                        and read reviews
                                                        specific...
                                                    </p>
                                                    <div class="replay-btn">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="11"
                                                            viewBox="0 0 14 11"
                                                        >
                                                            <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                                                        </svg>
                                                        Reply (02)
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="single-comment-area">
                                                <div class="author-img">
                                                    <img
                                                        src="assets/img/innerpage/comment-author-05.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div class="comment-content">
                                                    <div class="author-name-deg">
                                                        <h6>
                                                            Mr. Bowmik Haldar,
                                                        </h6>
                                                        <span>
                                                            05 June, 2023
                                                        </span>
                                                    </div>
                                                    <p>
                                                        However, here are some
                                                        well-regarded car
                                                        dealerships known for
                                                        their customer service,
                                                        inventory, and overall
                                                        reputation. It's always
                                                        a good idea to research
                                                        and read reviews
                                                        specific...
                                                    </p>
                                                    <div class="replay-btn">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="11"
                                                            viewBox="0 0 14 11"
                                                        >
                                                            <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                                                        </svg>
                                                        Reply (02)
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="inquiry-form mt-100">
                                        <div class="title">
                                            <h4>Leave Your Comment:</h4>
                                        </div>
                                        <form>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-inner mb-30">
                                                        <label>
                                                            Your Name* :
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Jackson Mile"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-inner mb-30">
                                                        <label>
                                                            Your Email* :
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="example@gamil.com"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-30">
                                                    <div class="form-check">
                                                        <input
                                                            class="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="contactCheck"
                                                        />
                                                        <label
                                                            class="form-check-label"
                                                            for="contactCheck"
                                                        >
                                                            Please save my name,
                                                            email address for
                                                            the next time I
                                                            comment.
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-inner mb-50">
                                                        <label>
                                                            Your Message :
                                                        </label>
                                                        <textarea placeholder="Write Something..."></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-inner">
                                                <button
                                                    class="primary-btn1 btn-hover"
                                                    type="submit"
                                                >
                                                    Post Comment
                                                    <span></span>
                                                </button>
                                            </div>
                                        </form>
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
