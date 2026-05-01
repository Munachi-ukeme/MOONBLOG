import React, { useState } from 'react';
import style from "./AdminHome.module.css";

function Signup({ setShowLogin }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // ✅ added error state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auths/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userName, 
          email, 
          password, 
          adminCode: import.meta.env.VITE_ADMIN_CODE}),
          
        
      });

      //first, inspect the raw response
      const text = await response.text(); console.log("Raw response text:", text); 
      
      let data;
      try {
        data = JSON.parse(text); // attempt to parse 
      console.log("Parsed JSON:", data);
    } catch (err) { 
      console.error("Response was not valid JSON:", err);
      data = {}; // fallback so code doesn’t break
      }

      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Signup successful! Please login.");

      // ✅ Switch to login form
      setShowLogin(true);

      // ✅ Clear form
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError(err.message || "Error signing up");
    }
  };

  return (
    <div>
      <h2 className={style.signup}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formbag}>
          <label htmlFor="userName" className={style.signuplabel}>Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={style.signupinput}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="email" className={style.signuplabel}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.signupinput}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="password" className={style.signuplabel}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.signupinput}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="confirmPassword" className={style.signuplabel}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={style.signupinput}
          />
        </div>

        {error && <p className={style.error}>{error}</p>}

        <button
          type="submit"
          disabled={
            !userName ||
            !email ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            password.length < 7
          }
          className={style.signupbtn}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
