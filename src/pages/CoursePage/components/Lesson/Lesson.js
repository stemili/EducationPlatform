import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "./Lesson.css";
import { Menu, Spin } from "antd";
import { Link } from "react-router-dom";

const Lesson = props => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState("");
  const [courseInfo, setCourse] = useState({});
  const { SubMenu } = Menu;

  const handleClick = e => {
    if (e.key.indexOf("doc") === -1) {
      let current = lessons.filter(lesson => lesson.id === parseInt(e.key));
      setCurrentLesson(current[0]);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://courses4me.herokuapp.com/lessons/course/${props.match.params.id}`
      )
      .then(res => setLessons(res.data));
    axios
      .get(`https://courses4me.herokuapp.com/courses/${props.match.params.id}`)
      .then(res => setCourse(res.data[0]));
  }, [props.match.params.id]);

  useEffect(() => {
    setCurrentLesson(lessons[0]);
  }, [lessons]);

  function checkForLessons() {
    if (currentLesson) {
      return (
        <div className="view-course-section">
          <div className="mini-course-heading">
            <div className="course-left">
              <img src={courseInfo.cover_photo} alt="Lesson heading img" />
              <h1>{courseInfo.title}</h1>
            </div>
            <div className="course-right">
              <Link to={`/courses/${props.match.params.id}`}>
                <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>
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
          <div className="side-menu">
            <Menu
              onClick={e => handleClick(e)}
              defaultSelectedKeys={[`${currentLesson.id}`]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              {renderLessons(lessons)}
            </Menu>
          </div>
        </div>
      );
    } else {
      return (
        <div className="course-spinner">
          <Spin />
        </div>
      );
    }
  }

  function renderLessons(lessons) {
    let counter = 1;
    const lessonList = lessons.map((lesson, index) => {
      return (
        <SubMenu
          key={`sub${index + 1}`}
          title={
            <span>
              <div className="menu-numbering">{index + 1}.</div>
              <span>{lesson.title}</span>
            </span>
          }
          style={{ fontSize: 16 }}
        >
          <Menu.Item key={lesson.id}>
            <i className="fas fa-video "></i>Lesson Video
          </Menu.Item>
          {lesson.documents.map(doc => {
            return (
              <Menu.Item key={`doc${counter}`}>
                <a href={doc.link} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-file-alt"></i> Document {`${counter++}`}
                </a>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
    return lessonList;
  }

  return <React.Fragment>{checkForLessons()}</React.Fragment>;
};

export default Lesson;
