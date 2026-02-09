import React, {useState} from 'react';
import style from "./CreatePost.module.css";

function CreatePost() {
  // State variables to hold form input values
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {title, category, author, body};

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Blog saved:', data);
        setSuccess("Blog Published")

        //clear inputs after published
        setTitle('');
        setCategory('');
        setAuthor('');
        setBody('');

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(''); 
        }, 3000);
      } else {
        console.error('Failed to publish blog');
      }
    }
      catch (error) {
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
          <input
          id='category'
          type="text"
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="author" className={style.label}>Author:</label>
          <input
          id='author'
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className={style.input}
          />
        </div>

        <div className={style.formbag}>
          <label htmlFor="body" className={style.label}>Body:</label>
          <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className={style.textarea}
           />
        </div>

        <button type="submit" disabled={!title || !category || !author || !body} className={style.btn}>
  Publish
</button>

{/* success message */}
{success && <p className={style.success}> {success}</p>}
      </form>
    </div>
  );
}

export default CreatePost;