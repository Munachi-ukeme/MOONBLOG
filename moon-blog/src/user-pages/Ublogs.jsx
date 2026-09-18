import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./Ublogs.module.css";

const Ublogs = ({ category }) => {
  console.log("Category received:", category);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); 
        
        const url = category
          ? `/api/blogs/category/${category}`
          : `/api/blogs`;

        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [category]);

  return (
    <div className={style.cardContainer}>
      {/* Editorial Page Header Section */}
      <div className={style.pageHeader}>
        <h2 className={style.title}>
          All Blogs {category ? `— ${category}` : "— Global"}
        </h2>
      </div>

      {error && (
        <p className={style.errorMessage}>
          Error: {error}
        </p>
      )}

      <div className={style.blogList}>
        {loading ? (
          <p className={style.statusMessage}>
            Updating blog entries...
          </p>
        ) : blogs.length === 0 ? (
          <p className={`${style.statusMessage} ${style.emptyMessage}`}>
            No articles available in this category yet. Check back soon!
          </p>
        ) : (
          blogs.map((blog) => (
            <article key={blog._id} className={style.blogCard}>
              <div className={style.cardContent}>
                {/* Meta Row: Topic Tag and Publication Date */}
                <div className={style.metaRow}>
                  <span className={`${style.categoryTag} ${style[blog.category]}`}>
                    {blog.category}
                  </span>
                  <span className={style.blogDate}>
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
                  </span>
                </div>

                {/* Editorial Typography Stack */}
                <h3 className={style.blogTitle}>{blog.title}</h3>
                <p className={style.blogBody}>
                  {blog.body ? `${blog.body.substring(0, 160)}...` : "Click below to read the full published context of this entry..."}
                </p>
              </div>

              {/* Clean Footer Row with Initial Profile Badge */}
              <div className={style.cardFooter}>
                <div className={style.authorContainer}>
                  <div className={style.avatar}>
                    {(blog.author?.userName || "M").charAt(0).toUpperCase()}
                  </div>
                  <span className={style.authorName}>
                    By <strong>{blog.author?.userName || "Anonymous"}</strong>
                  </span>
                </div>

                <Link to={`/blogDetails/${blog._id}`} className={style.readLink}>
                  Read Article →
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Ublogs;
