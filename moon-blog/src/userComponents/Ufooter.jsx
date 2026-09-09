import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaRegCopyright } from "react-icons/fa";
import style from "./Ufooter.module.css";

const Ufooter = () => {
  const [newsLetter, setNewsLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newsLetter.trim()) return;
    console.log("Subscribe with:", newsLetter);
    setNewsLetter("");
  };

  return (
    <footer className={style.footerContainer}>
      <div className={style.contentsContainer}>
        
        {/* Newsletter Section */}
        <form onSubmit={handleSubmit} className={style.newsletterForm}>
          <div className={style.newsletter}>
            <h2 className={style.newsTitle}>NEWSLETTER</h2>
            <div className={style.inputGroup}>
              <input
                value={newsLetter}
                onChange={(e) => setNewsLetter(e.target.value)}
                type="email"
                placeholder="Your email address"
                className={style.emailInput}
                required
              />
              <button type="submit" className={style.subscribeBtn}>SUBSCRIBE</button>
            </div>
          </div>
        </form>

        {/* Informational Columns Grid */}
        <div className={style.footerRow}>
          <div className={style.footerColumn}>
            <h3 className={style.columnHeading}>Quick Links</h3>
            <nav className={style.linkList}>
              <Link to="/">Home</Link>
              <Link to="/userAbout">About</Link>
              <Link to="/userBlogs">Blogs</Link>
              <span className={style.fakeLink}>FAQs</span>
            </nav>
          </div>

          <div className={style.footerColumn}>
            <h3 className={style.columnHeading}>Contact Info</h3>
            <div className={style.contactItem}>
              <FaEnvelope className={style.icon} /> <span>favourukeme8@gmail.com</span>
            </div>
            <div className={style.contactItem}>
              <FaPhoneAlt className={style.icon} /> <span>09132227203</span>
            </div>
            <div className={style.contactItem}>
              <FaMapMarkerAlt className={style.icon} /> <span>2, Alhaji Kalejaiye St, Shomolu, Lagos.</span>
            </div>
          </div>

          <div className={style.footerColumn}>
            <h3 className={style.columnHeading}>Follow Us</h3>
            {/* Standard anchor tags optimized for secure external platform redirects */}
            <div className={style.socialLinks}>
              <a href="https://facebook.com/profile.php?id=61577318323288" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={22} />
              </a>
              <a href="https://x.com/MoonCodes2006" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter size={22} />
              </a>
              <a href="https://www.linkedin.com/in/munachi-ukeme-2389a8365" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={22} />
              </a>
              <a href="https://github.com/Munachi-ukeme" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className={style.bottomStrip}>
          <div className={style.copyrightText}>
            <FaRegCopyright size={14} className={style.copyIcon} />
            <span>2026 MoonBlog | All Rights Reserved | Privacy Policy | Terms of Use</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Ufooter;
