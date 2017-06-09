import React, { Component } from 'react';
import { Menu } from 'antd';
//const { SubMenu } = Menu;
import {getAllMenus} from '../menuFunction';

class SiMenu extends Component {
	constructor(props) {
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}
  handleMenuClick(e){
		//console.log(e.keyPath[1]);
		this.props.callbackParent(e.keyPath);
  }

  /*
	defaultSelectedKeys={['sub1_1']}
	defaultOpenKeys={['sub1']}
	*/
	render() {
		let menuItems = getAllMenus();
		//console.log('coms',coms);
		return (
			<Menu
		      onClick={this.handleMenuClick}
				  mode={this.props.mode}
				  theme="dark"
				  style={{ height: '100%' }}
				>
					{menuItems}
				</Menu>
    );
  }
}

export default SiMenu;