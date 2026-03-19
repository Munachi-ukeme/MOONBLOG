import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import style from "./BlogDetails.module.css";

const BlogDetails = () => {
     const {id}= useParams(); // this get the blog ID from URL
     const [blog, setBlog] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
        const fetchBlog = async () => {
            try{
                const response = await fetch(`/api/blogs/${id}`);
                if (!response.ok){
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

     if (loading) return <p>Loading blog...</p>;
     if (error) return <p>Error: {error}</p>;
     if (!blog) return <p>No blog found.</p>;
  return ( 

    <div className="blog-details">
        <h2 className={style.blogTitle}>{blog.title}</h2>

        <p className={style.blogCategory}> <strong>Category:</strong> {blog.category} </p>
        <div className={style.blogBody}> {blog.body} </div>

        <p className={style.blogAuthor}>
            <strong> By: </strong> {blog.author?.userName} |{""}
            <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}</em>
        </p>

       {/* ✅ Back buttons */}
      <div className="back-buttons">
        <Link to="/#latest">
          <button className={style.redirect}>← Back to Home</button>
        </Link>
        <Link to="/userBlogs">
          <button className={style.redirects}>← Back to All Blogs</button>
        </Link>
        </div>
      
    </div>
  );
};

export default BlogDetails;

