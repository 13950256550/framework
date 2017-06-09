
import React, { Component } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
const FormItem = Form.Item;
import './UserForm.css';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.sendMessage = this.sendMessage.bind(this);
	}
  handleSearch = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = ()=>{
    this.props.form.resetFields();
	  this.props.callbackParent("123");
  }

	sendMessage(msg){
		alert(msg);
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 13 },
    };

    // To generate mock Form.Item
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={4} key={i}>
          <FormItem {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }

    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={0}>
          {children}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default UserForm;
