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
      {/* Dynamic title bar that adjusts cleanly */}
      <h2 className={style.title}>
        All Blogs {category ? `— ${category}` : "— Global"}
      </h2>

      {/* Styled using pure CSS modules instead of inline attributes */}
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
            No blogs available in this category yet. Check back soon!
          </p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className={style.blogCard}>
              <h3 className={style.blogTitle}>{blog.title}</h3>
              
              <p className={style.blogAuthor}>
                <strong>By:</strong> {blog.author?.userName || "Anonymous"} |{" "}
                <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No Date"}</em>
              </p>

              <p className={style.blogBody}>
                {blog.body ? `${blog.body.substring(0, 220)}...` : "Empty post body..."}
              </p>

              <Link to={`/blogDetails/${blog._id}`}>
                <button className={style.readMore}>Read More</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ublogs;
