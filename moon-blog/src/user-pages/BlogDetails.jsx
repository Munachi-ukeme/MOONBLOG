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

  // Loading, error, and empty state handles wrapped in the style container for uniform appearance
  if (loading) return <div className={style.blogContainer}><p className={style.statusText}>Loading blog...</p></div>;
  if (error) return <div className={style.blogContainer}><p className={style.statusText}>Error: {error}</p></div>;
  if (!blog) return <div className={style.blogContainer}><p className={style.statusText}>No blog found.</p></div>;

  return (
    /* Changed container classes to use style modules for consistent layout mapping */
    <div className={style.blogContainer}>
      <h2 className={style.blogTitle}>{blog.title}</h2>

      <p className={style.blogCategory}>
        <strong>Category:</strong> {blog.category}
      </p>
      
      <div className={style.blogBody}>{blog.body}</div>

      <p className={style.blogAuthor}>
        <strong>By:</strong> {blog.author?.userName} |{" "}
        <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}</em>
      </p>

      {/* Structured flexbox configuration for desktop layouts */}
      <div className={style.backButtons}>
        <Link to="/#latest">
          <button className={style.redirect}>← Back to Home</button>
        </Link>
        <Link to="/userBlogs">
          <button className={style.redirect}>← Back to All Blogs</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
