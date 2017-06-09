import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Popconfirm} from 'antd';
import { EditableCell } from './EditableCell';
import EditableCellSelect from './EditableCellSelect'
import EditableCellDatePicker from './EditableCellDatePicker'

import request from '../../utils/request';

export class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      parent:props.parent,
			columns:this.initColumns(props.columns),
    };
  }

	handleChange(key, index, value) {
    const { dataSource } = this.props;
    dataSource[index][key] = value;
    this.state.parent.setState({ dataSource });
  }

	initColumns = (columns)=> {
	  let newColumns = columns

	  newColumns.forEach((column)=>{
        if(typeof column.key === 'undefined'){
					column.key = column.dataIndex
				}
        column.render = ((text, record, index) => this.renderColumns(this.props.dataSource, index, column.dataIndex, text))
	  })

	  let operationColumn = {
		  title: '操作',
		  dataIndex: 'operation',
		  render: (text, record, index) => {
			const { editable } = this.props.dataSource[index];
			return (
			  <div className="editable-row-operations">
				{
				  editable ?
					<span>
					  <a onClick={() => this.editDone(index, 'save')}>Save</a>
					  <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
						<a>Cancel</a>
					  </Popconfirm>
					</span>
					:
					<span>
					  <a onClick={() => this.edit(index)}>Edit</a>
					</span>
				}
			  </div>
			);
		  },
	  }
	  newColumns.push(operationColumn)
	  return newColumns
  }

	renderColumns(data, index, key, text) {
    const { editable, status } = data[index];
		let column = this.props.columns.find((column)=>{
				return column.dataIndex===key
			}
		)

    if(typeof column.code !== 'undefined'){
			return (<EditableCellSelect
				editable={editable}
				value={text}
				code = {column.code}
				onChange={value => this.handleChange(key, index, value)}
				status={status}
			/>);
		}else if(typeof column.dateFormat !== 'undefined'){
			return (<EditableCellDatePicker
				editable={editable}
				value={text}
				code = {column.code}
				dateFormat = {column.dateFormat}
				onChange={value => this.handleChange(key, index, value)}
				status={status}
			/>);
		}else{
			return (<EditableCell
				editable={editable}
				value={text}
				onChange={value => this.handleChange(key, index, value)}
				status={status}
			/>);
		}
  }

	edit(index) {
    const { dataSource } = this.props;
		dataSource[index].editable = true
    this.state.parent.setState({ dataSource });
  }
  editDone(index, type) {
    const { dataSource } = this.props;
		dataSource[index].editable = false
    dataSource[index].status = type;
    this.state.parent.setState({ dataSource },() => {
			if (dataSource[index] && typeof dataSource[index].editable !== 'undefined') {
				delete dataSource[index].status;
			}
		});
		
	}

  render() {
		const pros = {
			dataSource:this.props.dataSource,
			columns:this.state.columns,
		}
		
    return <Table {...this.props} {...pros}/>;
  }
}