
import React, { Component } from 'react';
import { Table } from 'antd';

import './UserGrid.css';

class UserGrid extends Component {
  sendMessage(msg){
		return "child:"+msg;
	}
  render() {
		const columns = [{
			title: '用户ID',
			dataIndex: 'id',
			key: 'id',
		},{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
		}, {
			title: '电子邮件',
			dataIndex: 'email',
			key: 'email',
		}];

    return (
			<Table dataSource={this.props.dataSource} columns={columns} />
    );
  }
}

export default UserGrid;
