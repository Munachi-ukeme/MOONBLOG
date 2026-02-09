import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
     const {id}= useParams(); // this get the blog ID from URL
     const [blog, setBlog] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
        const fetchBlog = async () => {
            try{
                const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
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
        <h2>{blog.title}</h2>

        <p> <strong>Category:</strong> {blog.category} </p>
        <div> {blog.body} </div>

        <p>
            <strong> By: </strong> {blog.author} | {" "}
            <em>{new Date(blog.date).toDateString()}</em>
        </p>

       {/* ✅ Back buttons */}
      <div className="back-buttons">
        <Link to="/#latest">
          <button>← Back to Latest Blogs</button>
        </Link>
        <Link to="/userBlogs">
          <button>← Back to All Blogs</button>
        </Link>
        </div>
      
    </div>
  );
};

export default BlogDetails;

