import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'

import './index.css'

@connect(
    state => state,
)
class Tabbar extends React.Component{

    render(){
        const {user} = this.props
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                // component:Boss,
                hide:user.type === 'genius'
            },
            {
                path:'/genius',
                text:'Boss',
                icon:'job',
                title:'Boss列表',
                // component:Genius,
                hide:user.type === 'boss'
            },
            {
                path:'/message',
                text:'消息',
                icon:'job',
                title:'消息列表',
                // component:Message,
                hide:false
            },
            {
                path:'/userCenter',
                text:'我的',
                icon:'me',
                title:'个人中心',
                // component:Message,
                hide:false
            }
        ]
        return (
            <div>
                <NavBar mode='dark'>{navList.find(v=>v.path=pathname).title}</NavBar>
                <div>footer</div>
            </div>
        )
    }
}

export default Tabbar