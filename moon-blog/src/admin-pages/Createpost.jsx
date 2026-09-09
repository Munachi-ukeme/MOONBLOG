import React, { useState } from 'react';
import style from "./CreatePost.module.css";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, category, body };
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/create`, {
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
        setSuccess("Blog Published Successfully! 🎉");

        setTitle('');
        setCategory('');
        setBody('');

        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        const text = await response.text();
        console.error('Failed to publish:', text);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={style.pageWrapper}>
      <div className={style.container}>
        <h2 className={style.containerName}>Create New Blog</h2>
        
        <form onSubmit={handleSubmit} className={style.formElement}>
          <div className={style.formBag}>
            <label htmlFor="title" className={style.label}>Title</label>
            <input
              id='title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Give your blog post a catchy title..."
              className={style.input}
            />
          </div>

          <div className={style.formBag}>
            <label htmlFor="category" className={style.label}>Category</label>
            <select
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
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
              id='body'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              placeholder="Start sharing your knowledge here..."
              className={style.textarea}
            />
          </div>

          <button
            type="submit"
            disabled={!title || !category || !body}
            className={style.btn}
          >
            Publish Post
          </button>

          {success && <p className={style.success}>{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
