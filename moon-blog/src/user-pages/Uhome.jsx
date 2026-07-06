import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from "./Uhome.module.css";
import image from "../assets/UserImage.png";

// 1. 🚨 The component safely catches the 'category' prop here
const Uhome = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  // (Note: you have an unused const [posts, setPosts] = useState([]) here, can safely remove later)

  // Smooth scroll to latest section
  const scrollToLatest = () => {
    const latestSection = document.getElementById("latest");
    if (latestSection) {
      latestSection.scrollIntoView({behavior: "smooth"});
    }
  };

  // fetch blogs once when Home loads
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch (`${import.meta.env.VITE_API_URL}/api/blogs`);
        if (!response.ok) throw new Error ("Failed to fetch blogs");
        const data = await response.json();

        // sort by date (newest first) and take top 6
        const latestBlogs = [...data]
        .sort((a,b) => new Date (b.date) - new Date (a.date))
        .slice (0, 6);

        setBlogs(latestBlogs);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlogs();
  }, []);

  // 2. 🚨 THE FILTER LOGIC: If a category is selected, filter out anything that doesn't match.
  // If no category is selected (empty string), show all top 6 blogs.
  const filteredBlogs = category
    ? blogs.filter((blog) => blog.category === category)
    : blogs;

  return (
    <div>
      <section className={style.hero}>
        <div className={style.heroContent}>
          <div className={style.textcontainer}>
            <h1 className={style.heroTitle}>Welcome to Moon Blog</h1>
            <p className={style.heroSubtitle}>
              Discover blogs across Tech, Business and Education.
            </p>
            <button className={style.herobtn} onClick={scrollToLatest}>
              Explore
            </button>
          </div>

          <div className={style.imagecontainer}>
            <img src={image} alt="hero-image" className={style.image} />
          </div>
        </div>
      </section>

      {/* latest blogs section */}
      <div id="latest" className={style.cardcontainer}>
        <h2 className={style.title}>Latest Blogs</h2>

        {/* Show error if it exists */}
        {error && <p style={{ color: "red", textAlign: "center", fontSize: 25, fontWeight: "bolder"}}>{error}</p>}

        <div className={style.bloglist}>
          {/* 3. 🚨 LOOP OVER FILTERED DATA instead of raw blogs array */}
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog._id} className={style.blogcard}>
                <h3 className={style.blogtitle}>{blog.title}</h3>

                <p className={style.blogcategory}> <strong>Category:</strong> {blog.category}</p>
                <p className={style.blogbody}>{blog.body ? blog.body.substring(0,300) : "No Content.. Check Later"}... </p>

                <p className={style.blogauthor}>
                  <strong>By:</strong> {blog.author?.userName} | {""}
                  <em>{blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}</em>
                </p>

                <Link to={`/blogDetails/${blog._id}`}>
                  <button className={style.readmore}>Read More</button>
                </Link>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#666", padding: "20px" }}>
              No blogs found in the "{category}" category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uhome;