
import React, { Component } from 'react';
import { Form, Button } from 'antd';
//const FormItem = Form.Item;
import UserForm from './UserForm';
import UserGrid from './UserGrid';

import request from '../../utils/request';

import './User.css';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource : [{
			  id: '1',
			  name: '胡彦斌',
			  username: '32',
			  email: '西湖区湖底公园1号'
			}, {
			  id: '2',
			  name: '胡彦祖',
			  username: '42',
			  email: '西湖区湖底公园1号'
			}],
		}
		
		this.onChildChanged = this.onChildChanged.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.queryDataOk = this.queryDataOk.bind(this);
	}
  onChildChanged(newState) {
	  console.log(newState);
	  //this.state.dataSource = [];
	  this.setState({dataSource:[]});
  }

	queryDataOk(data){
		//this.state.dataSource = data;
		this.setState({dataSource:data});
		//console.log(data[0]);
	}

	sendMessage(){
		//console.log(this.refs.getUserGrid);
		//alert(this.refs.getUserGrid.sendMessage("123"));
		//console.log(this.refs.getWrappedUserForm.getFieldsValue());
		//request('https://randomuser.me/api',{results:4,page:2}).then(this.queryDataOk);
		request('http://jsonplaceholder.typicode.com/users',{_page:2,_limit:2}).then(this.queryDataOk);
	}

  render() {
		const WrappedUserForm = Form.create()(UserForm);
    return (
		<div>
			<WrappedUserForm callbackParent={this.onChildChanged} ref="getWrappedUserForm" />
			<UserGrid dataSource={this.state.dataSource} ref="getUserGrid"/>
			<Button onClick={this.sendMessage}>click</Button>
		</div>
    );
  }
}

export default User;
