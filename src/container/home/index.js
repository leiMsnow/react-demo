import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Tabbar from '../../component/tabbar'
import Boss from './boss'
import Genius from './genius'
import Message from './message'
import UserCenter from './user'

@connect(
    state => state,
)
class Home extends React.Component{

    render(){
        const {user} = this.props
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/boss',
                text:'Boss',
                icon:'boss',
                title:'Boss列表',
                component:Boss,
                hide:user.type === 'boss'
            },
            {
                path:'/genius',
                text:'牛人',
                icon:'job',
                title:'牛人列表',
                component:Genius,
                hide:user.type === 'genius'
            },
            {
                path:'/message',
                text:'消息',
                icon:'job',
                title:'消息列表',
                component:Message,
                hide:false
            },
            {
                path:'/userCenter',
                text:'我的',
                icon:'user',
                title:'个人中心',
                component:UserCenter,
                hide:false
            }
        ]
        const title = navList.find(v=>v.path===pathname)?navList.find(v=>v.path===pathname).title:''
        return (
            <div>
                <NavBar 
                    mode='dark'
                >
                    {title}
                </NavBar>
                {
                    navList.map(v=>(
                        <Switch key={v.path}>
                            <Route path={v.path} component={v.component}/>
                        </Switch>
                    ))
                }
                <Tabbar 
                data={navList}
                />
            </div>
        )
    }
}

export default Home