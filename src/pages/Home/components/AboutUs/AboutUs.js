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
            <p className="snd-title">About Our Platform</p>
            <p>
              FOR GETTING SUCCESS THERE IS ONLY ONE PRINCIPLE KEEP YOUR FOCUS ON
              GOAL AND GO FOR IT WITH PASSION.
            </p>
            <p>
              Discite, founded in May 2020, is a Montenegrin online learning
              platform aimed at professional adults and students. As of Jun
              2020, the platform has less than 50 million students and 57,000
              instructors teaching courses in over 65 languages. There have been
              less than 295 million course enrollments.
            </p>
            <a
              className="btn donate-btn"
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=N6LPW2WSEHGF4&source=url"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
