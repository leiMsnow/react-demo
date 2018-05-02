import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import Tabbar from '../../component/tabbar'
import Boss from './boss'
import Genius from './genius'
import Message from './message'
import UserCenter from './user'

@withRouter
@connect(
    state => state
)
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    render() {
        const { user } = this.props
        const { pathname } = this.props.location
        const navList = [
            {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/message',
                text: '消息',
                icon: 'message',
                title: '消息列表',
                component: Message,
                hide: false
            },
            {
                path: '/userCenter',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: UserCenter,
                hide: false
            }
        ]

        const navItem = navList.find(v => v.path === pathname)

        return (
            <div>
                <NavBar mode='dark'>{navItem ? navItem.title : ''}</NavBar>
                <div>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component} />
                            ))
                        }
                    </Switch>
                </div>
                <Tabbar data={navList} />
            </div>
        )
    }
}

export default Home