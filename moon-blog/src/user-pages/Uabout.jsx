import React from 'react';
import style from "./Uabout.module.css";

const Uabout = () => {
  return (
    <div className={style.aboutContainer}>
      <section className={style.aboutSection}>
        <h2 className={style.name}>About Moon Blog</h2>
        <p>
          Moon Blog is your hub for digital skills, smart business hustles, and practical finance strategies. We help Africans learn valuable and practical courses, grow their income, and secure their future all through trusted online platforms.
        </p>
      </section>

      <section className={style.aboutSection}>
        <h2>Our Story</h2>
        <p>
          We noticed that many Africans wanted to learn skills like Virtual Assistance, email marketing, and other tech-driven abilities, but didn't know where to start.
          So we created Moon Blog out of a simple vision: to empower Africans with the knowledge and tools they need to thrive in today's digital economy.
        </p>
        <p>
          Our journey is not about perfection, but progress. Each day we add another page to the story of Africans taking control of their future, building sustainable income streams, and creating a legacy of growth. This is more than an academy; it's a movement towards financial freedom and digital empowerment.
        </p>
      </section>

      <section className={style.aboutSection}>
        <h2>What You'll Find Here</h2>
        <ul className={style.aboutList}>
          <li>Technology skills like Virtual Assistance, email marketing, and other digital tools</li>
          <li>Smart business hustles and strategies for entrepreneurs</li>
          <li>Finance living tips such as saving, budgeting, and planning smarter</li>
          <li>Access to trusted platforms where you can acquire these skills</li>
        </ul>
      </section>

      {/* Styled separately to visually pop as an important note */}
      <section className={`${style.aboutSection} ${style.disclaimer}`}>
        <h2>Disclaimer</h2>
        <p>
          Note: We are not financial advisers. The insights shared here are for educational 
          and informational purposes, designed to inspire smarter living and learning.
        </p>
      </section>

      <section className={style.aboutSection}>
        <h2>Join the Movement</h2>
        <p>
          Moon Blog is more than learning, it's about building a 
          community of Africans ready to grow, hustle smart, and secure their future. 
          Connect with us, share your journey, and let's build tomorrow together.
        </p>
      </section>
    </div>
  );
}

export default Uabout;
