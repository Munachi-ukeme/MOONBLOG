import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Ulogin.module.css";
import style from "./Uhome.module.css";
import {FaTimes} from "react-icons/fa"

const Ulogin = () => {
  const [email, setEmail]  = useState("");
  const [password, setPassword]  = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/userBlogs");
  };
  return (
    <div className={`${styles.container} ${style.hero}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.containername}>Login</h2>
          <Link to ="/" className={styles.backarrow}> <FaTimes size={24} /> </Link>

          <div className={styles.loginformbag}>
            <label htmlFor="=email" className={styles.label}>Your Email:</label>
            <input
            type="email"
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            />
          </div>

          <div className={styles.loginformbag}>
            <label htmlFor='password' className={styles.label}>Enter your Password:</label>
            <input
            id='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            />
          </div>

          <button type="submit" 
          disabled={!email || !password}
          className={styles.signinbtn}
          > Login </button>

          <p className={styles.forget}>
          Forgotten Password?
          <Link to="" className={styles.forgetpassword}> Reset </Link>
        </p>

         <p className={styles.notamember}>Not a member? {""} <Link to="/userSignup" className={styles.signupoption}> Sign up</Link> </p>
        </form>
    </div>
  )
}

export default Ulogin;
