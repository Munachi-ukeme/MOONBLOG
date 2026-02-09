import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaRegCopyright } from "react-icons/fa";
import style from "./Ufooter.module.css";

const Ufooter = () => {
    const [newsLetter, setNewsLetter] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Subscribe with:", newsLetter);
        setNewsLetter("");
    }
  return (
    <div className={style.footercontainer}>
        <div className={style.contentscontainer}>

            <form onSubmit={handleSubmit}>
                <div className={style.newsletter}>
        <h2 className={style.news}>NEWS LETTER</h2>
        <input
        value={newsLetter}
        onChange={(e) => setNewsLetter(e.target.value)}
        type="email"
        placeholder='Your email address'
        className={style.emailinput}
        />
        <button type='submit' className={style.btn}>SUBSCRIBE</button>
      </div>
            </form>

      <div className={style.footerrow}>
      <div className={style.quicklinks}>
        <h2 className={style.Lname}>Quick Links</h2>
        <Link to="/" className={style.link}>Home</Link>
        <Link to="/userAbout" className={style.link}>About</Link>
        <Link to="/userBlogs" className={style.link}>Blogs</Link>
        <span className={style.link}>FAQs</span>
      </div>

      <div className={style.contacts}>
        <h2 className={style.Lname}>Contact Info</h2>
        <p> <FaEnvelope  /> {" "} favourukeme8@gmail.com</p> 
        <p> <FaPhoneAlt  />{" "}09132227203</p>
        <p> < FaMapMarkerAlt /> {" "} 2, Alhaji Kalejaiye Street, Shomolu, Lagos State.</p>
      </div>

      <div className={style.socialMedia}>
        <h2 className={style.Lname}>Follow Us</h2>
        <div className={style.linkcontainer}>
        <Link to="https://facebook.com/profile.php?id=61577318323288" target="_blank" rel="noopener noreferrer"> <FaFacebook size={24} /> </Link> 
        <Link to="https://x.com/MoonCodes2006" target="_blank" rel="noopener noreferrer"> <FaTwitter size={24} /> </Link> 
        <Link to="https://www.linkedin.com/in/munachi-ukeme-2389a8365" target="_blank" rel="noopener noreferrer"> <FaLinkedin size={24} /> </Link> 
        <Link to="https://github.com/Munachi-ukeme" target="_blank" rel="noopener noreferrer"> <FaGithub size={24} /> </Link>
        </div>
      </div>
      </div>

      <div className={style.bottomstrip}>
        <p> <FaRegCopyright size={18}/> 2026 MoonBlog |All Rights Reserved | Privacy Policy | Terms of Use</p>
      </div>
      </div>
    </div>
  )
}

export default Ufooter
