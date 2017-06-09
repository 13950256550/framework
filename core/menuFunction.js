
import React from 'react';
import { Menu, Icon} from 'antd';
const { SubMenu } = Menu;
//import User from './components/User/User';
//import {Modules as UserModules} from './components/User/Modules';
import {subModule} from './Modules';
/*
const subModule = [
										{key:"sub1",icon:"user",title:"用户管理",modules:UserModules},
										{key:"sub2",icon:"laptop",},
										{key:"sub3",icon:"notification",}
										];
*/
/*
export var subModule;
require.ensure([], function([]){
			subModule = require('./components/User/Modules');
			console.log(subModule);
}, 'module');
*/
export function getView(keyPath){
	let view = {};
	if(keyPath.length===2){
		const aModules = subModule.find((subModule)=>{return subModule.key===keyPath[1]});
		if(aModules!==null && aModules!==undefined && aModules.modules!==null && aModules.modules!==undefined){
			const module = aModules.modules.find((aModule)=>{return aModule.key===keyPath[0]});
			if(module!==null && module!==undefined && module.dom!==null && module.dom!==undefined){
				view.dom = module.dom;
				view.title = module.title;
				view.key = module.key
			}
		}
	}
	/*
	if(menuId==="sub1_1"){
		view.dom = <User/>;
		view.title= "userAdmin";
	}
	*/
	return view;
}

function getMenuItems(modules){
	return modules.map((module)=>{return (<Menu.Item key={module.key}>{module.title}</Menu.Item>);});
}

export function getSubMenu(subMenuId){
	const modules = subModule.find((subModule)=>{return subModule.key===subMenuId});
	//console.log(modules);
	let subMenu = undefined;
	if(modules!==null && modules!==undefined && modules.modules!==null && modules.modules!==undefined){
		subMenu = (<SubMenu key={modules.key} title={<span><Icon type={modules.icon} />{modules.title}</span>}>
					{getMenuItems(modules.modules)}
		     </SubMenu>);
	}
	return subMenu;
}

/*
export function getSubMenu(menuId){
	let subMenu = {};
	if(menuId==="sub1"){
		subMenu = <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
						<Menu.Item key="sub1_1">option1</Menu.Item>
						<Menu.Item key="sub1_2">option2</Menu.Item>
						<Menu.Item key="sub1_3">option3</Menu.Item>
						<Menu.Item key="sub1_4">option4</Menu.Item>
					  </SubMenu>
	}else if(menuId==="sub2"){
			subMenu = <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
						<Menu.Item key="5">option5</Menu.Item>
						<Menu.Item key="6">option6</Menu.Item>
						<Menu.Item key="7">option7</Menu.Item>
						<Menu.Item key="8">option8</Menu.Item>
					  </SubMenu>
	}else if(menuId==="sub3"){
			subMenu = <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
						<Menu.Item key="9">option9</Menu.Item>
						<Menu.Item key="10">option10</Menu.Item>
						<Menu.Item key="11">option11</Menu.Item>
						<Menu.Item key="12">option12</Menu.Item>
					  </SubMenu>
	}

		return subMenu;
}
*/
export function getAllMenus(){
	//let menus = [getSubMenu("sub1"),getSubMenu("sub2"),getSubMenu("sub3")]; 
	//let menus = subModule.map(getSubMenu)
	return subModule.map((subModule)=>{ return subModule.key}).map(getSubMenu);
}
