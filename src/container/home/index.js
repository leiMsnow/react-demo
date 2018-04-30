import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import Tabbar from '../../component/tabbar'

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
                icon:'user',
                title:'个人中心',
                // component:UserCenter,
                hide:false
            }
        ]
        return (
            <div>
                <NavBar 
                    mode='dark'
                    
                >
                {navList.find(v=>v.path===pathname).title}
                </NavBar>
                <Tabbar 
                data={navList}
                />
            </div>
        )
    }
}

export default Home