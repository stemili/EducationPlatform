import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./Lesson.css";

const Lesson = (props) => {
  const [currentLesson, setCurrentLesson] = useState(props.lessons[0]);

  function renderLessons(lessons) {
    const lessonList = lessons.map((lesson) => {
      return (
        <li
          className={currentLesson === lesson ? "active" : ""}
          key={lesson.id}
          onClick={(e) => changeActive(e)}
        >
          {lesson.title}
        </li>
      );
    });
    return lessonList;
  }

  const changeActive = (e) => {
    if (e.target.textContent !== currentLesson.title) {
      const filtered = props.lessons.filter(
        (les) => les.title === e.target.textContent
      );
      console.log(filtered);
      setCurrentLesson(filtered[0]);
    }
  };

  return (
    <div className="view-course-section">
      <div className="video-box">
        <div className="video-heading">
          <ReactPlayer url={currentLesson.video} controls={true} width="100%" />
          <h1>{currentLesson.title}</h1>
        </div>
        <p>{currentLesson.description}</p>
      </div>
      <div className="side-menu">{renderLessons(props.lessons)}</div>
    </div>
  );
};

export default Lesson;
