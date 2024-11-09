import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as BlogService from "../../../services/BlogService";
import { toast, ToastContainer } from "react-toastify";
import BlogSidebar from "../../../components/Blog/BlogSidebar/BlogSidebar";
import BlogList from "../../../components/Blog/BlogList/BlogList";
import { useSelect } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../../store/UserSlide";
import { useLocation, useNavigate } from "react-router-dom";

function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const mutationBlogPostAll = useMutation(
        () => {
            return BlogService.getAllBlogPosts();
        },
        {
            onSuccess: (data) => {
                setBlogs(data);
            },
            onError: (err) => {
                toast.error(err.message);
            },
        }
    );
    const handleClickPost = () => {
        if (user.id) {
            // Nếu user đã đăng nhập (có ID)
            navigate("/blogs/post"); // Điều hướng đến trang đăng bài
        } else {
            // Nếu chưa đăng nhập
            dispatch(openLoginModal()); // Mở modal đăng nhập
        }
    };
    useEffect(() => {
        mutationBlogPostAll.mutate();
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (location.state && location.state.message) {
            toast.success(location.state.message);

            // Xóa `state` sau khi hiển thị toast
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);
    return (
        <>
            <ToastContainer />
            <div className="blog-sidebar-section pt-120 mb-120">
                <div className="container">
                    <div className="row g-lg-4 gy-5">
                        <div className="col-lg-4 order-lg-1 order-2">
                            <button
                                onClick={() => {
                                    handleClickPost();
                                }}
                                className="primary-btn1 mb-3"
                            >
                                Đăng bài
                            </button>
                            <BlogSidebar blogs={blogs} />
                        </div>
                        <div className="col-lg-8 order-lg-2 order-1">
                            <BlogList blogs={blogs} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogPage;
