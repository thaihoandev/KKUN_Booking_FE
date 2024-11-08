import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as BlogService from "../../../services/BlogService";
import { toast, ToastContainer } from "react-toastify";
import BlogSidebar from "../../../components/Blog/BlogSidebar/BlogSidebar";
import BlogList from "../../../components/Blog/BlogList/BlogList";

function BlogPage() {
    const [blogs, setBlogs] = useState([]);

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

    useEffect(() => {
        mutationBlogPostAll.mutate();
    }, []);

    return (
        <>
            <ToastContainer />

            <div className="blog-sidebar-section pt-120 mb-120">
                <div className="container">
                    <div className="row g-lg-4 gy-5">
                        <div className="col-lg-4 order-lg-1 order-2">
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
