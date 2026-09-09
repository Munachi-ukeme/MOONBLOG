import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "./AdminHome.module.css"; 

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear errors on fresh attempt

    try {
      const loginInfo = await fetch(`${import.meta.env.VITE_API_URL}/api/auths/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, role: "admin" }),
      });

      const data = await loginInfo.json();
      console.log("Response:", data);

      if (loginInfo.ok && data.token) {
        // Save the admin access token straight to local storage parameters
        localStorage.setItem('token', data.token);

        // Direct transition into your custom administrative list dashboard
        navigate("/myblogs");
      } else {
        setErrorMsg(data.message || "Invalid administrative credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Connection failure. Check backend server logs.");
    }
  };

  return (
    <div className={style.loginBox}>
      <form onSubmit={handleSubmit} className={style.formbag}>
        <h1 className={style.loginHeader}>Admin Login</h1>
        
        {/* Clean dynamic notification frame for credential rejections */}
        {errorMsg && <p className={style.errorMessage}>{errorMsg}</p>}

        <div className={style.loginformbag}>
          <label htmlFor="userName" className={style.label}>Username</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter admin username"
            className={style.input}
            required
          />
        </div>

        <div className={style.loginformbag}>
          <label htmlFor="password" className={style.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className={style.input}
            required
          />
        </div>

        <button
          className={style.btn}
          type="submit"
          disabled={!userName || !password}
        >
          Login
        </button>
      </form>
      
      <p className={style.forget}>
        Forgot Password? 
        <Link to="" className={style.forgetpassword}> Reset Key</Link>
      </p>
    </div>
  );
}

export default Login;
