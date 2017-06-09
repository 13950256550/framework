import React, { Component } from 'react';
import './MainFrame.css';

import { Layout, Tabs, Icon, Menu, Row, Col } from 'antd';
const { SubMenu } = Menu;

const { Header, Content, Sider,Footer } = Layout;
const TabPane = Tabs.TabPane;
//import UserForm from './components/User/UserForm';
//import UserGrid from './components/User/UserGrid';
import {getView} from './menuFunction';

import SiMenu from './Layout/SiMenu';

//import User from './components/User/User';
//import Layout1 from './Layout/Layout1';

class MainFrame extends Component {
  constructor(props){
    super(props);
    this.newTabIndex = 0;
    this.state = {
			collapsed: false,
			mode: 'inline',
      activeKey: null,
      panes:[],
    };

		this.onCollapse = this.onCollapse.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.callback = this.callback.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.remove = this.remove.bind(this);

  }

  onCollapse(collapsed){
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

	handleMenuClick(menuKeyPath){
		//const view = SiButton;
		//const view = React.createElement(SiButton,null, null)
		//const WrappedNormalLoginForm = Form.create()(User);
		//let view = <User><UserForm/><UserGrid/></User>;
		const pane = this.state.panes.find((pane)=>{return pane.key===menuKeyPath[0]});
		if(pane!==null && pane!==undefined){
			this.setState({ activeKey:pane.key });
		}else{
			let view = getView(menuKeyPath);
			//console.log('view ', view);
			if(view!==null && view!==undefined && view.dom!==null && view.dom!==undefined){
				const panes = this.state.panes;
				//const activeKey = `newTab${this.newTabIndex++}`;
				panes.push({ title: view.title, content:view.dom, key: view.key });
				this.setState({ panes, activeKey:view.key });
			}
		}
  }

  callback(key){
		console.log(key);
	}

  onChange(activeKey){
    this.setState({ activeKey });
  }
  onEdit(targetKey, action){
    this[action](targetKey);
  }

	logout(){
    //alert('logout');
  }

  remove(targetKey){
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
		const user = {
			name:'管理员',
		}
		const userimg1 = {
			'width': '50%',
			'border-radius': '50%',
			'border': '4px solid #44576b',
			'margin-top': '-6px',
		};

		const col_font = {
			'text-align':'center',
			'font-size':'18px',
			'color':'#FFFFFF',
		};
		//console.log("screen.width",document.documentElement.clientWidth);
		//console.log("screen.height",document.documentElement.clientHeight);
		//style={{border:'3px solid green' }}
		let clientHeight = document.documentElement.clientHeight;
    return (
      <div>
        <Layout style={{height:clientHeight}}>
					<Header>
						<div style={{padding:5, margin: 0}}>
							<Row type="flex" justify="space-between">
								<Col>
									<img alt={'logo'} src={'core/assets/12.png'} />
								</Col>
								<Col>
									<Menu mode="horizontal" theme="dark" >
										<SubMenu style={{float: 'right',}} title={< span > <Icon type="user" />{user.name}< /span>}>
											<Menu.Item key="logout">
												<a href="../../../logout">注销</a>
											</Menu.Item>
										</SubMenu>
									</Menu>
								</Col>
							</Row>
						</div>
					</Header>
					<Layout>
						<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
							<div>
								<Row>
									<Col style={{'text-align':'center' }}>
										<img alt={'user'} width='50%' src='core/assets/user.jpg' style={userimg1}/>
									</Col>
								</Row>
								<Row>
									<Col style={col_font}>
										{user.name}
									</Col>
								</Row>
								<Row>
									<Col>
										<SiMenu ref="simenu" mode={this.state.mode} callbackParent={this.handleMenuClick}/>
									</Col>
								</Row>
							</div>
						</Sider>
						<Content style={{ background: '#fff', padding:10, margin: 0, minHeight: 560 }}>
							<Tabs
								hideAdd
								onChange={this.onChange}
								activeKey={this.state.activeKey}
								type="editable-card"
								onEdit={this.onEdit}
							>
								{this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
							</Tabs>
						</Content>
					</Layout>
						<Footer style={{ textAlign: 'center' ,padding:5, margin: 0,minHeight:30}}>
							FrameWork
						</Footer>
				</Layout>
      </div>
    );
  }
}

export default MainFrame;