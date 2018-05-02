import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import warpperState from '../../component/warpper-state'
import { login } from '../../redux/user.redux'
import Logo from '../../component/logo'

@connect(
    state => state.user,
    { login }
)
@warpperState
class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => {
                            this.props.handleState('user', v)
                        }}>帐号</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={(v) => {
                            this.props.handleState('pwd', v)
                        }}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button onClick={this.login} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }

    login = () => {
        this.props.login(this.props.state)
    }

    register = () => {
        this.props.history.push('/register')
    }
}

export default Login