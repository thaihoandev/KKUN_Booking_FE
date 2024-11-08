import React from "react";
import { Link, useNavigate } from "react-router-dom";

function BlogSidebar({ blogs }) {
    const navigate = useNavigate();
    const handleOpenBlogDetail = (postId) => {
        navigate(`/blogs/${postId}`);
        window.scrollTo(0, 0);
    };
    return (
        <div class="sidebar-area">
            <div class="single-widget mb-30">
                <h5 class="widget-title">Search Here</h5>
                <form>
                    <div class="search-box">
                        <input type="text" placeholder="Search Here" />
                        <button type="submit">
                            <i class="bx bx-search"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div class="single-widget mb-30">
                <h5 class="widget-title">Categories</h5>
                <ul class="category-list">
                    <li>
                        <a href="blog-sidebar.html">
                            Cultural Exploration
                            <span>(20)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            Adventure Safari
                            <span>(35)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            Nature Excursion
                            <span>(25)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            Cruise Voyage
                            <span>(18)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            City Discovery
                            <span>(06)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            Educational Journey
                            <span>(08)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            Luxury Retreat
                            <span>(15)</span>
                        </a>
                    </li>
                    <li>
                        <a href="blog-sidebar.html">
                            Photography Expedition
                            <span>(25)</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="single-widget mb-30">
                <h5 className="widget-title">Recent Post</h5>
                {blogs.map((blog) => (
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
                                            (c) => c.type === "IMAGE"
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
                <h5 class="widget-title">Tags</h5>
                <ul class="tag-list">
                    <li>
                        <a href="blog-grid.html ">Adventure</a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">City Tour</a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Road Trip </a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Tourism</a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Wildlife </a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Nature Excursion</a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Photography</a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Cruise</a>
                    </li>
                    <li>
                        <a href="blog-grid.html ">Cultural</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BlogSidebar;
