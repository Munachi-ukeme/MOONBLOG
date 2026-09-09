import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from "./Uhome.module.css";
import image from "../assets/UserImage.png";

const Uhome = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Smooth scroll logic down to the feed target
  const scrollToLatest = () => {
    const latestSection = document.getElementById("latest");
    if (latestSection) {
      latestSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();

        // Sort by date (newest first) and display top 6 entries
        const latestBlogs = [...data]
          .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
          .slice(0, 6);

        setBlogs(latestBlogs);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlogs();
  }, []);

  // Filter application layers tracking parent category options
  const filteredBlogs = category
    ? blogs.filter((blog) => blog.category === category)
    : blogs;

  return (
    <div className={style.pageWrapper}>
      <section className={style.hero}>
        <div className={style.heroContent}>
          <div className={style.textContainer}>
            <h1 className={style.heroTitle}>Welcome to Moon Blog</h1>
            <p className={style.heroSubtitle}>
              Discover blogs across Tech, Business and Education.
            </p>
            <button className={style.heroBtn} onClick={scrollToLatest}>
              Explore
            </button>
          </div>

          <div className={style.imageContainer}>
            {/* The image is wrapped in a dynamic layout node for masking */}
            <div className={style.imageFrame}>
              <img src={image} alt="Professional working on laptop" className={style.image} />
            </div>
          </div>
        </div>
      </section>

      {/* Latest blogs display section */}
      <div id="latest" className={style.cardContainer}>
        <h2 className={style.title}>Latest Blogs</h2>

        {error && <p className={style.errorMessage}>Error: {error}</p>}

        <div className={style.blogList}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog._id} className={style.blogCard}>
                <div>
                  <h3 className={style.blogTitle}>{blog.title}</h3>
                  <p className={style.blogCategory}><strong>Category:</strong> {blog.category}</p>
                  <p className={style.blogBody}>
                    {blog.body ? `${blog.body.substring(0, 220)}...` : "No Content.. Check Later"}
                  </p>
                </div>

                <div>
                  <p className={style.blogAuthor}>
                    <strong>By:</strong> {blog.author?.userName || "Anonymous"} <br />
                    <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}</em>
                  </p>
                  <Link to={`/blogDetails/${blog._id}`}>
                    <button className={style.readMore}>Read More</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className={style.emptyMessage}>
              No blogs found in the "{category}" category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uhome;
