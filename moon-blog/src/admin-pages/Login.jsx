import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from "./AdminHome.module.css"; // i styled this part in AdminHome.module.css
import { AuthContext } from '../user-pages/AuthContext';

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {userLogin} = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    
    try{
      const loginInfo = await fetch("/api/auths/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userName, password, role: "admin"}),
      });

      const data = await loginInfo.json();
      console.log("Response:", data);

      if (loginInfo.ok && data.token){
        //update context + local storage
        userLogin(data.token);

        //redirect to myblogs
        navigate("/myblogs");
      } else{
        alert(data.message || "Login failed");
      }
    } catch(err) {
      console.error("Login error:", err);
      alert("something went wrong. please try again");
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className={style.login}>Login</h1>
        {/* Add arrow icons for back, user, password */}
         
         <div className={style.loginformbag}>
        <label htmlFor="userName" className={style.label}>Username:</label>
        <input
        id='userName'
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
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
        disabled = {!userName ||!password}
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