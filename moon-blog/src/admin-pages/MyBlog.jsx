import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from "./MyBlog.module.css";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.log("Error fetching blogs:", error);
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
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/delete`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
      });

      if (response.ok) {
            // Remove deleted blog from state
            setBlogs(blogs.filter((blog) => blog._id !==id));
            alert("Blog deleted successfully!");
      } else {
        alert("Error deleting blog");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (loading) return <p className={style.loading}>Loading blogs...</p>;

  return (
    <div>
      <h2 className={style.myblog}>My Blogs</h2>
      {blogs.length === 0 ? (
        <p className={style.emptyblog}>No blogs found.</p>
      ) : (
        <ul>
          <div className={style.bloglist}>
          {blogs.map((blog) => (
            <li key={blog._id} className={style.blogcard}>
              <h3>{blog.title}</h3>
              <p>Category: {blog.category}</p>
              <p>{blog.body}</p>

              <p className={style.category}>
              <strong>By:</strong> {blog.author?.userName} | {""}
              <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}</em>
              </p>
              
              <Link to={`/edit/${blog._id}`}>Edit</Link>
              {" | "}
              <button onClick={() => handleDelete(blog._id)} className={style.button}>Delete</button>
            </li>
          ))}
           </div>
        </ul>
       
      )}
    </div>
  );
}

export default MyBlogs;