import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const CoursePage = props => {
  const [courseInfo, setCourseInfo] = useState({});
  useEffect(() => {
    // axios.get(`/course/${props.match.params.id}`)
    axios
      .get(
        "https://jsonblob.com/api/jsonBlob/73cc3782-ad55-11ea-95e6-a32bc2b10f8f"
      )
      .then(res => {
        setCourseInfo(res.data);
      });
  }, []);

  return (
    <div>
      <h2>{courseInfo.title}</h2>
      <h3>Course ID: {props.match.params.id}</h3>
    </div>
  );
};

export default CoursePage;
