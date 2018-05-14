import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

@withRouter
@connect(
    state => state
)
export default class Tabbar extends React.Component {

    render() {
        const { pathname } = this.props.location
        const navList = this.props.data.filter((v) => !v.hide)
        return (
            <TabBar>
                {
                    navList.map(v => (
                        <TabBar.Item
                            key={v.path}
                            badge={v.path === '/message' ? this.props.chat.unread : 0}
                            title={v.text}
                            icon={{ uri: require(`./images/${v.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${v.icon}-active.png`) }}
                            selected={v.path === pathname}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
Tabbar.propTypes = {
    data: PropTypes.array.isRequired,
}
