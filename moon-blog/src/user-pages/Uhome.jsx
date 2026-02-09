import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from "./Uhome.module.css";
import image from "../assets/UserImage.png";

const mockBlogs = [
  { id: 1,
    title: "First Blog Post",
    category: "Tech",
    author: "Munachi",
    date: "2026-01-24",
    body: "Lorem ipsum dolor sit amet..Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, officia. Possimus laboriosam, dolorum dolore pariatur expedita incidunt necessitatibus alias? Aut dignissimos blanditiis id quod obcaecati in inventore ad dolorum natus corporis assumenda sed quasi explicabo laborum cum ipsum accusantium quam labore qui perspiciatis, facilis soluta quos. Nam beatae, aut tenetur nisi rerum repellendus excepturi placeat earum assumenda quibusdam nesciunt tempore, temporibus amet vitae. Consequatur, nulla! Molestiae, nulla nostrum. Suscipit magnam laboriosam aspernatur, nihil ullam error quasi pariatur. Enim quaerat eveniet quis veniam harum delectus beatae fugiat, velit eos repellendus non magni ullam nam similique quos quisquam sapiente voluptates. Tenetur, enim.." },
  { id: 2,
    title: "First Blog Post",
    category: "Tech",
    author: "Munachi",
    date: "2026-01-24",
    body: "Lorem ipsum dolor sit amet..." },
  { id: 3,
    title: "First Blog Post",
    category: "Tech",
    author: "Munachi",
    date: "2026-01-24",
    body: "Lorem ipsum dolor sit amet..." },
  { id: 4,
    title: "First Blog Post",
    category: "Tech",
    author: "Munachi",
    date: "2026-01-24",
    body: "Lorem ipsum dolor sit amet..Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, officia. Possimus laboriosam, dolorum dolore pariatur expedita incidunt necessitatibus alias? Aut dignissimos blanditiis id quod obcaecati in inventore ad dolorum natus corporis assumenda sed quasi explicabo laborum cum ipsum accusantium quam labore qui perspiciatis, facilis soluta quos. Nam beatae, aut tenetur nisi rerum repellendus excepturi placeat earum assumenda quibusdam nesciunt tempore, temporibus amet vitae. Consequatur, nulla! Molestiae, nulla nostrum. Suscipit magnam laboriosam aspernatur, nihil ullam error quasi pariatur. Enim quaerat eveniet quis veniam harum delectus beatae fugiat, velit eos repellendus non magni ullam nam similique quos quisquam sapiente voluptates. Tenetur, enim.." },
  { id: 5,
    title: "First Blog Post",
    category: "Tech",
    author: "Munachi",
    date: "2026-01-24",
    body: "Lorem ipsum dolor sit amet..." },
  { id: 6,
    title: "First Blog Post",
    category: "Tech",
    author: "Munachi",
    date: "2026-01-24",
    body: "Lorem ipsum dolor sit amet..." },
   ];


const Uhome = () => {
  const [blogs, setBlogs] = useState([]);

  // Smooth scroll to latest section
  const scrollToLatest = () =>{
    const latestSection = document.getElementById("latest");
    if (latestSection) {
      latestSection.scrollIntoView({behavior: "smooth"});
    }
  };

  // //fetch blogs once when Home loads
  // useEffect(() => {
  //   const fetchBlogs = async () =>{
  //     try{
  //       const response = await fetch ("http://localhost:5000/api/blogs");
  //       if (!response.ok) throw new Error ("Failed to fetch blogs");
  //       const data = await response.json();

  //       //sort by date (newest first) and take top 6
  //       const latestBlogs = [...data]
  //       .sort((a,b) => new Date (b.date) - new Date (a.date))
  //       .slice (0, 6);

  //       setBlogs(latestBlogs);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };
  //   fetchBlogs();
  // }, []);

  useEffect (()=>{
    setBlogs(mockBlogs);
  });

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

        <div className={style.bloglist}>
        {blogs.map((blog) => (
          <div key={blog._id} className={style.blogcard}>
            <h3 className={style.blogtitle}>{blog.title}</h3>

             <p className={style.blogcategory}> <strong>Category:</strong> {blog.category}</p>
            <p className={style.blogbody}>{blog.body ? blog.body.substring(0,300) : "No Content.. Check Later"}... </p>

            <p className={style.blogauthor}>
              <strong>By:</strong> {blog.author} | {""}
              <em>{blog.date ? new Date(blog.date).toDateString() : "No date"}</em>
            </p>

            <Link to={`/blogDetails/${blog._id}`}>
            <button className={style.readmore}>Read More</button>
            </Link>
          </div>
        ))}
         </div>
      </div>
    </div>
  );
};

export default Uhome;

