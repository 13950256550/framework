import React from 'react';
import { Form, Button,message } from 'antd';

import { RoleForm } from './RoleForm';
import { RoleGrid } from './RoleGrid';

import request from '../../utils/request';

export class Role extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status:1,
		}
	}

	onChildChanged = (params)=> {
		//console.log('onChildChanged',params);
		//message.info('object='+JSON.stringify(params));
		let pagination = {current:1,pageSize:3,total:10,url:'http://jsonplaceholder.typicode.com/users'}
		//let pagination = {current:1,pageSize:3,total:10,url:'http://127.0.0.1:8080/Framework/test/view/role'}
		this.refs.RoleGrid.queryData(pagination);
  }

	sendMessage = () => {
		let row = this.refs.RoleGrid.getSelectRows();
		alert('选择的数据:'+JSON.stringify(row));
		//this.refs.RoleGrid.setState({dataSource:[]})
	}

	queryData = () => {
		//request('http://jsonplaceholder.typicode.com/users',{_page:1,_limit:100}).then(this.queryDataOk);
		request('http://127.0.0.1:8080/Framework/test/view/user',{_page:1,_limit:100}).then(this.queryDataOk);
	}

  render() {
		const WrappedRoleForm = Form.create()(RoleForm);
    return (
		<div>
			<WrappedRoleForm callbackParent={this.onChildChanged} ref="WrappedRoleForm" />
			<RoleGrid ref="RoleGrid" parent={this} />
			<Button onClick={this.sendMessage} disabled={this.state.status==1}>click</Button>
		</div>
    );
  }
}

export default Role;