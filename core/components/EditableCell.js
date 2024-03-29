import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';

export class EditableCell extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		value: props.value,
		editable: props.editable || false,
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
  handleChange = (e)=> {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value|| ' '}
            </div>
        }
      </div>
    );
  }
}