import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import style from  "./Navbar.module.css";
function AdminNavbar() {
  return (
    <div>
      <header className={style.navbar}>
        <a href="/myblogs"><h1>MoonBlog</h1></a>

        <nav className={style.navs}>
          <Link to="/new-post">Create Post</Link>
          <Link to="/myblogs">MyBlogs</Link>
          <Link to="/logout">Logout</Link>

        </nav>
      </header>
    </div>
  )
}

export default AdminNavbar;
