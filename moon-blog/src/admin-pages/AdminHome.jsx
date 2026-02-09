import React, {useState} from "react";
import AdminHomePic from "../assets/AdminHomePic.jpg";
import Login from "./Login";
import Signup from "./Signup";
import style from "./AdminHome.module.css";

function AdminHome() {
  // This makes the signin form not to show. only page pic and signup
  const [showLogin, setShowLogin] = useState(false);

    if (showLogin){
        return(
          <div className={style.signincontainer}>
            
            <div className={style.signinleft}>
              <Login />
              <p className={style.notadmin}>
              Not an Admin? {" "}
              <button className={style.signupoption} onClick={() => setShowLogin(false)} >Signup</button>
            </p>
            </div>

            {/* LOGIN PAGE */}
            <div className="right">
              <img src={AdminHomePic} alt="AdminHomePic" className={style.loginhomepic} />
              < LoginHomeWelcomeMessage />
            </div>
          </div>
        );
      } else{
        // SIGNUP PAGE
        return(
          <div className={style.signupcontainer}>

            <div className="left">
            <img src={AdminHomePic} alt="AdminHomePic" className={style.homepic} />
            <HomeWelcomeMessage />
            </div>

          <div className={style.signupright}>
            <Signup />
            <p className={style.alreadyanadmin}>
              Already an Admin? {""}
              <button onClick={() => setShowLogin(true)} className={style.signinoption}>Signin</button>
            </p>
          </div>
          </div>   
        );
      }
    }

export default AdminHome;

function HomeWelcomeMessage() {
  return(
    <div className={style.welcomemessage}>
      <h2 className={style.welcomeheader}>Welcome to Admin Portal</h2>
      <p className={style.welcomesemiheader}>Manage your blogs, users, and more with ease.</p>
    </div>
  );
}
function LoginHomeWelcomeMessage() {
  return(
    <div className={style.loginwelcomemessage}>
      <h2 className={style.loginwelcomeheader}>Welcome to Admin Portal</h2>
      <p className={style.loginwelcomesemiheader}>Manage your blogs, users, and more with ease.</p>
    </div>
  );
}

