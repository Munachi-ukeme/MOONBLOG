import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./Navbar.module.css";

function AdminNavbar() {
  // State tracking logic managing mobile navigation layout toggles
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header className={style.navbarContainer}>
        {/* Portal Dashboard Brand Identifier Anchor */}
        <Link to="/myblogs" onClick={closeMenu} className={style.brandLink}>
          <h1 className={style.brandName}>MoonBlog <span className={style.adminTag}>Admin</span></h1>
        </Link>

        {/* Hamburger Icon Trigger Node for Touch Screens */}
        <div 
          className={`${style.hamburger} ${isOpen ? style.active : ""}`} 
          onClick={toggleMenu}
        >
          <span className={style.bar}></span>
          <span className={style.bar}></span>
          <span className={style.bar}></span>
        </div>

        {/* Action Controls Navigation Cluster */}
        <nav className={`${style.navs} ${isOpen ? style.navOpen : ""}`}>
          <Link to="/new-post" onClick={closeMenu}>Create Post</Link>
          <Link to="/myblogs" onClick={closeMenu}>MyBlogs</Link>
          <Link to="/logout" onClick={closeMenu} className={style.logoutBtn}>Logout</Link>
        </nav>
      </header>
    </div>
  );
}

export default AdminNavbar;
