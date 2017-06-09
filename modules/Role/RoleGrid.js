
import React from 'react';
import { Table, Icon } from 'antd';
import { Input, Popconfirm,message } from 'antd';
import { EditableTable } from '../../core/components/EditableTable';

import request from '../../utils/request';

export class RoleGrid extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			dataSource : [],
      pagination:[],
			selectedRowKeys: [],
      selectedRows:[],
		}
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({ selectedRowKeys,selectedRows });
  }

	onPaging = (pagination, filters, sorte) => {
		this.queryData(pagination)
		this.props.parent.setState({status:1})
	}

	queryData = (pagination)=> {
    this.setState({ pagination:pagination });
		request(pagination.url,{...pagination}).then(this.queryDataOk);
	}

	queryDataOk = (data)=> {
		//console.log('queryDataOk',this.props)
		this.setState({ dataSource:data });
		this.props.parent.setState({status:2})
	}

	getSelectRows = ()=> {
		return this.state.selectedRows;
	}

  render() {
		/*
		const columns = [
			{
				title: '角色ID',
				dataIndex: 'id',
				key: 'id',
			},{
				title: '角色代码',
				dataIndex: 'roleCode',
				key: 'roleCode',
				code:'BAD305',
			}, {
				title: '角色名称',
				dataIndex: 'roleName',
				key: 'roleName',
			}, {
				title: '角色描述',
				dataIndex: 'description',
				key: 'description',
				//dateFormat:'YYYY/MM/DD',
			}, 
		];

		const columns = [
			{title:'主键', dataIndex:'id', key:'id',}, 
			{title:'角色代码', dataIndex:'roleCode', key:'roleCode',}, 
			{title:'角色名', dataIndex:'roleName', key:'roleName',}, 
			{title:'描述', dataIndex:'description', key:'description',}, 
		]
		*/
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			},{
				title: '用户姓名',
				dataIndex: 'username',
				key: 'username',
				code:'BAD305',
			}, {
				title: '名称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '电子邮箱',
				dataIndex: 'email',
				key: 'email',
				//dateFormat:'YYYY/MM/DD',
			}, 
		];

		const pros = {
			ref:'table',
			rowSelection:{onChange: this.onSelectChange,},
			dataSource:this.state.dataSource,
			columns:columns,
		  rowKey:"id",
			size:'small',
			pagination:this.state.pagination,
			onChange: this.onPaging,
			parent:this,
		}

    return (
			<EditableTable {...pros}/>
    );
  }
}

