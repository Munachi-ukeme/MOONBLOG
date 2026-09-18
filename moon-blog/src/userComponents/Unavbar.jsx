import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Unavbar.module.css";

const Unavbar = ({ onCategoryChange }) => {
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
        {/* Brand Logo Link */}
        <Link to="/" onClick={closeMenu} className={style.brandLink}>
          <h1 className={style.webName}>Moon Blog</h1>
        </Link>

        {/* Static Hamburger Icon Trigger for Mobile Viewports */}
        <div 
          className={`${style.hamburger} ${isOpen ? style.active : ""}`} 
          onClick={toggleMenu}
        >
          <span className={style.bar}></span>
          <span className={style.bar}></span>
          <span className={style.bar}></span>
        </div>

        {/* Header Content Actions Layout Navigation */}
        <nav className={`${style.links} ${isOpen ? style.navOpen : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/userAbout" onClick={closeMenu}>About</Link>
          <Link to="/userBlogs" onClick={closeMenu}>Blogs</Link>
          
          {/* Muted Custom Category Dropdown Selector */}
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
