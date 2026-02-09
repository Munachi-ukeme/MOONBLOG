import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import style from "./Usignup.module.css";
import {FaTimes} from "react-icons/fa"

function Usignup (){
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit =(e) => {
     e.preventDefault();
  }
  return (
    <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h2 className={style.containername}>Sign Up</h2>

          <Link to="/" className={style.backarrow}> <FaTimes size={24} /> </Link>

          <div className={style.formbag}>
            <label htmlFor="lastName" className={style.label}>LastName:</label>
            <input
            type="text"
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={style.input}
            />
          </div>

          <div className={style.formbag}> 
            <label htmlFor="firstName" className={style.label}>FirstName:</label>
            <input
            type="text"
            id='firstName'
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
            id='email'
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
            id='password'
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
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={style.input}
            />
          </div>

          {/* <!-- Hidden role field -->  */}
          <input type="hidden" name="role" value="user"></input>

          <button
          disabled ={!lastName || !firstName || !email ||!password ||!confirmPassword}
          type="submit" className={style.signupbtn}>Signup</button>

          <p className={style.alreadyamember}>Already a member? {""} <Link to="/userLogin" className={style.signinoption}>Login</Link></p>
        </form>
    </div>
  )
}

export default Usignup
