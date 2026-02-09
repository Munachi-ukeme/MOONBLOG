import React, {useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "./AdminHome.module.css";

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    console.log("signing up with:", username, email, password, confirmPassword)

    navigate("/login");
  };

  return (
    <div>
<h2 className={style.signup}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formbag}>
          <label htmlFor="username" className={style.signuplabel}>Username:</label>
          <input
          type="text"
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
           className={style.signupinput}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="email" className={style.signuplabel}>Email:</label>
          <input
          type="email"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.signupinput}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="password" className={style.signuplabel}>Password:</label>
          <input
          type="password"
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.signupinput}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="confirmPassword" className={style.signuplabel}>Confirm Password:</label>
          <input
          type="password"
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={style.signupinput}
          />
        </div>

        {/* <!-- Hidden role field -->  */}
        <input type="hidden" name="role" value="user"></input>

        <button
        type='submit'
        disabled ={!username || !email || !password || !confirmPassword || password !== confirmPassword || password.length < 7}
        className={style.signupbtn}
        >Signup</button>
        
      </form>
    </div>
  )
}

export default Signup;