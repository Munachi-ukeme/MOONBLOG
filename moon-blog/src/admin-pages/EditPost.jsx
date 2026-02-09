import React, {useState, useEffect} from 'react';
// useParams gets the id for each post from the URL.
import { useParams } from 'react-router-dom';
import { z } from "zod";
import style from "./EditPost.module.css";

function EditPost (){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [success, setSuccess] = useState('');

    // fetch blog data by ID 
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setCategory(data.category);
            setAuthor(data.author);
            setBody(data.body);
        };
        fetchPost();
    }, [id]);

    // Handle update
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const updatedPost = { title, category, author, body };
        
        try{
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedPost),
        });

        if (response.ok) {
            setSuccess("Blog updated")

        //clear inputs after updated
        setTitle('');
        setCategory('');
        setAuthor('');
        setBody('');

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
            setSuccess('');
        }, 3000);
        } else {
            setSuccess("Error updating blog")
        }
        } catch (error) { setSuccess('Something went wrong'); }
    };


// Define schema
const BlogSchema = z.object({
  title: z.string(),
  category: z.string(),
  author: z.string(),
  body: z.string(),
});

// Validate data
const result = BlogSchema.safeParse({
  title: "My Blog",
  category: "Tech",
  author: "Munachi",
  body: "This is my post",
});

if (!result.success) {
  console.error("Invalid data:", result.error);
}

    return(
        <div className={style.container}>
            <h2 className={style.containername}>Edit Blogs</h2>
            <form onSubmit={handleSubmit}>
                <div className={style.formbag}>
                    <label htmlFor="title" className={style.label}>Title:</label>
                    <input
                    type="text"
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={style.input}
                     />
                </div>

                <div className={style.formbag}>
                    <label htmlFor="category" className={style.label}>Category:</label>
                    <input
                    type="text"
                    value={category}
                    id='category'
                    onChange={(e) => setCategory(e.target.value)}
                    className={style.input}
                    />
                </div>

                <div className={style.formbag}>
                    <label htmlFor="author" className={style.label}>Author:</label>
                    <input
                    type="text"
                    id='author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={style.input}
                    />
                </div>

                <div className={style.formbag}>
                    <label htmlFor="body" className={style.label}>Body:</label>
                    <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={style.textarea}
                    />
                </div>

                <button type="submit" className={style.btn}>Update</button>
                {/* success message */}
                {success && <p className={style.success}> {success}</p>}

            </form>
        </div>
    );
}


export default EditPost;


// My Linkedln connection recommend i should use:
// TanStack query instead of fetch inside useEffect.
// Why Use TanStack Query (React Query):
// Caching: Remembers fetched data, so revisiting a page doesn’t always re‑fetch.

// Loading & Error States: Built‑in isLoading and error — no need for extra useState.

// Cleaner Code: Less boilerplate compared to fetch + useEffect.

// Refetching: Automatically refreshes data when you come back to the app or tab.

// Performance: Reduces unnecessary network calls, making apps faster.

// Scalability: Easier to manage when your project grows with many API calls.

// Professional Standard: Widely used in production React apps for reliability.


// Zod is a JavaScript library that makes validation easy.
// it checks the nature of data (eg.string, boolean etc) being pass from frontend to backend and vice verse