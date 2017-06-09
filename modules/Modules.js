import React from 'react';
import User from './User/User';
import Role from './Role/Role';
import Bank from './bank/Bank';

export const Modules = [
												{key:"sub1_1",title:"用户管理",dom:<User/>},
												{key:"sub1_2",title:"角色管理",dom:<Role/>},
												{key:"sub1_3",title:"银行联网平台",dom:<Bank/>},
											 ];