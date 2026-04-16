import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import style from "./Ublogs.module.css";

const Ublogs = ({ category }) => {
  console.log("Category received:", category);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
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
  }, [category]); //refetch when category changes

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  if (blogs.length === 0) return <p>No blogs available yet. Check back soon!</p>;

 
  return (
    <div className={style.cardcontainer}>
      {/* pass setCategory to Navbar */}
      <h2 className={style.title}>All Blogs {category && `-${category}`}</h2>

      <div className={style.bloglist}>
      {blogs.map((blog) => (
        <div key = {blog._id} className={style.blogcard}>
          <h3 className={style.blogtitle}>{blog.title}</h3>
          <p className={style.blogauthor}>
            <strong>By:</strong> {blog.author?.userName} | <em>{new Date(blog.createdAt).toDateString()}</em>
            
          </p>

          <p className={style.blogbody}>{blog.body.substring(0, 300)}...</p>

          <Link to={`/blogDetails/${blog._id}`}>
          <button className={style.readmore}>Read More</button>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Ublogs;
