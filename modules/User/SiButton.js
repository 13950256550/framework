
import React, { Component } from 'react';
import { Button } from 'antd';
import './Button.css';

class SiButton extends Component {
  render() {
    return (
      <div className="SiButton">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default SiButton;
