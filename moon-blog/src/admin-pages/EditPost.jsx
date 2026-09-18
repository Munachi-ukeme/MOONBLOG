import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from "./EditPost.module.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch current blog data by ID on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setTitle(data.title || '');
        setCategory(data.category || '');
        setBody(data.body || '');
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  // Handle updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, category, body };
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        setSuccess("Blog updated successfully! 🎉");

        // Clear inputs after update
        setTitle('');
        setCategory('');
        setBody('');

        // Auto-hide success message and redirect after 1.2 seconds
        setTimeout(() => {
          setSuccess('');
          navigate("/myblogs");
        }, 1200);
      } else {
        setSuccess("Error updating blog");
      }
    } catch (error) {
      setSuccess('Something went wrong');
    }
  };

  return (
    <div className={style.pageWrapper}>
      <div className={style.container}>
        <h2 className={style.containerName}>Edit Blog Post</h2>
        
        <form onSubmit={handleSubmit} className={style.formElement}>
          <div className={style.formBag}>
            <label htmlFor="title" className={style.label}>Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={style.input}
            />
          </div>

          <div className={style.formBag}>
            <label htmlFor="category" className={style.label}>Category</label>
            <select
              id="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className={style.selectInput}
            >
              <option value="">Select a category</option>
              <option value="Tech">Tech</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className={style.formBag}>
            <label htmlFor="body" className={style.label}>Body Content</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className={style.textarea}
            />
          </div>

          <button type="submit" className={style.btn}>Update Post</button>
          
          {/* Success / Error Message Display */}
          {success && <p className={style.successMessage}>{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditPost;
