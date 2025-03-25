import React from 'react';
import './Home.css';
import SchoolPhoto from '../assets/images/school-photo.jpg';
import Faculty1 from '../assets/images/faculty1.jpg';

const NotFound = () => {
  return(
    <div>
      <section className="school-quote">
        <blockquote>
          “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela
        </blockquote>
      </section>
      
      <section className="school-photo">
        <img src={SchoolPhoto} alt="School Building" />
      </section>
      
      <section className="vision-mission">
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To foster an inclusive and dynamic learning environment where every student is inspired to excel academically, socially, and emotionally.
          </p>
        </div>
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide quality education through innovative teaching methods, promoting lifelong learning and responsible citizenship.
          </p>
        </div>
      </section>
      
      <section className="faculty">
        <h2>Meet Our Faculty</h2>
        <div className="faculty-photos">
          <div className="faculty-member">
            <img src={Faculty1} alt="Faculty Member" />
            <p>Faculty</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default NotFound;