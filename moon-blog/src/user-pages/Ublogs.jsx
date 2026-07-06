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
        // 🚨 Reset loading state to true whenever a new category is chosen
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
  }, [category]); // refetch when category changes

  return (
    <div className={style.cardcontainer}>
      {/* Dynamic title bar that adjusts beautifully without jumping */}
      <h2 className={style.title}>
        All Blogs {category ? `— ${category}` : "— Global"}
      </h2>

      {/* 🚨 FIX: Error and Loading checks are now placed right inside the content zone */}
      {error && (
        <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
          Error: {error}
        </p>
      )}

      <div className={style.bloglist}>
        {loading ? (
          // Kept inside the grid container so the navbar doesn't unmount
          <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
            Updating blog entries...
          </p>
        ) : blogs.length === 0 ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#666" }}>
            No blogs available in this category yet. Check back soon!
          </p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className={style.blogcard}>
              <h3 className={style.blogtitle}>{blog.title}</h3>
              <p className={style.blogauthor}>
                <strong>By:</strong> {blog.author?.userName || "Anonymous"} |{" "}
                <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No Date"}</em>
              </p>

              {/* Added fallback conditional safety check on .substring */}
              <p className={style.blogbody}>
                {blog.body ? `${blog.body.substring(0, 300)}...` : "Empty post body..."}
              </p>

              <Link to={`/blogDetails/${blog._id}`}>
                <button className={style.readmore}>Read More</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ublogs;