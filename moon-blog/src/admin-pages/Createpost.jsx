import React, { useState } from 'react';
import style from "./CreatePost.module.css";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, category, body }; // ✅ no author
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Blog saved:', data);
        setSuccess("Blog Published");

        setTitle('');
        setCategory('');
        setBody('');

        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
         const text = await response.text();
  console.error('Failed to publish:', text);
        // const errData = await response.json(); // ✅ log actual server error
        // console.error('Failed to publish blog:', errData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.containername}>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formbag}>
          <label htmlFor="title" className={style.label}>Title:</label>
          <input
            id='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="category" className={style.label}>Category:</label>
          {/* ✅ dropdown instead of free text to match schema enum */}
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={style.input}
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className={style.formbag}>
          <label htmlFor="body" className={style.label}>Body:</label>
          <textarea
            id='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className={style.textarea}
          />
        </div>

        <button
          type="submit"
          disabled={!title || !category || !body} // ✅ removed author check
          className={style.btn}
        >
          Publish
        </button>

        {success && <p className={style.success}>{success}</p>}
      </form>
    </div>
  );
}

export default CreatePost;