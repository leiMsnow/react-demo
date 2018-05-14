import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import { Tabbar } from '../../component'
import { constant } from '../../utils'

import Boss from './boss'
import Genius from './genius'
import Message from './message'
import UserCenter from './user'
import { getMessageList, receiveMessage } from '../../redux/chat.redux'

@withRouter
@connect(
    state => state,
    { getMessageList, receiveMessage }
)
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        this.props.getMessageList()
        this.props.receiveMessage()
    }

    render() {
        const { user } = this.props
        const pathname = this.props.location.pathname
        const navList = [
            {
                path: '/genius',
                component: Genius,
                text: 'Boss',
                icon: 'boss',
                title: 'Boss列表',
                hide: user.type === constant.userType.boss
            },
            {
                path: '/boss',
                component: Boss,
                text: 'Genius',
                icon: 'job',
                title: 'Genius列表',
                hide: user.type === constant.userType.genius
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