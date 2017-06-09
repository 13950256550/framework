
import React, { Component } from 'react';
import { Form,Button } from 'antd';
import {XHForm,wrapperValue,unWrapperValue} from '../../core/components/Form';
import moment from 'moment';

import request from '../../utils/request';

/*
function checkConfirm(rule, value, callback){
    console.log('checkConfirm',rule, value, callback)
		var err = [{message:'角色'}]
		callback(err)
  }
*/
const testData = {id:1,roleCode:'2',roleName:'2017/04/26',}

const rules = [
								{required:true,message:'角色ID必录',},
								/*{validator: checkConfirm},*/
							]

const fields = [
				{label:'角色ID',fieldId:'id',rules:rules,},
			  {label:'角色代码',fieldId:'roleCode',code:'BAD305',},
				{label:'角色名称',fieldId:'roleName',dateFormat:'YYYY/MM/DD',},
				{label:'角色描述',fieldId:'description',placeholder:'description',},
			];

/*
const fields = [
	{ label:'主键', fieldId:'id',rules:rules },
	{ label:'角色代码', fieldId:'roleCode', },
	{ label:'角色名', fieldId:'roleName', },
	{ label:'描述', fieldId:'description', },
]
*/
export class Bank extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	handleSearch = (e)=> {
    e.preventDefault();
    this.refs.bankForm.validateFields((err, values) => {
			//console.log('bankForm',unWrapperValue(values,fields));
			console.log('bankForm',err,values);
    });
  }

  sendMessage = ()=> {
		console.log('sendMessage',unWrapperValue(this.refs.bankForm.getFieldsValue(),fields));
		//this.refs.bankForm.resetFields()
		let data = {id:5,roleCode:'3',roleName:'2017/04/08',}
		data = wrapperValue(data,fields)
		this.refs.bankForm.setFieldsValue(data)
	}

	componentDidMount = ()=> {
		//console.log('componentDidMount')
		//this.sendMessage()
	}

  render() {
		const WrappedRoleForm = Form.create(
			{
				/*
				onFieldsChange(props, changedFields) {
					console.log('onFieldsChange',props, changedFields)
				},
				onValuesChange(_, values) {
					console.log('onValuesChange',values);
				},
				mapPropsToFields(props) {
					return props
				},
				*/
			}
		)(XHForm);

    return (
		
		<div>
			<WrappedRoleForm fields={fields} ref='bankForm' />
			<Button onClick={this.sendMessage}>click</Button>
		</div>
    );
  }
}

export default Bank;