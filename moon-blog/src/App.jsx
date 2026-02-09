import './App.css'
import { BrowserRouter as Router,Route, Routes,} from 'react-router-dom';
import { useState, useEffect } from 'react';

//ADMIN PAGES
import AdminHome from './admin-pages/AdminHome';
import CreatePost from './admin-pages/Createpost';
import MyBlogs from './admin-pages/MyBlog';
import AdminNavbar from './components/AdminNavbar';
import EditPost from './admin-pages/EditPost';

// USER PAGES
import Unavbar from './userComponents/Unavbar';
import Uhome from './user-pages/Uhome';
import Uabout from './user-pages/Uabout';
import Ublogs from './user-pages/Ublogs';
import Ulogin from './user-pages/Ulogin';
import Usignup from './user-pages/Usignup';
import Ufooter from './userComponents/Ufooter';
import BlogDetails from "./user-pages/BlogDetails"

function App() {
  //state to track login and role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() =>{
    //check localstorage for token
  const token = localStorage.getItem("token");

  if (token){
    setIsAuthenticated(true);
  }
  }, []);

  //signout function
  const handleSignout =() =>{
    localStorage.removeItem("token");
    setIsAuthenticated(false)
  };

  //handle category dropdown
  const handleCategoryChange = (category) =>{
    console.log("Selected category:", category) // for fetching posts by category
  }
  
  return (
      <Routes>
        {/* Admin routes */}
        <Route path= '/adminpage' element= {<> <AdminHome/></> } />
        <Route path= '/logout' element= { <> <AdminHome /> </> } />
        <Route path= '/new-post' element= { <><AdminNavbar/> <CreatePost/></> } />
        <Route path= '/myblogs' element= { <> <AdminNavbar/> <MyBlogs/></> } />
        <Route path= '/edit' element= { <> <AdminNavbar/> <EditPost/> </> } />

        {/* Users routes */}
        
        <Route path= '/' element= { <> <Unavbar 
        isAuthenticated={isAuthenticated} 
        handleSignout={handleSignout} 
        onCategoryChange={handleCategoryChange} /> <Uhome/> <Ufooter /></> } />
        <Route path= '/userAbout' element= { <> <Unavbar /> <Uabout/> <Ufooter /> </> } />

        {/* for all blogs list */}
        <Route path= '/userBlogs' element= { <> <Unavbar
        isAuthenticated={isAuthenticated} 
        handleSignout={handleSignout} 
        onCategoryChange={handleCategoryChange}  /> <Ublogs/> <Ufooter /> </> } /> 

        {/* for single blog list */}
        <Route path='/blogDetails/:id' element={ <> <Unavbar
        isAuthenticated={isAuthenticated} 
        handleSignout={handleSignout} 
        onCategoryChange={handleCategoryChange} /> <BlogDetails/> <Ufooter /> </> } />
        
        <Route path= '/userLogin' element= { <Ulogin/> } />
        <Route path= '/userSignup' element= { <Usignup/> } />
        <Route path= '/signout' element= { <> <Unavbar
        isAuthenticated={isAuthenticated} 
        handleSignout={handleSignout} 
        onCategoryChange={handleCategoryChange} /> <Uhome/> <Ufooter /> </> } />

      </Routes>
  )
}

export default App
