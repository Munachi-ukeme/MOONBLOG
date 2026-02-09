import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Unavbar= ({ isAuthenticated, handleSignout, onCategoryChange}) => {

  let navLinks;

  //use "if" conditions to decide what links to show
  if (!isAuthenticated){
    //USER is NOT logged in
    navLinks = (
      <>
      <Link to="/">Home</Link>
      <Link to="/userAbout"> About</Link>
      <Link to="/userBlogs">Blogs</Link>
      <Link to="/userLogin">Login</Link>
      <Link to="/userSignup">SignUp</Link>
      </>
    );
  } else {
    //user is logged in
    navLinks =(
      <>
      <Link to="/">Home</Link>
      <Link to="/userAbout">About</Link>
      <Link to="/userBlogs">Blogs</Link>
      <button onClick={handleSignout}>Logout</button>
      </>
    );
  }
  return (
    <div>
      <header>
        <Link to="/"><h1>Moon Blog</h1></Link>

        <nav>
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
