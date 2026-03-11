import { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Unavbar.module.css";
import { AuthContext } from "../user-pages/AuthContext"; // ✅ import context

const Unavbar = ({ onCategoryChange }) => {
  const { isAuthenticated, logout } = useContext(AuthContext); // ✅ use context

  let navLinks;

  if (!isAuthenticated) {
    // USER is NOT logged in
    navLinks = (
      <>
        <Link to="/">Home</Link>
        <Link to="/userAbout">About</Link>
        <Link to="/userBlogs">Blogs</Link>
        <Link to="/userLogin">Login</Link>
        <Link to="/userSignup">Signup</Link>
      </>
    );
  } else {
    // USER is logged in
    navLinks = (
      <>
        <Link to="/userBlogs">Home</Link>
        <Link to="/userAbout">About</Link>
        <Link to="/userBlogs">Blogs</Link>
        <button onClick={logout} className={style.logoutBtn}>Logout</button> {/* ✅ uses context logout */}
  
      </>
    );
  }

  return (
    <div>
      <header className={style.navContainer}>
        <Link to="/">
          <h1 className={style.webName}>Moon Blog</h1>
        </Link>

        <nav className={style.links}>
          {navLinks}

          {/* Category Dropdown */}
          <select onChange={(e) => onCategoryChange(e.target.value)}>
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
