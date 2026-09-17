import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from "./Uhome.module.css";
import image from "../assets/UserImage.png";

const Uhome = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

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

  const filteredBlogs = category
    ? blogs.filter((blog) => blog.category === category)
    : blogs;

  return (
    <div className={style.pageWrapper}>
      {/* Editorial Split Hero Section */}
      <section className={style.hero}>
        <div className={style.heroContent}>
          <div className={style.textContainer}>
            <h1 className={style.heroTitle}>Welcome to Moon Blog</h1>
            <p className={style.heroSubtitle}>
              Discover professional insights, perspectives, and guides across Tech, Business and Education.
            </p>
            <button className={style.heroBtn} onClick={scrollToLatest}>
              Explore Stories
            </button>
          </div>

          <div className={style.imageContainer}>
            <div className={style.imageFrame}>
              <img src={image} alt="Professional working on laptop" className={style.image} />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Feed Section */}
      <section id="latest" className={style.cardContainer}>
        <div className={style.sectionHeader}>
          <h2 className={style.title}>Latest Stories</h2>
        </div>

        {error && <p className={style.errorMessage}>Error: {error}</p>}

        <div className={style.blogList}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <article key={blog._id} className={style.blogCard}>
                <div className={style.cardContent}>
                  {/* Category & Date Meta Row */}
                  <div className={style.metaRow}>
                    <span className={`${style.categoryTag} ${style[blog.category]}`}>
                      {blog.category}
                    </span>
                    <span className={style.blogDate}>
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
                    </span>
                  </div>

                  {/* Headline & Body Summary */}
                  <h3 className={style.blogTitle}>{blog.title}</h3>
                  <p className={style.blogBodyText}>
                    {blog.body ? `${blog.body.substring(0, 160)}...` : "Click below to read the full published context of this entry..."}
                  </p>
                </div>

                {/* Footer Meta Row */}
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
          ) : (
            <p className={style.emptyMessage}>
              No articles found in the {category} category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Uhome;
