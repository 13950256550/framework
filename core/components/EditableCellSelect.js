import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Select } from 'antd';
import { getCodeList, getCodeObject, getShowValue, getSelectOptions } from '../codelist/CodeList';

export default class EditableCellSelect extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		value: props.value,
		editable: props.editable || false,
		code:props.code,
	  }
	}
  componentWillReceiveProps = (nextProps)=> {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate = (nextProps, nextState)=> {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange = (value)=> {
    //const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable,code } = this.state;
	const codeList = getCodeList(code)
	const options = getSelectOptions(code);
	const codeObject = getCodeObject(codeList,value)
	const showValue = getShowValue(code,value)
    return (
      <div>
        {
          editable ?
            <div>
              <Select value={value} onChange={e => this.handleChange(e)} allowClear style={{ width: 200 }}>
				  {options}
			  </Select>
            </div>
            :
            <div className="editable-row-text">
              {showValue}
            </div>
        }
      </div>
    );
  }
}