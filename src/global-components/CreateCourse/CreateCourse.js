import React from "react";
import { Form, Input, Select, InputNumber, message } from "antd";
import "./CreateCourse.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../auth/AuthService";

const messageKey = "updatable";
const { Option } = Select;

// const toBase64 = file =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });

class CreateCourse extends React.Component {
  state = {
    section: this.props.location.aboutProps
      ? this.props.location.aboutProps.section
      : 1,
    lessonCreated: this.props.location.aboutProps
      ? this.props.location.aboutProps.lesson
      : 0,
    requestSwitch: 0,
    currentCourse: this.props.location.aboutProps
      ? this.props.location.aboutProps.course
      : null,
    coverPhoto: null,
    lessonVideo: null,
    documentArrayUpload: null,
  };
  formRef = React.createRef();
  formRefSecond = React.createRef();
  componentDidMount() {}
  onFinish = async values => {
    // const coverPhoto = await toBase64(values.upload[0].originFileObj);

    const postCourse = new FormData();
    postCourse.append("coverPhoto", this.state.coverPhoto);
    postCourse.append("title", values.title);
    postCourse.append("shortDesc", values.shortdescription);
    postCourse.append("longDesc", values.description);
    postCourse.append("price", values.price);
    postCourse.append("duration", 12);
    postCourse.append("category", values.category);
    postCourse.append("teacher", AuthService.getCurrentUser().username);

    // const postCourse = {
    //   title: values.title,
    //   shortDesc: values.shortdescription,
    //   longDesc: values.description,
    //   price: values.price,
    //   duration: 12,
    //   category: values.category,
    //   teacher: AuthService.getCurrentUser().username,
    //   coverPhoto: this.state.coverPhoto,
    // };
    // console.log(values.upload[0].originFileObj);
    console.log(postCourse);
    message.loading({ content: "Uploading Course...", key: messageKey });
    axios
      .post("https://courses4me.herokuapp.com/courses", postCourse, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        this.setState({ currentCourse: res.data.courseContent });
        message.success({
          content: "Course Uploaded",
          key: messageKey,
          duration: 2,
        });
        this.setState({ requestSwitch: 1 });
        setTimeout(() => {
          this.setState({ section: 2 });
          this.setState({ requestSwitch: 0 });
        }, 500);
      })
      .catch(err => {
        message.error({
          content: "Unable to upload Course",
          key: messageKey,
          duration: 2,
        });
      });
  };

  onFinishSecond = async values => {
    // const parsedDocuments = await values.upload.map(value => {
    //   return toBase64(value.originFileObj);
    // });
    // const postLesson = {
    //   title: values.lessonTitle,
    //   course_id: this.state.currentCourse.id || 1,
    //   description: values.lesson_description,
    //   video: values.video_url,
    //   // documents: parsedDocuments,
    // };

    const postLesson = new FormData();
    postLesson.append("course_id", this.state.currentCourse.id);
    postLesson.append("title", values.lessonTitle);
    postLesson.append("description", values.lesson_description);
    postLesson.append("video", this.state.lessonVideo);

    message.loading({ content: "Uploading Lesson...", key: messageKey });
    axios
      .post("https://courses4me.herokuapp.com/lessons", postLesson, {
        headers: {
          authorization: `token ${AuthService.getAuthHeader()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        const postDocument = new FormData();
        // const newDocument = {
        //   lessonId: res.data.lessonId,
        //   courseId: this.state.currentCourse.id,
        //   document: values.upload[0],
        // };
        postDocument.append("lessonId", res.data.lessonId);
        postDocument.append("courseId", this.state.currentCourse.id);
        postDocument.append("document", this.state.documentArrayUpload);
        axios
          .post("https://courses4me.herokuapp.com/documents", postDocument, {
            headers: {
              authorization: `token ${AuthService.getAuthHeader()}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(res => {
            console.log("success ", res.data);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(res.data);
        message.success({
          content: "Lesson Uploaded",
          key: messageKey,
          duration: 2,
        });
        this.setState({ lessonCreated: 1 });
        this.onResetSecond();
      })
      .catch(err => {
        message.error("Unable to upload Lesson");
      });
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onResetSecond = () => {
    this.formRefSecond.current.resetFields();
  };

  dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  onFileChangeHandler = e => {
    this.setState({
      coverPhoto: e.target.files[0],
    });
  };
  onVideoLessonChangeHandler = e => {
    this.setState({
      lessonVideo: e.target.files[0],
    });
  };
  onDocumentFileChange = e => {
    this.setState({
      documentArrayUpload: e.target.files[0],
    });
  };

  currentSection = () => {
    if (this.state.section === 1) {
      return (
        <div className={this.state.requestSwitch ? "close-bitch" : ""}>
          <h3 className="courses-title">
            Create a New Course <i className="fas fa-book-open"></i>
          </h3>
          <Form
            //   {...layout}
            layout="vertical"
            ref={this.formRef}
            name="control-ref"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select Course Category" allowClear>
                <Option value="development">Development</Option>
                <Option value="business">Business</Option>
                <Option value="photography">Photography</Option>
                <Option value="design">Design</Option>
                <Option value="marketing">Marketing</Option>
                <Option value="lifestyle">Lifestyle</Option>
                <Option value="music">Music</Option>
                <Option value="health">Health</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="shortdescription"
              label="Short Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Cover Photo">
              <input
                type="file"
                name="file"
                onChange={this.onFileChangeHandler}
              />
            </Form.Item>
            {/* <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={this.normFile}
            >
              <Upload
                name="logo"
                customRequest={this.dummyRequest}
                accept=".png"
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item> */}

            <Form.Item
              name="imgUrl"
              label="Cover Image Url"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ type: "number", min: 0, max: 500, required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item>
              <button className="btn create-c-btn" htmltype="submit">
                Create
              </button>
              <button
                className="btn reset-c-btn"
                htmltype="button"
                onClick={this.onReset}
              >
                Reset
              </button>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (this.state.section === 2) {
      return (
        <div className={this.state.requestSwitch ? "closing-down" : ""}>
          {this.state.lessonCreated === 0 ? (
            <div className="lessons-title">
              Create New Lesson{" "}
              {this.state.currentCourse ? (
                <p>
                  for <span>{this.state.currentCourse.title}</span>
                </p>
              ) : (
                ""
              )}{" "}
              <i className="fas fa-graduation-cap"></i>
            </div>
          ) : (
            <React.Fragment>
              <p className="lessons-title">
                Lesson Created! <i className="fas fa-graduation-cap"></i>
              </p>
              <p>
                Create another one or go to your{" "}
                <Link to="/userprofile">profile page</Link>
              </p>
            </React.Fragment>
          )}
          <Form
            //   {...layout}
            layout="vertical"
            ref={this.formRefSecond}
            name="control-ref"
            onFinish={this.onFinishSecond}
          >
            <Form.Item
              name="lessonTitle"
              label="Lesson Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Video Upload">
              <input
                type="file"
                name="file"
                onChange={this.onVideoLessonChangeHandler}
              />
            </Form.Item>

            <Form.Item
              name="lesson_description"
              label="Lesson Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Document Upload">
              <input
                type="file"
                name="file"
                onChange={this.onDocumentFileChange}
              />
            </Form.Item>

            {/* <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={this.normFile}
            >
              <Upload
                name="logo"
                customRequest={this.dummyRequest}
                accept=".pdf"
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item> */}

            <Form.Item>
              <button className="btn create-c-btn" htmltype="submit">
                Finish
              </button>
              <button
                className="btn reset-c-btn"
                htmltype="button"
                onClick={this.onReset}
              >
                Reset
              </button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container-course-form">
        <div className="create-course-card">{this.currentSection()}</div>
      </div>
    );
  }
}

export default CreateCourse;
