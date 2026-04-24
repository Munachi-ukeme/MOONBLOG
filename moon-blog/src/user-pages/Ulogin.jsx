import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Ulogin.module.css";
import style from "./Uhome.module.css";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../user-pages/AuthContext"; // ✅ import context

const Ulogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext); // ✅ use login from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auths/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "user"}),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // ✅ update context + localStorage
        userLogin(data.token);

        // ✅ redirect to blogs
        navigate("/userBlogs");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`${styles.container} ${style.hero}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.containername}>Login</h2>
        <Link to="/" className={styles.backarrow}>
          <FaTimes size={24} />
        </Link>

        <div className={styles.loginformbag}>
          <label htmlFor="email" className={styles.label}>
            Your Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.loginformbag}>
          <label htmlFor="password" className={styles.label}>
            Enter your Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={12}
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className={styles.signinbtn}
        >
          Login
        </button>
{/* 
        <p className={styles.forget}>
          Forgotten Password?
          <Link to="" className={styles.forgetpassword}>
            Reset
          </Link>
        </p> */}

        <p className={styles.notamember}>
          Not a member?{" "}
          <Link to="/userSignup" className={styles.signupoption}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Ulogin;
