// src/components/About.js
import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h2>About NewsMonkey</h2>
      <h4>Our Mission</h4>
      <p>
        NewsMonkey is dedicated to providing up-to-date, accurate, and unbiased news from around the world. Our goal is to keep you informed on the latest developments across various categories including business, technology, health, science, sports, and entertainment.
      </p>
      <p>
        We believe in the power of information and strive to make news accessible to everyone, helping our readers stay connected with what's happening globally.
      </p>

      <h4>How We Work</h4>
      <p>
        We aggregate news from various trusted sources using the News API, ensuring that you get diverse perspectives on current events. Our platform is built to be user-friendly, allowing you to easily browse news by category, search for specific topics, and save articles for later reading.
      </p>
      <p>
        NewsMonkey is constantly evolving, with our team working to enhance features and improve your news reading experience.
      </p>
    </div>
  );
};

export default About;
