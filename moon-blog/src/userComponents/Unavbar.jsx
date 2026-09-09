import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Unavbar.module.css";

const Unavbar = ({ onCategoryChange }) => {
  // State to track if the mobile hamburger menu is open
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header className={style.navContainer}>
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1 className={style.webName}>Moon Blog</h1>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div 
          className={`${style.hamburger} ${isOpen ? style.active : ""}`} 
          onClick={toggleMenu}
        >
          <span className={style.bar}></span>
          <span className={style.bar}></span>
          <span className={style.bar}></span>
        </div>

        {/* Navigation Links */}
        <nav className={`${style.links} ${isOpen ? style.navOpen : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/userAbout" onClick={closeMenu}>About</Link>
          <Link to="/userBlogs" onClick={closeMenu}>Blogs</Link>
          
          {/* Category Dropdown (Now always available to public readers) */}
          <select 
            onChange={(e) => {
              onCategoryChange(e.target.value);
              closeMenu();
            }}
            className={style.categorySelect}
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
        </nav>
      </header>
    </div>
  );
};

export default Unavbar;

