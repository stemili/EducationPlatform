import React from "react";
import { Form, Input, Select, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import "./CreateCourse.css";

const { Option } = Select;

class CreateCourse extends React.Component {
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  render() {
    return (
      <div className="container-course-form">
        <div className="create-course-card">
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
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
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
            <Form.Item
              name="img-url"
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

            <p className="lessons-title">
              Lessons <i className="fas fa-graduation-cap"></i>
            </p>
            <Form.List name="lessons">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map(field => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="start"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          rules={[
                            { required: true, message: "Missing lesson name" },
                          ]}
                        >
                          <Input placeholder="Lesson Name" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "url"]}
                          fieldKey={[field.fieldKey, "url"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing lesson URL name",
                            },
                          ]}
                        >
                          <Input placeholder="Lesson URL" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "lesson-type"]}
                          fieldKey={[field.fieldKey, "lesson-type"]}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select placeholder="Lesson Type" allowClear>
                            <Option value="pdf">PDF</Option>
                            <Option value="video">Video</Option>
                          </Select>
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> Add field
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>

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
      </div>
    );
  }
}

export default CreateCourse;
