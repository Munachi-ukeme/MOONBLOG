import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from "./MyBlog.module.css";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/delete`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        setIsSuccess(true);
        setStatusMsg("Blog deleted successfully! 🗑️");
        
        setTimeout(() => setStatusMsg(""), 3000);
      } else {
        setIsSuccess(false);
        setStatusMsg("Error deleting blog from database");
      }
    } catch (error) {
      setIsSuccess(false);
      setStatusMsg("Something went wrong. Connection failed.");
    }
  };

  if (loading) {
    return (
      <div className={style.pageWrapper}>
        <p className={style.loading}>Updating dashboard entries...</p>
      </div>
    );
  }

  return (
    <div className={style.pageWrapper}>
      <div className={style.headerContainer}>
        <h2 className={style.myblog}>Admin Dashboard: Manage Blogs</h2>
        {statusMsg && (
          <p className={isSuccess ? style.successToast : style.errorToast}>
            {statusMsg}
          </p>
        )}
      </div>

      {blogs.length === 0 ? (
        <p className={style.emptyblog}>No blog entries found in your database.</p>
      ) : (
        <ul className={style.bloglist}>
          {blogs.map((blog) => (
            <li key={blog._id} className={style.blogcard}>
              <div className={style.cardContent}>
                <div className={style.metaHeader}>
                  <span className={`${style.categoryTag} ${style[blog.category]}`}>{blog.category}</span>
                </div>
                <h3 className={style.blogTitle}>{blog.title}</h3>
                <p className={style.blogSnippet}>
                  {blog.body ? `${blog.body.substring(0, 140)}...` : "Empty blog body content..."}
                </p>
              </div>

              <div className={style.cardFooter}>
                <p className={style.metaText}>
                  By <strong>{blog.author?.userName || "Admin"}</strong> <br />
                  <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}</em>
                </p>
                
                <div className={style.actionButtons}>
                  <Link to={`/edit/${blog._id}`} className={style.editLink}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(blog._id)} className={style.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBlogs;
