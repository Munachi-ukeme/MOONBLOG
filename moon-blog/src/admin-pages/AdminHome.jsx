import React from "react";
import AdminHomePic from "../assets/AdminHomePic.jpg";
import Login from "./Login";
import style from "./AdminHome.module.css";

function AdminHome() {
  return (
    <div className={style.portalContainer}>
      
      {/* Left Column: Authentic Admin Login Interface Hook */}
      <div className={style.portalLeft}>
        <div className={style.formWrapper}>
          <Login />
        </div>
      </div>

      {/* Right Column: Hero Showcase and Portal Brand Framing */}
      <div className={style.portalRight}>
        <div className={style.imageOverlay}></div>
        <img src={AdminHomePic} alt="Admin Portal Dashboard" className={style.portalPic} />
        <AdminWelcomeMessage />
      </div>

    </div>
  );
}

export default AdminHome;

/* Consolidated single welcoming module for clean presentation layout lines */
function AdminWelcomeMessage() {
  return (
    <div className={style.welcomeMessage}>
      <h2 className={style.welcomeHeader}>Welcome to Admin Portal</h2>
      <p className={style.welcomeSubheader}>Manage your blogs, updates, and platform layout parameters with ease.</p>
    </div>
  );
}
