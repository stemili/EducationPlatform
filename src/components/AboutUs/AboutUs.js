import React from "react";
import "./AboutUs.css";

const AboutUs = props => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="about-us-display">
          <img
            src="https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
          <div className="about-content">
            <h3>Why Discite?</h3>
            <p className="snd-title">About Our Platform</p>
            <p>
              FOR GETTING SUCCESS THERE IS ONLY ONE PRINCIPLE KEEP YOUR FOCUS ON
              GOAL AND GO FOR IT WITH PASSION.
            </p>
            <p>
              Discite, founded in May 2020, is an Montenegrin online learning
              platform aimed at professional adults and students. As of Jun
              2020, the platform has less than 50 million students and 57,000
              instructors teaching courses in over 65 languages. There have been
              less 295 million course enrollments.
            </p>
            <button className="btn">Donate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
