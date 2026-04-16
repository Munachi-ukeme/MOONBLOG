import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Usignup.module.css";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../user-pages/AuthContext"; // ✅ import context

function Usignup() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext); // ✅ use login from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = { lastName, firstName, email, password};

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auths/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
        
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ Update context + localStorage immediately
      if (data.token) {
        userLogin(data.token);
        navigate("/userLogin"); // redirect to blogs
      }

      // ✅ Clear form
      setLastName("");
      setFirstName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError(err.message || "Error signing up");
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2 className={style.containername}>Sign Up</h2>
        <Link to="/" className={style.backarrow}>
          <FaTimes size={24} />
        </Link>

        <div className={style.formbag}>
          <label htmlFor="lastName" className={style.label}>Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="firstName" className={style.label}>First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="email" className={style.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="password" className={style.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="confirmPassword" className={style.label}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={style.input}
          />
        </div>

        {error && <p className={style.error}>{error}</p>}

        <button
          disabled={!lastName || !firstName || !email || !password || !confirmPassword}
          type="submit"
          className={style.signupbtn}
        >
          Signup
        </button>

        <p className={style.alreadyamember}>
          Already a member?{" "}
          <Link to="/userLogin" className={style.signinoption}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Usignup;
