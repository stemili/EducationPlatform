import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "./Lesson.css";

const Lesson = props => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState();

  useEffect(() => {
    axios
      .get(
        `https://courses4me.herokuapp.com/lessons?courseId=${props.match.params.id}`
      )
      .then(res => setLessons(res.data));
  }, [props.match.params.id]);

  useEffect(() => {
    setCurrentLesson(lessons[0]);
  }, [lessons]);

  function checkForLessons() {
    if (currentLesson) {
      return (
        <div className="view-course-section">
          <div className="video-box">
            <div className="video-heading">
              <ReactPlayer
                url={currentLesson.video}
                controls={true}
                width="100%"
              />
              <h1>{currentLesson.title}</h1>
            </div>
            <p>{currentLesson.description}</p>
          </div>
          <div className="side-menu">{renderLessons(lessons)}</div>
        </div>
      );
    } else {
      return <div>No lessons!</div>;
    }
  }

  function renderLessons(lessons) {
    const lessonList = lessons.map(lesson => {
      return (
        <li
          className={currentLesson === lesson ? "active" : ""}
          key={lesson.id}
          onClick={e => changeActive(e)}
        >
          {lesson.title}
        </li>
      );
    });
    return lessonList;
  }

  const changeActive = e => {
    if (e.target.textContent !== currentLesson.title) {
      const filtered = lessons.filter(
        les => les.title === e.target.textContent
      );
      console.log(filtered);
      setCurrentLesson(filtered[0]);
    }
  };

  return <React.Fragment>{checkForLessons()}</React.Fragment>;
};

export default Lesson;
