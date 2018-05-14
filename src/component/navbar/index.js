import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

@withRouter
export default class Navbar extends React.Component {

    render() {
        const { title } = this.props
        return (
            <NavBar
                icon={this.renderIcon()}
                onLeftClick={this.onLeftClick()}
            >
                {title}
            </NavBar>
        )
    }

    onLeftClick = () => {
        if (!this.props.hideBack) {
            if (this.props.onLeftClick) {
                this.props.onLeftClick();
            } else {
                this.props.history.goBack();
            }
        }
    }

    renderIcon = () => {
        if (!this.props.hideBack) {
            return <Icon type='left' />
        }
    }
}

Navbar.propTypes = {
    title: PropTypes.string,
    onLeftClick: PropTypes.func,
    hideBack: PropTypes.bool,
    rightContent: PropTypes.any,
}
