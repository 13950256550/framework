
import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
const FormItem = Form.Item;

export class RoleForm extends React.Component {
	constructor(props) {
		super(props);
		//this.sendMessage = this.sendMessage.bind(this);
		//this.handleSearch = this.handleSearch.bind(this);
		//this.handleReset = this.handleReset.bind(this);
	}
  handleSearch = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
			this.props.callbackParent(values);
    });
  }

  handleReset = ()=> {
    this.props.form.resetFields();
  }

	sendMessage = (msg)=> {
		alert(msg);
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

		const fields = [
				{label:'角色ID',fieldId:'id',placeholder:'roleId',formItemLayout:formItemLayout},
			  {label:'角色代码',fieldId:'roleCode',placeholder:'roleCode',formItemLayout:formItemLayout},
				{label:'角色名称',fieldId:'roleName',placeholder:'roleName',formItemLayout:formItemLayout},
				{label:'角色描述',fieldId:'description',placeholder:'description',formItemLayout:formItemLayout},
			];

    const children = [];
		let colSpan = 6;
    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col span={colSpan} key={i}>
          <FormItem {...fields[i].formItemLayout} label={fields[i].label}>
            {getFieldDecorator(`${fields[i].fieldId}`)(
              <Input placeholder={fields[i].placeholder} />
            )}
          </FormItem>
        </Col>
      );
    }

    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={0}>
          {children}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button type="primary" onClick={this.handleReset}>清屏</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

