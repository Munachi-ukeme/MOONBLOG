import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from "./AdminHome.module.css"; // i styled this part in AdminHome.module.css

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", username, password);

    navigate("/myblogs");
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className={style.login}>Login</h1>
        {/* Add arrow icons for back, user, password */}
         
         <div className={style.loginformbag}>
        <label htmlFor="username" className={style.label}>Username:</label>
        <input
        id='username'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={style.input}
         />
         </div>

        <div className={style.loginformbag}>
          <label htmlFor="password" className={style.label}>Password:</label>
        <input
        id='password'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={style.input}
         />
        </div>

        <button
        className={style.btn}
        type="submit"
        disabled = {!username ||!password}
        >Login</button>
      </form>
      <p className={style.forget}>
        Forgotten Password?
          <Link to="" className={style.forgetpassword}> Reset </Link>
      </p>
    </div>
  )
}

export default Login;