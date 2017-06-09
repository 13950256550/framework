
import React from 'react';
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
import moment from 'moment';

import { getCodeList, getCodeObject, getShowValue, getSelectOptions } from '../codelist/CodeList';

const defaultColSpan = 6
const formItemLayout_span1 = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
const formItemLayout_span2 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
const formItemLayout_span3 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
const formItemLayout_span4 = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };

export class XHForm extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    
		const fields = this.props.fields
    const children = [];

		let colSpan = this.props.col;
		if(this.props.col === null || this.props.col === undefined){
			colSpan = defaultColSpan
		}
    for (let i = 0; i < fields.length; i++) {
			if(fields[i].span === null || fields[i].span === undefined){
				fields[i].span = 1
			}
			if(fields[i].formItemLayout === null || fields[i].formItemLayout === undefined){
				if(fields[i].span == 2){
					fields[i].formItemLayout = formItemLayout_span2
				}else if(fields[i].span == 3){
					fields[i].formItemLayout = formItemLayout_span3
				}else if(fields[i].span == 4){
					fields[i].formItemLayout = formItemLayout_span4
				}else{
					fields[i].formItemLayout = formItemLayout_span1
				}
			}
			
			let input
			if(fields[i].code !== null && fields[i].code !== undefined){
				const options = getSelectOptions(fields[i].code);
				input = (
					<Select allowClear style={{ width: 200 }}>
						{options}
					</Select>
				)
			}else if(fields[i].dateFormat !== null && fields[i].dateFormat !== undefined){
				input = <DatePicker/>
			}else{
				input = <Input placeholder={fields[i].placeholder} />
			}

			let item = getFieldDecorator(fields[i].fieldId,{rules:fields[i].rules})(input)

      children.push(
        <Col span={fields[i].span*colSpan} key={i}>
          <FormItem {...fields[i].formItemLayout} label={fields[i].label} >
            {item}
          </FormItem>
        </Col>
      );
    }

    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={0}>
          {children}
        </Row>
      </Form>
    );
  }
}

export function wrapperInitValue(value,fields){
	let result = {}
	fields.forEach((field, index, array)=> {
		result[field.fieldId]={}
		if(field.dateFormat!==null && field.dateFormat!==undefined){
			result[field.fieldId].value = moment(value[field.fieldId],field.dateFormat)
		}else{
			result[field.fieldId].value = value[field.fieldId]
		}
	})
	return result;
}

export function wrapperValue(value,fields){
	let result = {...value}
	fields.forEach((field, index, array)=> {
		if(field.dateFormat!==null && field.dateFormat!==undefined){
			result[field.fieldId] = moment(value[field.fieldId],field.dateFormat)
		}
	})
	return result;
}

export function unWrapperValue(value,fields){
	let result = {...value}
	fields.forEach((field, index, array)=> {
		if(field.dateFormat!==null && field.dateFormat!==undefined){
			result[field.fieldId] = value[field.fieldId].format(field.dateFormat)
		}
	})
	return result;
}

export default XHForm;