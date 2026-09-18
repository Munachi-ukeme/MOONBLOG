import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./BlogDetails.module.css";

const BlogDetails = () => {
  const { id } = useParams(); // gets the blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Unified loading and error wrappers matching the deep site layout canvas
  if (loading) return <div className={style.statusContainer}><p className={style.statusText}>Loading article details...</p></div>;
  if (error) return <div className={style.statusContainer}><p className={style.statusText}>Error: {error}</p></div>;
  if (!blog) return <div className={style.statusContainer}><p className={style.statusText}>No blog post found.</p></div>;

  return (
    <div className={style.blogContainer}>
      {/* Article Header Context Meta */}
      <header className={style.articleHeader}>
        <span className={`${style.categoryTag} ${style[blog.category]}`}>
          {blog.category}
        </span>
        <h1 className={style.blogTitle}>{blog.title}</h1>
        
        {/* Author Bylines and Dates combined onto a clean editorial line */}
        <div className={style.blogAuthor}>
          <div className={style.avatar}>
            {(blog.author?.userName || "M").charAt(0).toUpperCase()}
          </div>
          <span className={style.metaText}>
            Written by <strong>{blog.author?.userName || "Anonymous"}</strong> — {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recent"}
          </span>
        </div>
      </header>

      {/* Main Narrative Body Text */}
      <article className={style.blogBody}>{blog.body}</article>

      {/* Functional Text-Link Back Navigation Buttons */}
      <footer className={style.backButtonsContainer}>
        <Link to="/#latest" className={style.redirectLink}>
          ← Back to Stories
        </Link>
        <Link to="/userBlogs" className={style.redirectLink}>
          View All Blogs →
        </Link>
      </footer>
    </div>
  );
};

export default BlogDetails;
