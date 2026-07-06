import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { AuthProvider } from "./user-pages/AuthContext"; // ✅ import provider


// ADMIN PAGES
import AdminHome from "./admin-pages/AdminHome";
import CreatePost from "./admin-pages/Createpost";
import MyBlogs from "./admin-pages/MyBlog";
import AdminNavbar from "./components/AdminNavbar";
import EditPost from "./admin-pages/EditPost";

// USER PAGES
import Unavbar from "./userComponents/Unavbar";
import Uhome from "./user-pages/Uhome";
import Uabout from "./user-pages/Uabout";
import Ublogs from "./user-pages/Ublogs";
import Ulogin from "./user-pages/Ulogin";
import Usignup from "./user-pages/Usignup";
import Ufooter from "./userComponents/Ufooter";
import BlogDetails from "./user-pages/BlogDetails";
import ProtectedRoute from "./user-pages/ProtectedRoute";

function App() {
  // handle category dropdown
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // ✅ updates state
        };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route path="/adminpage" element={<AdminHome />} />
          <Route path="/logout" element={<AdminHome />} />
          <Route path="/new-post" element={<><AdminNavbar /><CreatePost /></>} />
          <Route path="/myblogs" element={<><AdminNavbar /><MyBlogs /></>} />
          <Route path="/edit/:id" element={<><AdminNavbar /><EditPost /></>} />

          {/* User routes */}
          <Route
            path="/"
            element={
              <>
                <Unavbar onCategoryChange={handleCategoryChange} />
                <Uhome category={selectedCategory}/>
                <Ufooter />
              </>
            }
          />
          <Route
            path="/userAbout"
            element={
              <>
                <Unavbar onCategoryChange={handleCategoryChange} />
                <Uabout />
                <Ufooter />
              </>
            }
          />
          <Route
            path="/userBlogs"
            element={
              <ProtectedRoute>
                <>
                  <Unavbar onCategoryChange={handleCategoryChange} />
                  <Ublogs category={selectedCategory} />
                  <Ufooter />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogDetails/:id"
            element={
              <>
                <Unavbar onCategoryChange={handleCategoryChange} />
                <BlogDetails />
                <Ufooter />
              </>
            }
          />
          <Route path="/userLogin" element={<Ulogin />} />
          <Route path="/userSignup" element={<Usignup />} />/
         
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
